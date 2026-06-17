import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import { buildQuizQuestions, isQualityAnswerOption } from '../scripts/lib/quiz-builder.mjs';
import {
  calculateScore,
  formatCorrectAnswer,
  isAnswerCorrect,
} from '@/lib/quiz-engine';
import type { QuizData, QuizQuestion } from '@/types';

const meta = { id: 'test-lesson-01', title: 'Test Lesson' };

describe('quiz-builder diversity rules', () => {
  it('should generate one question per learning objective', () => {
    const sourceQuestions = [
      {
        number: 1,
        question: 'Hỏi: Thống nhất chỉ huy là gì?',
        answer:
          'Thống nhất chỉ huy là việc điều hành theo một hệ thống duy nhất.\n\nMuốn thực hiện tốt phải có cơ quan chỉ huy thống nhất.',
      },
      {
        number: 2,
        question: 'Hỏi: Quản trị hiệu quả cần những nguyên tắc nào?',
        answer:
          'Có 4 nguyên tắc:\n\n1. Phân nhiệm rõ ràng\n\n2. Xây dựng hệ thống kiểm soát\n\n3. Biết ủy quyền\n\n4. Duy trì thống nhất chỉ huy',
      },
    ];

    const questions = buildQuizQuestions(meta, sourceQuestions);
    expect(questions).toHaveLength(2);
    expect(new Set(questions.map((q) => q.sourceQuestion)).size).toBe(2);
  });

  it('should avoid more than three consecutive questions of the same type when variety is possible', () => {
    const sourceQuestions = [
      {
        number: 1,
        question: 'Hỏi: Môn sinh cần ghi nhớ những điều gì?',
        answer:
          'Có 3 điều sơ khởi:\n\nMột, đi tập đều đặn đúng giờ.\n\nHai, trong giờ tập phải chăm chỉ luyện tập.\n\nBa, gặp người trên phải chào theo lối chào môn phái.',
      },
      {
        number: 2,
        question: 'Phật Quang Quyền thành lập năm nào?',
        answer: 'PQQ được thành lập: Năm 1992, trong những ngày đầu hình thành chùa Phật Quang.',
      },
      {
        number: 3,
        question: 'Hỏi: Quan niệm thông thường của người tập võ ra sao?',
        answer:
          'Có 4 điều cần ghi nhớ:\n\nTập võ là để tự vệ, và bảo vệ sự sống\n\nTập võ để rèn luyện sức khỏe\n\nTập võ để tu dưỡng đạo đức\n\nTập võ để phụng sự xã hội',
      },
      {
        number: 4,
        question: 'Hỏi: Khi thành lập võ đường cần làm gì trước tiên?',
        answer:
          'Trước hết phải kiện toàn nhân sự. Sau đó cần ổn định tài chính và cơ sở vật chất để bảo đảm việc vận hành.',
      },
      {
        number: 5,
        question: 'Hỏi: Thống nhất chỉ huy là gì?',
        answer:
          'Thống nhất chỉ huy là việc điều hành theo một hệ thống duy nhất để mọi người cùng thực hiện.',
      },
    ];

    const questions = buildQuizQuestions(meta, sourceQuestions);
    const types = new Set(questions.map((q) => q.type));
    expect(types.size).toBeGreaterThan(1);
  });

  it('should prefer multiple choice for must-do objectives with several required actions', () => {
    const sourceQuestions = [
      {
        number: 1,
        question: 'Muốn phát huy môn phái võ sinh PQQ phải làm gì?',
        answer:
          'Muốn phát huy môn phái võ sinh PQQ phải:\n\nSiêng năng khổ luyện để trở thành võ sư.\n\nTrong gia đình là người cha từ, con hiếu, anh hiền, em thảo\n\nVới bạn bè giữ chữ tín, sống nghĩa tình',
      },
      {
        number: 2,
        question: 'Phật Quang Quyền thành lập năm nào?',
        answer: 'PQQ được thành lập: Năm 1992.',
      },
      {
        number: 3,
        question: 'Hỏi: Thống nhất chỉ huy là gì?',
        answer:
          'Thống nhất chỉ huy là việc điều hành theo một hệ thống duy nhất.',
      },
    ];

    const mustDoQuestion = buildQuizQuestions(meta, sourceQuestions).find((q) =>
      q.sourceQuestion.includes('phát huy môn phái')
    );

    expect(mustDoQuestion?.type).toBe('multiple');
    expect(mustDoQuestion?.correctIndices?.length).toBeGreaterThanOrEqual(2);
  });

  it('should prefer multiple choice for list-style objectives', () => {
    const sourceQuestions = [
      {
        number: 1,
        question: 'Hỏi: Môn sinh cần ghi nhớ những điều gì?',
        answer:
          'Có 3 điều sơ khởi:\n\nMột, đi tập đều đặn đúng giờ.\n\nHai, trong giờ tập phải chăm chỉ luyện tập.\n\nBa, gặp người trên phải chào theo lối chào môn phái.',
      },
      {
        number: 2,
        question: 'Phật Quang Quyền thành lập năm nào?',
        answer: 'PQQ được thành lập: Năm 1992, trong những ngày đầu hình thành chùa Phật Quang.',
      },
      {
        number: 3,
        question: 'Hỏi: Quan niệm thông thường của người tập võ ra sao?',
        answer:
          'Có 4 điều cần ghi nhớ:\n\nTập võ là để tự vệ, và bảo vệ sự sống\n\nTập võ để rèn luyện sức khỏe\n\nTập võ để tu dưỡng đạo đức\n\nTập võ để phụng sự xã hội',
      },
    ];

    const listQuestion = buildQuizQuestions(meta, sourceQuestions).find((q) =>
      q.sourceQuestion.includes('ghi nhớ những điều gì')
    );

    expect(listQuestion?.type).toBe('multiple');
    expect(listQuestion?.correctIndices?.length).toBeGreaterThanOrEqual(2);
  });

  it('should generate concrete scenario questions with observable behavior', () => {
    const quizPath = path.join(
      process.cwd(),
      'content/quizzes/white-lesson-02.json'
    );
    const quiz = JSON.parse(fs.readFileSync(quizPath, 'utf-8')) as QuizData;
    const scenarioQuestions = quiz.questions.filter(
      (question) => question.type === 'scenario'
    );

    expect(scenarioQuestions.length).toBeGreaterThan(0);

    for (const question of scenarioQuestions) {
      expect(question.question).not.toMatch(/áp dụng kiến thức chưa đúng/i);
      expect(question.question).not.toMatch(/vi phạm bài học/i);
      expect(question.question).toMatch(
        /Tình huống: Theo bài học, một môn sinh .+\./
      );
      expect(question.question).toMatch(
        /đi|tập|chào|vắng|bỏ|tự ý|dùng|cư xử|hứa|lan|thách|đăng ký|thay đổi|sử dụng|từ chối|nghỉ|trễ|gây|thượng|kiểm|giải quyết|phân|ủy quyền/i
      );
      expect(typeof question.correctIndex).toBe('number');
    }
  });

  it('should not generate scenario questions for factual history objectives', () => {
    const sourceQuestions = [
      {
        number: 1,
        question: 'Phật Quang Quyền thành lập năm nào?',
        answer: 'PQQ được thành lập: Năm 1992.',
      },
      {
        number: 2,
        question: 'Quan niệm thông thường của người tập võ ra sao? tập võ để làm gì',
        answer:
          'Có 4 điều cần ghi nhớ:\n\nTập võ là để tự vệ, và bảo vệ sự sống\n\nRèn luyện khoẻ mạnh, trí tuệ minh mẫn\n\nBồi dưỡng đạo đức để học tập, lao động, cống hiến\n\nĐấu tranh cho lẽ phải và phục vụ tổ quốc.',
      },
      {
        number: 3,
        question: 'Có mấy điều sơ khởi cần ghi nhớ về kỷ luật võ đường?',
        answer:
          'Một, đi tập đều đặn đúng giờ, Nghỉ tập phải xin phép với võ sư.\n\nHai, trong giờ tập phải chăm chỉ luyện tập, không làm việc riêng.\n\nBa, gặp người trên phải chào theo lối chào của môn phái.',
      },
      {
        number: 4,
        question: 'Quan niệm dụng võ của võ sinh Phật Quang Quyền ra sao?',
        answer:
          'Không thượng đài.\n\nKhông gây hấn, không thử võ với người hoặc môn phái khác.\n\nChỉ dùng võ để tự vệ.',
      },
      {
        number: 5,
        question: 'Hỏi: Thống nhất chỉ huy là gì?',
        answer:
          'Thống nhất chỉ huy là việc điều hành theo một hệ thống duy nhất.',
      },
    ];

    const questions = buildQuizQuestions(meta, sourceQuestions);
    const historyQuestion = questions.find((q) =>
      q.sourceQuestion.includes('thành lập năm nào')
    );
    const purposeQuestion = questions.find((q) =>
      q.sourceQuestion.includes('tập võ để làm gì')
    );

    expect(historyQuestion?.type).not.toBe('scenario');
    expect(purposeQuestion?.type).not.toBe('scenario');
  });

  it('should avoid confusing near-duplicate options for Thái Tổ and greeting meaning questions', () => {
    const sourceQuestions = [
      {
        number: 3,
        question: 'Môn phái đã bái vị tôn giả nào làm Thái Tổ Sư của môn phái?',
        answer:
          'Môn phái bái tôn giả Rahula (La Hầu La), một trong thập đại đệ tử của Đức Phật với danh hiệu Mật Hạnh Đệ Nhất Bảo hộ Tăng đoàn làm Thái Tổ Sư của môn phái.',
      },
      {
        number: 6,
        question: 'Ý nghĩa lối chào của môn phái?',
        answer:
          'Môn phái dùng lối chào, giống như lối chào trong Phật giáo, hai tay chắp vào nhau. Thể hiện tinh thần hòa bình, đoàn kết và nhắc nhở người võ sinh tu dưỡng nội tâm, không để Tham, Sân, Si chi phối tạo điều xấu ác.',
      },
      {
        number: 1,
        question: 'Phật Quang Quyền thành lập năm nào?',
        answer: 'PQQ được thành lập: Năm 1992.',
      },
      {
        number: 2,
        question: 'Hỏi: Thống nhất chỉ huy là gì?',
        answer:
          'Thống nhất chỉ huy là việc điều hành theo một hệ thống duy nhất.',
      },
      {
        number: 4,
        question: 'Cho biết danh tính, ngày sinh của võ sư sáng tổ Phật Quang Quyền?',
        answer:
          'Võ sư Sáng tổ PQQ là Thượng Tọa Thượng Chân Hạ Quang. Người là viện chủ chùa Phật Quang - núi Dinh – thành phố Hồ Chí Minh; là Võ Sư Sáng Tổ. Sinh ngày 9 tháng 12 năm 1959.',
      },
    ];

    const questions = buildQuizQuestions(meta, sourceQuestions);
    const thaiToQuestion = questions.find((q) =>
      /thái tổ sư/i.test(q.sourceQuestion ?? '')
    );
    const greetingQuestion = questions.find((q) =>
      /ý nghĩa lối chào/i.test(q.sourceQuestion ?? '')
    );

    expect(thaiToQuestion?.type).toBe('fill');
    expect(thaiToQuestion?.blanks?.[0]).toMatch(/rahula/i);
    expect(greetingQuestion?.type).toBe('fill');
    expect(greetingQuestion?.blanks?.[0]).toMatch(/tinh thần hòa bình/i);
  });

  it('should reject low-quality answer options that repeat stems or headings', () => {
    const context = {
      question:
        'Muốn xây dựng tình đoàn kết trong môn phái, môn sinh PQQ phải làm gì?',
      sourceQuestion:
        'Muốn xây dựng tình đoàn kết trong môn phái, môn sinh PQQ phải làm gì?',
    };

    expect(
      isQualityAnswerOption(
        'Muốn xây dựng tình đoàn kết trong môn phái, môn sinh PQQ phải:',
        context
      )
    ).toBe(false);
    expect(
      isQualityAnswerOption('Thực hành tinh thần võ đạo trong đời sống hằng ngày:', context)
    ).toBe(false);
    expect(
      isQualityAnswerOption(
        'Loại bỏ thành kiến cá nhân và lòng ích kỷ.',
        context
      )
    ).toBe(true);
    expect(
      isQualityAnswerOption(
        'Khi có hiểu lầm, phải chân thành trao đổi và giải quyết trong tinh thần xây dựng, hoan hỷ.',
        context
      )
    ).toBe(true);
  });

  it('should not emit intro headings as quiz options', () => {
    const sourceQuestions = [
      {
        number: 1,
        question: 'Muốn xây dựng tình đoàn kết trong môn phái, Môn sinh PQQ phải làm gì?',
        answer:
          'Muốn xây dựng tình đoàn kết trong môn phái, môn sinh PQQ phải:\nLoại bỏ thành kiến cá nhân và lòng ích kỷ.\nBiết bỏ qua tự ái, thù hằn và mâu thuẫn.\nKhi có hiểu lầm, phải chân thành trao đổi và giải quyết trong tinh thần xây dựng, hoan hỷ.',
      },
      {
        number: 2,
        question: 'Phật Quang Quyền thành lập năm nào?',
        answer: 'PQQ được thành lập: Năm 1992.',
      },
      {
        number: 3,
        question: 'Muốn phát huy môn phái võ sinh PQQ phải làm gì?',
        answer:
          'Muốn phát huy môn phái võ sinh PQQ phải:\nSiêng năng khổ luyện để trở thành võ sư.\nThực hành tinh thần võ đạo của môn phái trong đời sống hằng ngày:\nTrong gia đình là người cha từ, con hiếu, anh hiền, em thảo.',
      },
      {
        number: 4,
        question: 'Hỏi: Thống nhất chỉ huy là gì?',
        answer:
          'Thống nhất chỉ huy là việc điều hành theo một hệ thống duy nhất.',
      },
      {
        number: 5,
        question: 'Có mấy điều sơ khởi cần ghi nhớ về kỷ luật võ đường?',
        answer:
          'Một, đi tập đều đặn đúng giờ, Nghỉ tập phải xin phép với võ sư.\nHai, trong giờ tập phải chăm chỉ luyện tập, không làm việc riêng.\nBa, gặp người trên phải chào theo lối chào của môn phái.',
      },
    ];

    const questions = buildQuizQuestions(meta, sourceQuestions);
    const introPattern =
      /muốn .+ phải:|thực hành .+ hằng ngày:|phải làm gì/i;

    for (const question of questions) {
      for (const option of question.options ?? []) {
        expect(option).not.toMatch(/[:：]\s*…?\s*$/);
        expect(optionRepeatsStem(option, question.question)).toBe(false);
        if (introPattern.test(option.toLowerCase())) {
          expect(option).toMatch(/[:：]\s*\S{8,}/);
        }
      }
    }
  });

  it('should build multi-select distractors as lesson-relevant instead of generic negatives', () => {
    const questions = buildQuizQuestions(meta, [
      {
        number: 1,
        question: 'Quan niệm dụng võ của võ sinh Phật Quang Quyền ra sao?',
        answer: [
          'Quan niệm dụng võ của môn sinh Phật Quang Quyền có 5 điểm:',
          'Không thượng đài.',
          'Không gây hấn, không thử võ với người hoặc môn phái khác.',
          'Chỉ dùng võ để tự vệ, bảo vệ người thân.',
          'Đấu tranh cho lẽ phải.',
          'Bảo vệ đạo pháp, và Tổ quốc.',
        ].join('\n'),
      },
      {
        number: 2,
        question: 'Hỏi: Môn sinh cần ghi nhớ những điều gì?',
        answer: [
          'Có 3 điều sơ khởi:',
          'Đi tập đều đặn đúng giờ.',
          'Trong giờ tập phải chăm chỉ luyện tập.',
          'Gặp người trên phải chào theo lối chào môn phái.',
        ].join('\n'),
      },
    ]);

    const multi = questions.find(
      (question) =>
        question.type === 'multiple' && /quan niệm dụng võ/i.test(question.sourceQuestion)
    );

    expect(multi).toBeDefined();

    const genericPattern =
      /(không thuộc nội dung bài học|không có trong bài học|thông tin không chính xác theo tài liệu|ý kiến cá nhân|quy định không có trong bài học)/i;

    for (const option of multi?.options ?? []) {
      expect(option).not.toMatch(genericPattern);
    }

    const correctOptions = (multi?.correctIndices ?? []).map(
      (index: number) => multi?.options[index] ?? ''
    );
    const wrongOptions = (multi?.options ?? []).filter(
      (_: string, index: number) => !(multi?.correctIndices ?? []).includes(index)
    );
    const stemTokens = tokenize(multi?.sourceQuestion ?? '');

    expect(wrongOptions.length).toBeGreaterThan(0);
    for (const wrong of wrongOptions) {
      const wrongTokens = tokenize(wrong);
      const hasCorrectOverlap = correctOptions.some((correct: string) =>
        [...wrongTokens].some((token) => tokenize(correct).has(token))
      );
      expect(hasCorrectOverlap).toBe(true);
    }
  });
});

function optionRepeatsStem(option: string, question: string) {
  const stem = question.replace(/\?$/, '').toLowerCase().slice(0, 28);
  return option.toLowerCase().startsWith(stem.slice(0, 20));
}

function tokenize(text: string) {
  return new Set(
    text
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((token) => token.length >= 4)
  );
}

describe('quiz-engine extended types', () => {
  const fillQuestion: QuizQuestion = {
    id: 'q-fill',
    lessonId: 'lesson',
    number: 1,
    type: 'fill',
    question: 'Điền: ______ và ______.',
    options: ['tốc độ', 'chính xác', 'sức mạnh', 'linh hoạt'],
    blanks: ['tốc độ', 'chính xác'],
  };

  const matchingQuestion: QuizQuestion = {
    id: 'q-match',
    lessonId: 'lesson',
    number: 2,
    type: 'matching',
    question: 'Ghép cặp',
    options: [],
    leftItems: ['Chánh', 'Tránh'],
    rightItems: ['Điều đúng', 'Điều sai'],
    correctPairs: [
      [0, 0],
      [1, 1],
    ],
  };

  const orderingQuestion: QuizQuestion = {
    id: 'q-order',
    lessonId: 'lesson',
    number: 3,
    type: 'ordering',
    question: 'Sắp xếp',
    options: [],
    items: ['Bước 2', 'Bước 1', 'Bước 3'],
    correctOrder: [1, 0, 2],
  };

  it('should score fill answers correctly', () => {
    expect(
      isAnswerCorrect(fillQuestion, {
        fillAnswers: [0, 1],
      })
    ).toBe(true);

    expect(
      isAnswerCorrect(fillQuestion, {
        fillAnswers: [2, 1],
      })
    ).toBe(false);
  });

  it('should score matching and ordering answers correctly', () => {
    expect(
      isAnswerCorrect(matchingQuestion, {
        matchingAnswers: [0, 1],
      })
    ).toBe(true);

    expect(
      isAnswerCorrect(orderingQuestion, {
        orderAnswers: [1, 0, 2],
      })
    ).toBe(true);
  });

  it('should format non-choice answers for review', () => {
    expect(formatCorrectAnswer(fillQuestion)).toBe('tốc độ; chính xác');
    expect(formatCorrectAnswer(matchingQuestion)).toContain('Chánh → Điều đúng');
    expect(formatCorrectAnswer(orderingQuestion)).toContain('Bước 1 → Bước 2');
  });

  it('should calculate mixed quiz scores', () => {
    const quiz: QuizData = {
      lessonId: 'lesson',
      title: 'Mixed',
      passThreshold: 70,
      questions: [fillQuestion, matchingQuestion, orderingQuestion],
    };

    const result = calculateScore(quiz, [
      { questionId: 'q-fill', fillAnswers: [0, 1] },
      { questionId: 'q-match', matchingAnswers: [0, 1] },
      { questionId: 'q-order', orderAnswers: [1, 0, 2] },
    ]);

    expect(result.score).toBe(100);
    expect(result.passed).toBe(true);
  });

  it('should build brown-belt concept lists as multi-select with all source items', () => {
    const questions = buildQuizQuestions(meta, [
      {
        number: 8,
        question: 'Quan niệm thông thường của người tập võ ra sao? tập võ để làm gì',
        answer: [
          'Có 4 điều cần ghi nhớ:',
          'Tập võ là để tự vệ, và bảo vệ sự sống',
          'Rèn luyện khoẻ mạnh, trí tuệ minh mẫn',
          'Bồi dưỡng đạo đức để học tập, lao động, cống hiến',
          '4.  Đấu tranh cho lẽ phải và phục vụ tổ quốc.',
        ].join('\n'),
      },
      {
        number: 9,
        question: 'Quan niệm dụng võ của võ sinh Phật Quang Quyền ra sao?',
        answer: [
          'Quan niệm dụng võ của môn sinh Phật Quang Quyền có 5 điểm:',
          'Không thượng đài.',
          'Không gây hấn, không thử võ với người hoặc môn phái khác.',
          'Chỉ dùng võ để tự vệ, bảo vệ người thân,',
          'Đấu tranh cho lẽ phải',
          'Bảo vệ đạo pháp, và Tổ quốc.',
        ].join('\n'),
      },
      {
        number: 11,
        question: 'Võ sinh và Môn sinh khác nhau như thế nào?',
        answer: [
          'Võ sinh là những người mới tập võ, chưa làm lễ nhập môn.',
          'Môn sinh là những người đã qua một thời gian rèn luyện võ thuật, đạt được cấp đai Hoàng Đai Nhất Cấp và đã làm lễ nhập môn.',
        ].join('\n'),
      },
    ]);

    const purposeQuestion = questions.find((q) => /tập võ để làm gì/i.test(q.question));
    const conceptQuestion = questions.find((q) =>
      /quan niệm thông thường/i.test(q.question)
    );
    const useQuestion = questions.find((q) => /quan niệm dụng võ/i.test(q.question));
    const compareQuestion = questions.find((q) => /khác nhau như thế nào/i.test(q.question));

    expect(purposeQuestion?.type).toBe('multiple');
    expect(purposeQuestion?.correctIndices?.length).toBe(4);
    expect(conceptQuestion?.type).toBe('multiple');
    expect(conceptQuestion?.correctIndices?.length).toBe(4);
    expect(useQuestion?.type).toBe('multiple');
    expect(useQuestion?.correctIndices?.length).toBe(5);
    expect(compareQuestion?.type).toBe('multiple');
    expect(compareQuestion?.correctIndices?.length).toBe(2);
  });

  it('should build idea-origin questions as multi-select with all listed motivations', () => {
    const questions = buildQuizQuestions(meta, [
      {
        number: 2,
        question:
          'Phật Quang Quyền (PQQ) thành lập ngày tháng năm nào? Do ai sáng lập, ý tưởng từ đâu mà lập ra môn võ này?',
        answer: [
          'PQQ được thành lập: Năm 1992.',
          'Môn phái PQQ do: Võ sư Thượng tọa Thượng Chân hạ Quang sáng lập nên.',
          'Nguồn gốc ý tưởng:',
          'Võ sư sáng tổ được rèn luyện võ thuật từ thời niên thiếu nhưng do nhiều yếu tố khách quan, với vai trò là một tu sĩ Phật Giáo nên võ sư sáng tổ có rất nhiều công tác Phật sự nên không có cơ hội luyện tập một môn võ xuyên suốt. Tuy nhiên Võ sư sáng tổ lại có cơ duyên được tham học nhiều bậc tiền bối về võ thuật từ đó đúc kết được những tinh hoa trong võ học.',
          'Mong muốn phục dựng truyền thống võ học trong Thiền môn.',
          'Giúp Tăng Ni và thanh thiếu niên rèn luyện sức khỏe, đạo đức và bản lĩnh.',
          'Xây dựng thế hệ văn võ song toàn, phụng sự Đạo pháp và dân tộc.',
        ].join('\n'),
      },
    ]);

    const ideaQuestion = questions.find((question) =>
      /ý tưởng.*từ đâu/i.test(question.question)
    );

    expect(ideaQuestion?.type).toBe('multiple');
    expect(ideaQuestion?.question).toMatch(/chọn tất cả đáp án đúng/i);
    expect(ideaQuestion?.correctIndices?.length).toBe(4);
    const ideaCorrectOptions = (ideaQuestion?.correctIndices ?? []).map(
      (index: number) => ideaQuestion?.options?.[index] ?? ''
    );
    expect(ideaCorrectOptions.join(' ')).toMatch(/tham học nhiều bậc tiền bối/i);
    expect(ideaQuestion?.options?.join(' ')).toMatch(/phục dựng truyền thống võ học/i);
  });

  it('should build martial-use questions as multi-select with all three allowed cases', () => {
    const questions = buildQuizQuestions(meta, [
      {
        number: 10,
        question:
          'Võ sinh Phật Quang Quyền (VSPQQ) được phép dụng võ trong các trường hợp nào? VS PQQ không được phép thượng đài?',
        answer: [
          'Chỉ dụng võ trong 3 trường hợp:',
          'Danh dự bị xúc phạm.',
          'Quyền sống bị đe dọa.',
          'Bênh vực lẽ phải.',
          'Vì sao không được thượng đài?',
          'Thượng đài dễ tạo tâm hiếu thắng, hiếu chiến.',
        ].join('\n'),
      },
    ]);

    const useQuestion = questions.find((question) =>
      /được phép dụng võ/i.test(question.question)
    );
    const arenaQuestion = questions.find((question) =>
      question.type === 'truefalse' && /thượng đài/i.test(question.question)
    );

    expect(useQuestion?.type).toBe('multiple');
    expect(useQuestion?.correctIndices?.length).toBe(3);
    expect(arenaQuestion?.correctIndex).toBe(1);
  });

  it('should build nation-duty questions as multi-select with all listed qualities', () => {
    const questions = buildQuizQuestions(meta, [
      {
        number: 2,
        question: 'Cho biết nghĩa vụ của môn sinh PQQ đối với dân tộc như thế nào?',
        answer: [
          'Nghĩa vụ của môn sinh PQQ là phải xây dựng một thế hệ thanh niên PQQ có những phẩm chất:',
          'Biết phụng sự và giúp đỡ mọi người.',
          'Biết tu dưỡng, diệt trừ bản ngã.',
          'Biết yêu thương và chia sẻ với mọi người.',
          'Nuôi dưỡng lòng yêu nước, góp phần bảo vệ và xây dựng đất nước.',
        ].join('\n'),
      },
    ]);

    const dutyQuestion = questions.find((question) =>
      /nghĩa vụ.*đối với dân tộc/i.test(question.question)
    );

    expect(dutyQuestion?.type).toBe('multiple');
    expect(dutyQuestion?.correctIndices?.length).toBe(4);
  });
});
