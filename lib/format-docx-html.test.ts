import { parseHTML } from 'linkedom';
import { beforeAll, describe, expect, it } from 'vitest';
import { formatDocxHtml, isQuestionNode } from '@/lib/format-docx-html';

beforeAll(() => {
  if (typeof globalThis.DOMParser === 'undefined') {
    globalThis.DOMParser = class DOMParser {
      parseFromString(html: string) {
        const { document } = parseHTML(html);
        return document;
      }
    } as typeof DOMParser;
  }
});

const BROWN_Q11_12 = `
<p><strong>11/. Võ sinh và Môn sinh khác nhau như thế nào? </strong></p>
<ul><li><strong><em>Võ sinh</em></strong> là những người mới tập võ, chưa làm lễ nhập môn.</li>
<li><strong><em>Môn sinh</em></strong> là những người đã qua một thời gian rèn luyện võ thuật.</li></ul>
<p><strong>12/. Trong đại gia đình Phật Quang Quyền, các môn sinh đối xử nhau ra sao?</strong></p>
<p><strong>Trong đại gia đình Phật Quang Quyền, các môn sinh phải: </strong></p>
<ul><li>Đoàn kết, yêu Thương, Tin cậy.</li></ul>
`;

const HONG_Q1_3 = `
<p><strong>Câu 1. Cho biết định hướng học tập và đời sống của Võ sinh?</strong></p>
<p><strong>Đáp:</strong></p>
<p>Định hướng học tập và đời sống của Võ sinh Phật Quang Quyền là phải chuyên cần.</p>
<p><strong>Câu 2. Muốn thực hiện chuyên cần học tập, Võ sinh phải làm gì?</strong></p>
<p><strong>Đáp:</strong></p>
<p>Muốn chuyên cần học tập, Võ sinh phải thực hiện 4 điều:</p>
<ol><li><strong>Học cho rộng</strong>: Học võ thuật, võ đạo.</li>
<li><strong>Hỏi cho kỹ</strong>: Không hiểu thì hỏi.</li></ol>
<p><strong>Câu 3. Truyền thống võ học của nhân loại diễn tiến ra sao?</strong></p>
<p><strong>Đáp:</strong></p>
<p>Truyền thống võ học của nhân loại diễn tiến từ đơn giản đến phức tạp.</p>
`;

const HOANG_H_QUESTION = `
<h3>21/.Hỏi: Đạo đức căn bản nhất của người môn sinh Phật Quang Quyền là gì?</h3>
<p>Đạo đức căn bản nhất là lòng từ bi và trí tuệ.</p>
<h3>22/.Hỏi: Vì sao người môn sinh phải tôn kính Phật?</h3>
<p>Vì Phật là bậc Giác Ngộ.</p>
`;

function parseFormatted(html: string) {
  const { document } = parseHTML(`<div id="root">${formatDocxHtml(html)}</div>`);
  return document.getElementById('root')!;
}

describe('isQuestionNode', () => {
  it('detects N/. pattern', () => {
    const { document } = parseHTML('<p><strong>11/. Võ sinh và Môn sinh?</strong></p>');
    expect(isQuestionNode(document.querySelector('p')!)).toBe(true);
  });

  it('detects Câu N. pattern', () => {
    const { document } = parseHTML('<p><strong>Câu 1. Cho biết định hướng?</strong></p>');
    expect(isQuestionNode(document.querySelector('p')!)).toBe(true);
  });

  it('detects h-tag N/.Hỏi pattern', () => {
    const { document } = parseHTML('<h3>21/.Hỏi: Đạo đức căn bản?</h3>');
    expect(isQuestionNode(document.querySelector('h3')!)).toBe(true);
  });

  it('detects N/. Hỏi: pattern with space', () => {
    const { document } = parseHTML('<p>15/. Hỏi: Ý nghĩa lời thề thứ năm?</p>');
    expect(isQuestionNode(document.querySelector('p')!)).toBe(true);
  });

  it('does not treat answer ol items as questions', () => {
    const { document } = parseHTML('<li><strong>Học cho rộng</strong>: Học võ thuật.</li>');
    expect(isQuestionNode(document.querySelector('li')!)).toBe(false);
  });

  it('does not treat preamble title as a question', () => {
    const { document } = parseHTML('<p><strong>LÝ THUYẾT VÕ ĐẠO ĐAI NÂU</strong></p>');
    expect(isQuestionNode(document.querySelector('p')!)).toBe(false);
  });
});

describe('formatDocxHtml', () => {
  it('wraps each question and its answer in docx-question blocks', () => {
    const root = parseFormatted(BROWN_Q11_12);
    const questions = root.querySelectorAll('.docx-question');

    expect(questions).toHaveLength(2);
    expect(questions[0].querySelector('.docx-question__heading')?.textContent).toContain('11/.');
    expect(questions[0].querySelectorAll('ul li')).toHaveLength(2);
    expect(questions[1].querySelector('.docx-question__heading')?.textContent).toContain('12/.');
    expect(questions[1].querySelectorAll('p')).toHaveLength(2);
    expect(questions[1].querySelectorAll('ul li')).toHaveLength(1);
  });

  it('keeps multi-paragraph and ol answers inside the same block', () => {
    const root = parseFormatted(HONG_Q1_3);
    const questions = root.querySelectorAll('.docx-question');

    expect(questions).toHaveLength(3);
    expect(questions[1].querySelector('ol')).not.toBeNull();
    expect(questions[1].textContent).toContain('Học cho rộng');
    expect(questions[2].textContent).toContain('Truyền thống võ học');
  });

  it('groups h-tag questions with following answers', () => {
    const root = parseFormatted(HOANG_H_QUESTION);
    const questions = root.querySelectorAll('.docx-question');

    expect(questions).toHaveLength(2);
    expect(questions[0].querySelector('h3.docx-question__heading')).not.toBeNull();
    expect(questions[0].querySelector('p')?.textContent).toContain('từ bi');
  });

  it('places title content in docx-preamble before first question', () => {
    const html = `
      <p><strong>LÝ THUYẾT VÕ ĐẠO ĐAI NÂU</strong></p>
      <p><strong> </strong></p>
      <p><strong>1/. Đọc thuộc 6 lời thế môn sinh.</strong></p>
      <ul><li>Một, tập võ để chiến thắng sự sợ hãi.</li></ul>
    `;
    const root = parseFormatted(html);

    expect(root.querySelector('.docx-preamble')).not.toBeNull();
    expect(root.querySelector('.docx-preamble')?.textContent).toContain('LÝ THUYẾT');
    expect(root.querySelectorAll('.docx-question')).toHaveLength(1);
  });

  it('removes empty paragraphs', () => {
    const html = `
      <p><strong> </strong></p>
      <p><strong>1/. Câu hỏi đầu tiên?</strong></p>
      <p>Đáp án.</p>
    `;
    const root = parseFormatted(html);

    expect(root.querySelectorAll('p')).toHaveLength(2);
    expect(root.textContent).not.toMatch(/\s{3,}/);
  });

  it('preserves original text without generating new content', () => {
    const formatted = formatDocxHtml(BROWN_Q11_12);
    expect(formatted).toContain('Võ sinh và Môn sinh khác nhau như thế nào?');
    expect(formatted).toContain('Đoàn kết, yêu Thương, Tin cậy.');
    expect(formatted).not.toContain('doc-viewer__question');
  });
});
