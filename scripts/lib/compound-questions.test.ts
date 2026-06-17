import { describe, expect, it } from 'vitest';
import {
  isCompoundQuestion,
  splitAnswerForClauses,
  splitCompoundSourceQuestion,
  splitQuestionClauses,
} from './compound-questions.mjs';

describe('splitQuestionClauses', () => {
  it('splits two-part compound questions', () => {
    const clauses = splitQuestionClauses(
      'VSPQQ được phép dụng võ trong các trường hợp nào? VS PQQ không được phép thượng đài?'
    );

    expect(clauses).toHaveLength(2);
    expect(clauses[0]).toContain('trường hợp nào');
    expect(clauses[1]).toContain('thượng đài');
  });

  it('ignores builder suffixes when counting clauses', () => {
    const clauses = splitQuestionClauses(
      'Đạo hạnh là gì? Tại sao phải rèn luyện? (Chọn tất cả đáp án đúng)'
    );

    expect(clauses).toHaveLength(2);
  });
});

describe('splitCompoundSourceQuestion', () => {
  it('splits answer at sub-question markers', () => {
    const sourceQ = {
      number: 10,
      question:
        'Võ sinh Phật Quang Quyền được phép dụng võ trong các trường hợp nào? VS PQQ không được phép thượng đài?',
      answer: [
        'Chỉ dụng võ trong 3 trường hợp:',
        'Danh dự bị xúc phạm.',
        'Vì sao không được thượng đài?',
        'Thượng đài dễ tạo tâm hiếu thắng.',
      ].join('\n'),
    };

    const splits = splitCompoundSourceQuestion(sourceQ);
    expect(splits).toHaveLength(2);
    expect(splits[0].answer).toContain('Danh dự bị xúc phạm');
    expect(splits[0].answer).not.toContain('Thượng đài dễ');
    expect(splits[1].answer).toContain('Thượng đài dễ');
  });

  it('leaves single-intent questions unchanged', () => {
    const sourceQ = {
      number: 1,
      question: 'Vì sao người môn sinh phải giữ lời hứa?',
      answer: 'Vì lời hứa thể hiện đức tính.',
    };

    expect(isCompoundQuestion(sourceQ.question)).toBe(false);
    expect(splitCompoundSourceQuestion(sourceQ)).toHaveLength(1);
  });

  it('splits founding question into year, founder, and idea objectives', () => {
    const sourceQ = {
      number: 2,
      question:
        'Phật Quang Quyền (PQQ) thành lập ngày tháng năm nào? Do ai sáng lập, ý tưởng từ đâu mà lập ra môn võ này?',
      answer: [
        'PQQ được thành lập: Năm 1992, trong những ngày đầu hình thành chùa Phật Quang.',
        'Môn phái PQQ do: Võ sư Thượng tọa Thượng Chân hạ Quang, Viện chủ chùa Phật Quang sáng lập nên.',
        'Nguồn gốc ý tưởng:',
        'Mong muốn phục dựng truyền thống võ học trong Thiền môn.',
      ].join('\n'),
    };

    const splits = splitCompoundSourceQuestion(sourceQ);
    expect(splits.length).toBeGreaterThanOrEqual(3);
    expect(splits[0].question).toContain('năm nào');
    expect(splits[1].question.toLowerCase()).toContain('do ai sáng lập');
    expect(splits[2].question.toLowerCase()).toContain('ý tưởng');
    expect(splits[1].answer).toContain('Võ sư Thượng tọa');
    expect(splits[1].answer).not.toContain('nhiều yếu tố khách quan');
  });
});

describe('splitAnswerForClauses', () => {
  it('returns full answer when only one clause', () => {
    expect(splitAnswerForClauses('Một đoạn đáp án.', ['Câu hỏi?'])).toEqual([
      'Một đoạn đáp án.',
    ]);
  });
});
