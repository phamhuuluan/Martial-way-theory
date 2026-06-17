import { describe, expect, it } from 'vitest';
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
    const sourceQuestions = [
      {
        number: 1,
        question: 'Có mấy điều sơ khởi cần ghi nhớ về kỷ luật võ đường?',
        answer:
          'Môn sinh Phật Quang Quyền cần ghi nhớ 3 điều sơ khởi:\n\nMột, đi tập đều đặn đúng giờ, Nghỉ tập phải xin phép với võ sư hoặc huấn luyện viên phụ trách.\n\nHai, trong giờ tập phải chăm chỉ luyện tập, không làm việc riêng, đoàn kết, giúp đỡ đồng môn.\n\nBa, gặp người trên hoặc huynh đệ đồng môn, phải chào theo lối chào của môn phái. Khi đến võ đường và trước khi ra về phải chào tôn ảnh của Thái Tổ Sư.',
      },
      {
        number: 2,
        question: 'Phật Quang Quyền thành lập năm nào?',
        answer: 'PQQ được thành lập: Năm 1992.',
      },
      {
        number: 3,
        question: 'Quan niệm dụng võ của võ sinh Phật Quang Quyền ra sao?',
        answer:
          'Quan niệm dụng võ có 5 điểm:\n\nKhông thượng đài.\n\nKhông gây hấn, không thử võ với người hoặc môn phái khác.\n\nChỉ dùng võ để tự vệ, bảo vệ người thân.\n\nĐấu tranh cho lẽ phải.\n\nBảo vệ đạo pháp, và Tổ quốc.',
      },
      {
        number: 4,
        question: 'Hỏi: Thống nhất chỉ huy là gì?',
        answer:
          'Thống nhất chỉ huy là việc điều hành theo một hệ thống duy nhất để mọi người cùng thực hiện.',
      },
      {
        number: 5,
        question: 'Hỏi: Quản trị hiệu quả cần những nguyên tắc nào?',
        answer:
          'Có 4 nguyên tắc:\n\n1. Phân nhiệm rõ ràng\n\n2. Xây dựng hệ thống kiểm soát\n\n3. Biết ủy quyền\n\n4. Duy trì thống nhất chỉ huy',
      },
    ];

    const scenarioQuestions = buildQuizQuestions(meta, sourceQuestions).filter(
      (question) => question.type === 'scenario'
    );

    expect(scenarioQuestions.length).toBeGreaterThan(0);

    for (const question of scenarioQuestions) {
      expect(question.question).not.toMatch(/áp dụng kiến thức chưa đúng/i);
      expect(question.question).not.toMatch(/vi phạm bài học/i);
      expect(question.question).toMatch(/Tình huống: Một môn sinh .+\./);
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
});

function optionRepeatsStem(option: string, question: string) {
  const stem = question.replace(/\?$/, '').toLowerCase().slice(0, 28);
  return option.toLowerCase().startsWith(stem.slice(0, 20));
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
});
