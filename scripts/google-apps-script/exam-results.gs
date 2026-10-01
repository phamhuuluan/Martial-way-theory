/**
 * Gắn script này vào Google Spreadsheet rồi deploy Web App:
 * Execute as: Me
 * Who has access: Anyone
 * Dán URL /exec vào NEXT_PUBLIC_EXAM_RESULTS_URL.
 *
 * Sheet exam_results được tạo cùng hàng header nếu chưa có.
 * Header cũ 11 cột được nối thêm club và dojo.
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
  };
}

function headerMatches(header, expected) {
  var index;
  for (index = 0; index < expected.length; index += 1) {
    if (text(header[index]) !== expected[index]) return false;
  }
  for (index = expected.length; index < header.length; index += 1) {
    if (text(header[index]) !== '') return false;
  }
  return true;
}

function ensureSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Hãy gắn script vào một Google Spreadsheet.');
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  var width = Math.max(sheet.getLastColumn(), HEADERS.length);
  var header = sheet.getRange(1, 1, 1, width).getValues()[0];
  var blank = header.every(function (cell) {
    return text(cell) === '';
  });
  if (blank) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    return sheet;
  }
  if (headerMatches(header, HEADERS)) return sheet;
  var legacy = HEADERS.slice(0, 11);
  if (headerMatches(header, legacy)) {
    sheet.getRange(1, legacy.length + 1, 1, 2).setValues([['club', 'dojo']]);
    return sheet;
  }
  throw new Error('Sheet exam_results đã có header khác.');
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
    if (!duplicate) {
      sheet.appendRow(
        HEADERS.map(function (key) {
          return record[key];
        })
      );
    }
    return jsonResponse({ ok: true, duplicate: duplicate });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}
