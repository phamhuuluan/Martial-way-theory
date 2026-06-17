'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { QuizData, QuizQuestion } from '@/types';
import { QuizOption } from '@/components/quiz/QuizOption';
import { QuizFillBlank } from '@/components/quiz/QuizFillBlank';
import { QuizMatching } from '@/components/quiz/QuizMatching';
import { QuizOrdering } from '@/components/quiz/QuizOrdering';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Progress';
import {
  calculateScore,
  evaluateMultipleChoice,
  formatCorrectAnswer,
  formatMissedMultipleChoiceAnswers,
  getQuestionType,
  getResultMessage,
  isFillQuestion,
  isMatchingQuestion,
  isMultipleChoice,
  isOrderingQuestion,
  PARTIAL_CORRECT_MESSAGE,
  PARTIAL_REVIEW_MESSAGE,
  type QuizAnswer,
  type QuizResult,
} from '@/lib/quiz-engine';
import { randomizeQuizSession } from '@/lib/quiz-randomize';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getNewAchievements } from '@/lib/achievements';
import { BadgeReveal } from '@/components/achievement/AchievementGrid';
import { useProgressStore } from '@/store/progress-store';
import Link from 'next/link';

type QuizPhase = 'intro' | 'question' | 'result';

interface QuizEngineProps {
  quiz: QuizData;
  lessonId: string;
  belt: string;
  lessonSlug: string;
  beltAccent: string;
  nextLessonHref?: string | null;
}

function createInitialOrder(question: QuizQuestion): number[] {
  return (question.items ?? []).map((_, index) => index);
}

function createInitialMatching(question: QuizQuestion): number[] {
  return (question.leftItems ?? []).map(() => -1);
}

function createInitialFill(question: QuizQuestion): number[] {
  return (question.blanks ?? []).map(() => -1);
}

export function QuizEngine({
  quiz,
  lessonId,
  belt,
  lessonSlug,
  beltAccent,
  nextLessonHref,
}: QuizEngineProps) {
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [sessionQuiz, setSessionQuiz] = useState<QuizData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [fillAnswers, setFillAnswers] = useState<number[]>([]);
  const [matchingAnswers, setMatchingAnswers] = useState<number[]>([]);
  const [orderAnswers, setOrderAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [resultMessage, setResultMessage] = useState('');
  const [expandedWrong, setExpandedWrong] = useState<string[]>([]);
  const [newBadge, setNewBadge] = useState<{ id: string; name: string; icon: string } | null>(null);

  const progress = useProgressStore((s) => s.progress);
  const completeQuiz = useProgressStore((s) => s.completeQuiz);
  const reduced = useReducedMotion();

  const activeQuiz = sessionQuiz ?? quiz;
  const currentQuestion = activeQuiz.questions[currentIndex];
  const totalQuestions = activeQuiz.questions.length;
  const questionType = currentQuestion ? getQuestionType(currentQuestion) : 'single';
  const multiple = currentQuestion ? isMultipleChoice(currentQuestion) : false;

  useEffect(() => {
    if (!currentQuestion) return;
    setFillAnswers(createInitialFill(currentQuestion));
    setMatchingAnswers(createInitialMatching(currentQuestion));
    setOrderAnswers(createInitialOrder(currentQuestion));
  }, [currentQuestion]);

  const resetSelection = () => {
    setSelectedIndex(null);
    setSelectedIndices([]);
    setShowFeedback(false);
    if (currentQuestion) {
      setFillAnswers(createInitialFill(currentQuestion));
      setMatchingAnswers(createInitialMatching(currentQuestion));
      setOrderAnswers(createInitialOrder(currentQuestion));
    }
  };

  const handleSelectSingle = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    setShowFeedback(true);
  };

  const handleToggleMultiple = (index: number) => {
    if (showFeedback) return;
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleConfirmMultiple = () => {
    if (showFeedback || selectedIndices.length === 0) return;
    setShowFeedback(true);
  };

  const handleFillSelect = (blankIndex: number, optionIndex: number) => {
    if (showFeedback) return;
    setFillAnswers((prev) => {
      const next = [...prev];
      const existingAt = next.indexOf(optionIndex);
      if (existingAt >= 0) next[existingAt] = -1;
      next[blankIndex] = optionIndex;
      return next;
    });
  };

  const handleFillRemove = (blankIndex: number) => {
    if (showFeedback) return;
    setFillAnswers((prev) => {
      const next = [...prev];
      next[blankIndex] = -1;
      return next;
    });
  };

  const handleMatchingSelect = (leftIndex: number, rightIndex: number) => {
    if (showFeedback) return;
    setMatchingAnswers((prev) => {
      const next = [...prev];
      next[leftIndex] = rightIndex;
      return next;
    });
  };

  const handleMoveOrder = (position: number, direction: -1 | 1) => {
    if (showFeedback) return;
    setOrderAnswers((prev) => {
      const next = [...prev];
      const target = position + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[position], next[target]] = [next[target], next[position]];
      return next;
    });
  };

  const buildCurrentAnswer = (): QuizAnswer | null => {
    if (!currentQuestion) return null;

    if (isMultipleChoice(currentQuestion)) {
      return {
        questionId: currentQuestion.id,
        selectedIndices: [...selectedIndices].sort((a, b) => a - b),
      };
    }

    if (isFillQuestion(currentQuestion)) {
      return {
        questionId: currentQuestion.id,
        fillAnswers: [...fillAnswers],
      };
    }

    if (isMatchingQuestion(currentQuestion)) {
      return {
        questionId: currentQuestion.id,
        matchingAnswers: [...matchingAnswers],
      };
    }

    if (isOrderingQuestion(currentQuestion)) {
      return {
        questionId: currentQuestion.id,
        orderAnswers: [...orderAnswers],
      };
    }

    if (selectedIndex === null) return null;

    return {
      questionId: currentQuestion.id,
      selectedIndex,
    };
  };

  const isSelectionComplete = (): boolean => {
    if (!currentQuestion) return false;

    if (isMultipleChoice(currentQuestion)) {
      return selectedIndices.length > 0;
    }

    if (isFillQuestion(currentQuestion)) {
      return fillAnswers.every((value) => value >= 0);
    }

    if (isMatchingQuestion(currentQuestion)) {
      return matchingAnswers.every((value) => value >= 0);
    }

    if (isOrderingQuestion(currentQuestion)) {
      return orderAnswers.length > 0;
    }

    return selectedIndex !== null;
  };

  const handleConfirmInteractive = () => {
    if (showFeedback || !isSelectionComplete()) return;
    setShowFeedback(true);
  };

  const handleNext = () => {
    const currentAnswer = buildCurrentAnswer();
    if (!currentAnswer || !currentQuestion) return;

    const newAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion.id),
      currentAnswer,
    ];
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
      resetSelection();
    } else {
      const quizResult = calculateScore(activeQuiz, newAnswers);
      setResult(quizResult);
      setResultMessage(getResultMessage(quizResult.passed));
      setPhase('result');

      const before = progress;
      const after = completeQuiz(
        lessonId,
        quizResult.score,
        quizResult.passed,
        quizResult.wrongQuestions
      );
      const newAchievements = getNewAchievements(before, after);
      if (newAchievements.length > 0) {
        setNewBadge({
          id: newAchievements[0].id,
          name: newAchievements[0].name,
          icon: newAchievements[0].icon,
        });
      }
    }
  };

  const getOptionState = (
    question: QuizQuestion,
    optionIndex: number
  ): 'default' | 'correct' | 'incorrect' | 'reveal-correct' | 'missed-key' => {
    if (!showFeedback) return 'default';

    if (isMultipleChoice(question)) {
      const expected = question.correctIndices ?? [];
      const isExpected = expected.includes(optionIndex);
      const selected = selectedIndices.includes(optionIndex);
      const evaluation = evaluateMultipleChoice(question, { selectedIndices });

      if (isExpected && selected) return 'correct';
      if (!isExpected && selected) return 'incorrect';

      if (isExpected && !selected) {
        return evaluation.level === 'partial' ? 'missed-key' : 'reveal-correct';
      }

      return 'default';
    }

    const expectedIndex = question.correctIndex;
    if (typeof expectedIndex !== 'number') return 'default';

    if (selectedIndex === null) return 'default';
    if (optionIndex === expectedIndex) {
      return selectedIndex === optionIndex ? 'correct' : 'reveal-correct';
    }
    if (optionIndex === selectedIndex) return 'incorrect';
    return 'default';
  };

  const currentMultipleEvaluation =
    showFeedback && currentQuestion && isMultipleChoice(currentQuestion)
      ? evaluateMultipleChoice(currentQuestion, { selectedIndices })
      : null;

  const startQuiz = () => {
    setSessionQuiz(randomizeQuizSession(quiz));
    setCurrentIndex(0);
    setAnswers([]);
    resetSelection();
    setResult(null);
    setResultMessage('');
    setExpandedWrong([]);
    setPhase('question');
  };

  const restart = () => {
    setSessionQuiz(null);
    setPhase('intro');
    setCurrentIndex(0);
    setAnswers([]);
    resetSelection();
    setResult(null);
    setResultMessage('');
    setExpandedWrong([]);
  };

  const toggleWrong = (id: string) => {
    setExpandedWrong((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">{quiz.title}</h1>
        <p className="text-text-secondary mb-2">{totalQuestions} câu hỏi</p>
        <p className="text-text-secondary mb-8">
          Mức cần đạt để tiếp tục: <strong className="text-unlock">{quiz.passThreshold}%</strong>
        </p>
        <Button variant="hero" size="lg" onClick={startQuiz}>
          Bắt đầu kiểm tra
        </Button>
        <div className="mt-4">
          <Link
            href={`/world/${belt}/${lessonSlug}`}
            className="text-sm text-text-secondary hover:text-unlock"
          >
            ← Quay lại bài học
          </Link>
        </div>
      </div>
    );
  }

  if (phase === 'result' && result) {
    const wrongQuestions = activeQuiz.questions.filter((q) =>
      result.wrongQuestions.includes(q.id)
    );
    const partialQuestions = activeQuiz.questions.filter((q) =>
      result.partialQuestions.includes(q.id)
    );

    const renderReviewCard = (
      q: QuizQuestion,
      tone: 'error' | 'warning',
      detail?: ReactNode
    ) => (
      <div
        key={q.id}
        className="rounded-[var(--radius-md)] border border-border bg-bg-secondary"
      >
        <button
          className="flex w-full items-center justify-between p-4 text-left text-sm"
          onClick={() => toggleWrong(q.id)}
        >
          <span>
            <span className={tone === 'error' ? 'text-error' : 'text-unlock'}>
              {tone === 'error' ? '✗' : '~'}
            </span>{' '}
            Câu {q.number}: {q.question.slice(0, 60)}…
          </span>
          {expandedWrong.includes(q.id) ? (
            <ChevronUp className="h-4 w-4 shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0" />
          )}
        </button>
        {expandedWrong.includes(q.id) && (
          <div className="border-t border-border px-4 pb-4 text-sm">
            <p className="mb-2 text-text-secondary whitespace-pre-line">{q.question}</p>
            {detail}
            {tone === 'error' && (
              <p className="text-success">
                Đáp án đúng: {formatCorrectAnswer(q)}
              </p>
            )}
            {q.explanation && (
              <p className="mt-2 text-text-muted text-xs">{q.explanation}</p>
            )}
          </div>
        )}
      </div>
    );

    return (
      <div className="mx-auto max-w-lg px-4 py-12">
        {newBadge && (
          <BadgeReveal
            name={newBadge.name}
            icon={newBadge.icon}
            achievementId={newBadge.id}
            onDismiss={() => setNewBadge(null)}
          />
        )}

        <div className="text-center mb-8">
          <motion.div
            className={`mx-auto mb-4 flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 ${
              result.passed ? 'border-success text-success' : 'border-error text-error'
            }`}
            initial={reduced ? {} : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <span className="text-3xl font-bold">{result.score}%</span>
            <span className="text-sm font-semibold">
              {result.passed ? '✓ Đủ điều kiện tiếp tục' : 'Cần ôn thêm'}
            </span>
          </motion.div>

          <p className="font-display text-lg italic text-text-secondary">
            &ldquo;{resultMessage}&rdquo;
          </p>

          <p className="mt-4 text-sm">
            ✓ {result.correctCount}/{result.totalQuestions} câu đúng
            {result.partialCount > 0 && (
              <span className="text-unlock">
                {' '}
                · ~ {result.partialCount} câu đúng một phần
              </span>
            )}
          </p>
        </div>

        {partialQuestions.length > 0 && (
          <div className="mb-8 space-y-2">
            <p className="text-sm font-semibold text-unlock">
              ~ {partialQuestions.length} câu đúng một phần — nên ôn thêm
            </p>
            {partialQuestions.map((q) => {
              const answer = result.answers.find((item) => item.questionId === q.id);
              const evaluation = answer
                ? evaluateMultipleChoice(q, answer)
                : null;

              return renderReviewCard(
                q,
                'warning',
                evaluation && evaluation.missedIndices.length > 0 ? (
                  <div className="mb-2 rounded-[var(--radius-md)] border border-unlock/30 bg-unlock/5 p-3 text-unlock">
                    <p className="font-medium">{PARTIAL_CORRECT_MESSAGE}</p>
                    <p className="mt-2">
                      Ý còn thiếu:{' '}
                      {formatMissedMultipleChoiceAnswers(q, evaluation.missedIndices)}
                    </p>
                    <p className="mt-2 text-text-secondary">{PARTIAL_REVIEW_MESSAGE}</p>
                  </div>
                ) : undefined
              );
            })}
          </div>
        )}

        {wrongQuestions.length > 0 && (
          <div className="mb-8 space-y-2">
            <p className="text-sm font-semibold text-error">
              ✗ {wrongQuestions.length} câu cần ôn lại
            </p>
            {wrongQuestions.map((q) => renderReviewCard(q, 'error'))}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {result.passed && nextLessonHref && (
            <Link href={nextLessonHref}>
              <Button variant="hero" size="lg" className="w-full">
                Tiếp tục bài sau →
              </Button>
            </Link>
          )}
          <Link href={`/world/${belt}/${lessonSlug}`}>
            <Button variant="secondary" size="md" className="w-full">
              Xem lại bài học
            </Button>
          </Link>
          <Button variant="ghost" size="md" className="w-full" onClick={restart}>
            Làm lại quiz
          </Button>
        </div>
      </div>
    );
  }

  const usesConfirmButton =
    multiple ||
    (currentQuestion &&
      (isFillQuestion(currentQuestion) ||
        isMatchingQuestion(currentQuestion) ||
        isOrderingQuestion(currentQuestion)));

  const canAdvance = usesConfirmButton
    ? showFeedback
    : showFeedback && selectedIndex !== null;

  const renderQuestionBody = () => {
    if (!currentQuestion) return null;

    if (isFillQuestion(currentQuestion)) {
      return (
        <QuizFillBlank
          wordBank={currentQuestion.options}
          blankCount={currentQuestion.blanks?.length ?? 0}
          selectedByBlank={fillAnswers}
          feedback={showFeedback}
          correctBlanks={currentQuestion.blanks}
          disabled={showFeedback}
          onSelect={handleFillSelect}
          onRemove={handleFillRemove}
        />
      );
    }

    if (isMatchingQuestion(currentQuestion)) {
      return (
        <QuizMatching
          leftItems={currentQuestion.leftItems ?? []}
          rightItems={currentQuestion.rightItems ?? []}
          selectedByLeft={matchingAnswers}
          correctPairs={currentQuestion.correctPairs}
          feedback={showFeedback}
          disabled={showFeedback}
          onSelect={handleMatchingSelect}
        />
      );
    }

    if (isOrderingQuestion(currentQuestion)) {
      return (
        <QuizOrdering
          items={currentQuestion.items ?? []}
          order={orderAnswers}
          correctOrder={currentQuestion.correctOrder}
          feedback={showFeedback}
          disabled={showFeedback}
          onMove={handleMoveOrder}
        />
      );
    }

    return (
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, i) => (
          <QuizOption
            key={i}
            label={option}
            index={i}
            multiple={multiple}
            selected={
              multiple ? selectedIndices.includes(i) : selectedIndex === i
            }
            state={getOptionState(currentQuestion, i)}
            disabled={showFeedback}
            onSelect={() =>
              multiple ? handleToggleMultiple(i) : handleSelectSingle(i)
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>
            Câu {currentIndex + 1} / {totalQuestions}
          </span>
          <span>{Math.round(((currentIndex + (showFeedback ? 1 : 0)) / totalQuestions) * 100)}%</span>
        </div>
        <ProgressBar
          value={currentIndex + (showFeedback ? 1 : 0)}
          max={totalQuestions}
          color={beltAccent}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={reduced ? {} : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? {} : { opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {multiple && !showFeedback && (
            <p className="mb-3 text-sm text-text-muted">
              Chọn tất cả đáp án đúng, sau đó bấm Xác nhận.
            </p>
          )}

          {isFillQuestion(currentQuestion) && !showFeedback && (
            <p className="mb-3 text-sm text-text-muted">
              Chọn từ trong ngân hàng từ để điền vào từng chỗ trống.
            </p>
          )}

          {isMatchingQuestion(currentQuestion) && !showFeedback && (
            <p className="mb-3 text-sm text-text-muted">
              Ghép từng mục bên trái với nội dung đúng bên phải.
            </p>
          )}

          {isOrderingQuestion(currentQuestion) && !showFeedback && (
            <p className="mb-3 text-sm text-text-muted">
              Dùng mũi tên để sắp xếp các bước theo đúng thứ tự.
            </p>
          )}

          {questionType === 'scenario' && !showFeedback && (
            <p className="mb-3 text-sm text-text-muted">
              Đọc tình huống và chọn đáp án phù hợp nhất.
            </p>
          )}

          <h2 className="font-display text-xl font-semibold mb-6 leading-relaxed whitespace-pre-line">
            {currentQuestion.question}
          </h2>

          {renderQuestionBody()}

          {currentMultipleEvaluation?.level === 'partial' && (
            <div className="mb-6 rounded-[var(--radius-md)] border border-unlock/30 bg-unlock/5 p-4 text-sm">
              <p className="font-semibold text-unlock">Đúng một phần</p>
              <p className="mt-2 text-text-secondary">{PARTIAL_CORRECT_MESSAGE}</p>
              {currentMultipleEvaluation.missedIndices.length > 0 && (
                <p className="mt-2 text-unlock">
                  Ý còn thiếu:{' '}
                  {formatMissedMultipleChoiceAnswers(
                    currentQuestion,
                    currentMultipleEvaluation.missedIndices
                  )}
                </p>
              )}
              <p className="mt-2 text-text-muted">{PARTIAL_REVIEW_MESSAGE}</p>
            </div>
          )}

          {currentMultipleEvaluation?.level === 'incorrect' && (
            <div className="mb-6 rounded-[var(--radius-md)] border border-error/30 bg-error/5 p-4 text-sm">
              <p className="font-semibold text-error">Chưa đúng</p>
              <p className="mt-2 text-text-secondary">
                Câu trả lời chưa đạt yêu cầu. Hãy xem các đáp án đúng được đánh dấu bên dưới.
              </p>
              <p className="mt-2 text-success">
                Đáp án đúng: {formatCorrectAnswer(currentQuestion)}
              </p>
            </div>
          )}

          {usesConfirmButton && !showFeedback ? (
            <Button
              variant="primary"
              size="lg"
              className="w-full mt-8"
              beltColor={beltAccent}
              disabled={!isSelectionComplete()}
              onClick={
                multiple ? handleConfirmMultiple : handleConfirmInteractive
              }
            >
              Xác nhận
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              className="w-full mt-8"
              beltColor={beltAccent}
              disabled={!canAdvance}
              onClick={handleNext}
            >
              {currentIndex < totalQuestions - 1 ? 'Tiếp theo →' : 'Nộp bài'}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
