'use client';

import { useEffect } from 'react';
import type { QuizQuestion } from '@/types';
import { QuizFillBlank } from '@/components/quiz/QuizFillBlank';
import { QuizMatching } from '@/components/quiz/QuizMatching';
import { QuizOption } from '@/components/quiz/QuizOption';
import { QuizOrdering } from '@/components/quiz/QuizOrdering';
import {
  getCorrectIndices,
  getQuestionType,
  isDefinitionQuestion,
  isFillQuestion,
  isMatchingQuestion,
  isMultipleChoice,
  isOrderingQuestion,
  isTrueFalseQuestion,
  TRUE_FALSE_OPTIONS,
  type QuizAnswer,
} from '@/lib/quiz-engine';

interface ExamQuestionProps {
  question: QuizQuestion;
  answer?: QuizAnswer;
  revealed?: boolean;
  disabled?: boolean;
  onChange: (answer: QuizAnswer) => void;
}

function choiceState(
  question: QuizQuestion,
  index: number,
  selected: boolean,
  revealed: boolean
): 'default' | 'correct' | 'incorrect' | 'reveal-correct' {
  if (!revealed) return 'default';
  const correct = getCorrectIndices(question).includes(index);
  if (correct && selected) return 'correct';
  if (correct) return 'reveal-correct';
  if (selected) return 'incorrect';
  return 'default';
}

export function ExamQuestion({
  question,
  answer,
  revealed = false,
  disabled = false,
  onChange,
}: ExamQuestionProps) {
  const locked = disabled || revealed;
  const type = getQuestionType(question);

  useEffect(() => {
    if (locked || !isOrderingQuestion(question)) return;
    const itemCount = question.items?.length ?? 0;
    if (itemCount === 0) return;
    if (answer?.orderAnswers?.length === itemCount) return;
    onChange({
      questionId: question.id,
      orderAnswers: question.items!.map((_, index) => index),
    });
  }, [answer?.orderAnswers, locked, onChange, question]);

  if (isTrueFalseQuestion(question)) {
    const options = question.options.length >= 2 ? question.options : [...TRUE_FALSE_OPTIONS];
    return (
      <div className="space-y-3">
        {options.map((option, index) => (
          <QuizOption
            key={option}
            label={option}
            index={index}
            selected={answer?.trueFalseIndex === index}
            state={choiceState(question, index, answer?.trueFalseIndex === index, revealed)}
            disabled={locked}
            onSelect={() => onChange({ questionId: question.id, trueFalseIndex: index })}
          />
        ))}
      </div>
    );
  }

  if (isFillQuestion(question)) {
    const selected = answer?.fillAnswers ?? (question.blanks ?? []).map(() => -1);
    return (
      <QuizFillBlank
        wordBank={question.options}
        optionsOrder={question.optionsOrder}
        blankCount={question.blanks?.length ?? 0}
        selectedByBlank={selected}
        feedback={revealed}
        correctBlanks={question.blanks}
        disabled={locked}
        onSelect={(blankIndex, optionIndex) => {
          const next = [...selected];
          next[blankIndex] = optionIndex;
          onChange({ questionId: question.id, fillAnswers: next });
        }}
        onRemove={(blankIndex) => {
          const next = [...selected];
          next[blankIndex] = -1;
          onChange({ questionId: question.id, fillAnswers: next });
        }}
      />
    );
  }

  if (isMatchingQuestion(question)) {
    const selected = answer?.matchingAnswers ?? (question.leftItems ?? []).map(() => -1);
    return (
      <QuizMatching
        leftItems={question.leftItems ?? []}
        rightItems={question.rightItems ?? []}
        rightItemsOrder={question.rightItemsOrder}
        selectedByLeft={selected}
        correctPairs={question.correctPairs}
        feedback={revealed}
        disabled={locked}
        onSelect={(leftIndex, rightIndex) => {
          const next = [...selected];
          next[leftIndex] = rightIndex;
          onChange({ questionId: question.id, matchingAnswers: next });
        }}
      />
    );
  }

  if (isDefinitionQuestion(question)) {
    return (
      <textarea
        className="min-h-28 w-full rounded-[var(--radius-sm)] border border-border bg-bg-primary px-4 py-3 text-base text-text-primary placeholder:text-text-muted focus:border-unlock focus:outline-none focus:ring-1 focus:ring-unlock/50 disabled:opacity-70"
        value={answer?.textAnswer ?? ''}
        disabled={locked}
        placeholder="Viết một câu ngắn"
        onChange={(event) =>
          onChange({ questionId: question.id, textAnswer: event.target.value })
        }
      />
    );
  }

  if (isOrderingQuestion(question)) {
    const order = answer?.orderAnswers ?? question.itemsOrder ?? (question.items ?? []).map((_, index) => index);
    return (
      <QuizOrdering
        items={question.items ?? []}
        order={order}
        correctOrder={question.correctOrder}
        feedback={revealed}
        disabled={locked}
        onMove={(position, direction) => {
          const next = [...order];
          const target = position + direction;
          if (target < 0 || target >= next.length) return;
          [next[position], next[target]] = [next[target], next[position]];
          onChange({ questionId: question.id, orderAnswers: next });
        }}
      />
    );
  }

  const multiple = isMultipleChoice(question) || type === 'multiple';
  const selectedIndices = answer?.selectedIndices ?? [];

  return (
    <div className="space-y-3">
      {(question.optionsOrder ?? question.options.map((_, i) => i)).map((originalIndex, displayIndex) => {
        const option = question.options[originalIndex];
        const index = originalIndex;
        const selected = multiple ? selectedIndices.includes(index) : answer?.selectedIndex === index;
        return (
          <QuizOption
            key={`${question.id}-${index}`}
            label={option}
            index={index}
            multiple={multiple}
            selected={selected}
            state={choiceState(question, index, selected, revealed)}
            disabled={locked}
            onSelect={() => {
              if (multiple) {
                const next = selected
                  ? selectedIndices.filter((item) => item !== index)
                  : [...selectedIndices, index];
                onChange({ questionId: question.id, selectedIndices: next });
                return;
              }
              onChange({ questionId: question.id, selectedIndex: index });
            }}
          />
        );
      })}
    </div>
  );
}
