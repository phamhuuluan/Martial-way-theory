/**
 * Gắn script này vào Google Spreadsheet rồi deploy Web App:
 * Execute as: Me
 * Who has access: Anyone
 * Dán URL /exec vào NEXT_PUBLIC_EXAM_RESULTS_URL.
 *
 * Sheet exam_results được tạo cùng hàng header nếu chưa có.
 * Cột còn thiếu được nối vào cuối header hiện có, không phụ thuộc thứ tự cũ:
 * club, dojo, dateOfBirth, coach, outcome, exitedAt.
 * Chạy syncExamResultColumns trong trình sửa script để sinh cột ngay, không cần đợi lượt nộp.
 * Mở spreadsheet cũng gọi hàm đó. outcome: submitted | exited. exitedAt để trống khi nộp bài.
 * POST append một kết quả. GET trả danh sách đã nộp.
 * GET nhận from/to (ISO, theo submittedAt) khi client gửi; bỏ trống thì trả hết.
 */
var SHEET_NAME = 'exam_results';
var HEADERS = [
  'id',
  'fullName',
  'candidateNumber',
  'rankId',
  'paperName',
  'score',
  'correctCount',
  'totalQuestions',
  'startedAt',
  'submittedAt',
  'durationMs',
  'club',
  'dojo',
  'dateOfBirth',
  'coach',
  'outcome',
  'exitedAt',
];

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function respond(payload, e) {
  var callback = e && e.parameter ? text(e.parameter.callback) : '';
  if (callback && /^[A-Za-z_][A-Za-z0-9_]*$/.test(callback)) {
    return ContentService.createTextOutput(callback + '(' + JSON.stringify(payload) + ');').setMimeType(
      ContentService.MimeType.JAVASCRIPT
    );
  }
  return jsonResponse(payload);
}

function readRequestBody(e) {
  if (e && e.parameter && e.parameter.payload) {
    return JSON.parse(e.parameter.payload);
  }
  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }
  return null;
}

function text(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function instantText(value) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return value.toISOString();
  }
  return text(value);
}

function dateText(value, timeZone) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, timeZone || Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return text(value);
}

function numberOrNull(value) {
  if (typeof value === 'number' && isFinite(value)) return value;
  if (typeof value === 'string' && text(value) !== '' && isFinite(Number(value))) {
    return Number(value);
  }
  return null;
}

function normalize(body) {
  if (!body || typeof body !== 'object') return null;
  var id = text(body.id);
  var fullName = text(body.fullName);
  var rankId = text(body.rankId);
  var paperName = text(body.paperName);
  var startedAt = text(body.startedAt);
  var submittedAt = text(body.submittedAt);
  var score = numberOrNull(body.score);
  var correctCount = numberOrNull(body.correctCount);
  var totalQuestions = numberOrNull(body.totalQuestions);
  var durationMs = numberOrNull(body.durationMs);
  if (!id || !fullName || !rankId || !paperName || !startedAt || !submittedAt) return null;
  if (score === null || correctCount === null || totalQuestions === null || durationMs === null) {
    return null;
  }
  return {
    id: id,
    fullName: fullName,
    candidateNumber: text(body.candidateNumber),
    rankId: rankId,
    paperName: paperName,
    score: score,
    correctCount: correctCount,
    totalQuestions: totalQuestions,
    startedAt: startedAt,
    submittedAt: submittedAt,
    durationMs: durationMs,
    club: text(body.club),
    dojo: text(body.dojo),
    dateOfBirth: text(body.dateOfBirth),
    coach: text(body.coach),
    outcome: text(body.outcome) === 'exited' ? 'exited' : 'submitted',
    exitedAt: text(body.exitedAt),
  };
}

function headerNames(sheet) {
  var width = Math.max(sheet.getLastColumn(), 1);
  return sheet.getRange(1, 1, 1, width).getValues()[0].map(text);
}

function ensureSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Hãy gắn script vào một Google Spreadsheet.');
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  var header = headerNames(sheet);
  var blank = header.every(function (cell) {
    return cell === '';
  });
  if (blank) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  } else {
    var present = {};
    var lastUsed = 0;
    header.forEach(function (name, column) {
      if (!name) return;
      present[name] = true;
      lastUsed = column + 1;
    });
    var missing = HEADERS.filter(function (name) {
      return !present[name];
    });
    if (missing.length) {
      sheet.getRange(1, lastUsed + 1, 1, missing.length).setValues([missing]);
    }
  }

  var dobColumn = headerNames(sheet).indexOf('dateOfBirth') + 1;
  if (dobColumn > 0) {
    sheet.getRange(2, dobColumn, Math.max(sheet.getMaxRows() - 1, 1), 1).setNumberFormat('@');
  }
  return sheet;
}

function syncExamResultColumns() {
  ensureSheet();
}

function onOpen() {
  try {
    ensureSheet();
  } catch (error) {
    // Không chặn khi mở spreadsheet.
  }
}

function appendRecord(sheet, record) {
  var header = headerNames(sheet);
  var row = header.map(function () {
    return '';
  });
  HEADERS.forEach(function (key) {
    var column = header.indexOf(key);
    if (column >= 0) row[column] = record[key];
  });
  sheet.appendRow(row);
}

function readResults(sheet) {
  var values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  var index = {};
  values[0].forEach(function (name, column) {
    var key = text(name);
    if (key) index[key] = column;
  });
  function cell(row, name) {
    var column = index[name];
    if (column === undefined) return '';
    return row[column];
  }
  var timeZone = sheet.getParent().getSpreadsheetTimeZone();
  return values
    .slice(1)
    .filter(function (row) {
      return text(cell(row, 'id')) !== '';
    })
    .map(function (row) {
      return {
        id: text(cell(row, 'id')),
        fullName: text(cell(row, 'fullName')),
        candidateNumber: text(cell(row, 'candidateNumber')),
        rankId: text(cell(row, 'rankId')),
        paperName: text(cell(row, 'paperName')),
        score: Number(cell(row, 'score')),
        correctCount: Number(cell(row, 'correctCount')),
        totalQuestions: Number(cell(row, 'totalQuestions')),
        startedAt: instantText(cell(row, 'startedAt')),
        submittedAt: instantText(cell(row, 'submittedAt')),
        durationMs: Number(cell(row, 'durationMs')),
        club: text(cell(row, 'club')),
        dojo: text(cell(row, 'dojo')),
        dateOfBirth: dateText(cell(row, 'dateOfBirth'), timeZone),
        coach: text(cell(row, 'coach')),
        outcome: text(cell(row, 'outcome')) === 'exited' ? 'exited' : 'submitted',
        exitedAt: text(cell(row, 'exitedAt')),
      };
    });
}

function inSubmittedRange(submittedAt, from, to) {
  if (from && submittedAt < from) return false;
  if (to && submittedAt >= to) return false;
  return true;
}

function doGet(e) {
  try {
    var sheet = ensureSheet();
    var from = e && e.parameter ? text(e.parameter.from) : '';
    var to = e && e.parameter ? text(e.parameter.to) : '';
    var results = readResults(sheet).filter(function (row) {
      return inSubmittedRange(row.submittedAt, from, to);
    });
    return respond({ ok: true, results: results }, e);
  } catch (error) {
    return respond({ ok: false, error: String(error) }, e);
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var body = readRequestBody(e);
    var record = normalize(body);
    if (!record) return jsonResponse({ ok: false, error: 'Dữ liệu không hợp lệ.' });
    var sheet = ensureSheet();
    var existing = readResults(sheet);
    var duplicate = existing.some(function (row) {
      return row.id === record.id;
    });
    if (!duplicate) appendRecord(sheet, record);
    return jsonResponse({ ok: true, duplicate: duplicate });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}
