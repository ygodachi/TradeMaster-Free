import React, { useState } from 'react';
import { HelpCircle, AlertCircle, CheckCircle2, RotateCcw, Award, Check } from 'lucide-react';
import { QuizQuestion } from '../types';
import { QUIZ_QUESTIONS } from '../data/quiz';

export const QuizSection: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-md text-slate-100">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800/60">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            Daily Trading Quiz
          </h3>
          <p className="text-xs text-slate-400">Validate your market concepts & risk discipline</p>
        </div>
        {!quizCompleted && (
          <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
            Q: {currentIndex + 1} / {questions.length}
          </span>
        )}
      </div>

      {quizCompleted ? (
        <div className="text-center py-6 space-y-4">
          <Award className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
          <div>
            <h4 className="text-lg font-bold text-slate-100">Practice Completed!</h4>
            <p className="text-xs text-slate-400 mt-1">Great job investing time to upskill your trading accuracy.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl max-w-xs mx-auto border border-slate-800 font-mono">
            <div className="text-slate-400 text-xs">YOUR PRACTICE SCORE</div>
            <div className="text-3xl font-black text-emerald-400 mt-1">
              {score} / {questions.length}
            </div>
            <div className="text-[10px] text-slate-500 mt-1.5 uppercase tracking-wide">
              {score === questions.length
                ? '🏆 Master Risk Manager!'
                : score >= questions.length * 0.7
                ? '👍 Ready for Demo Trading!'
                : '📚 Study Strategy Pages More!'}
            </div>
          </div>

          <button
            id="btn-restart-quiz"
            onClick={handleRestart}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-2.5 px-6 rounded-xl transition inline-flex items-center gap-1.5 shadow-lg shadow-emerald-950/20"
          >
            <RotateCcw className="w-4 h-4" />
            Try Quiz Again
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Question Text */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 text-sm font-semibold text-slate-100 leading-relaxed">
            {currentQuestion.question}
          </div>

          {/* Answer Options */}
          <div className="space-y-2">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = currentQuestion.correctAnswer === idx;
              let btnClass = 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-900';

              if (isSubmitted) {
                if (isCorrect) {
                  btnClass = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300 font-medium';
                } else if (isSelected) {
                  btnClass = 'border-red-500/80 bg-red-950/40 text-red-300';
                } else {
                  btnClass = 'border-slate-800 bg-slate-950 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                btnClass = 'border-emerald-500 bg-emerald-950/20 text-emerald-400 font-semibold';
              }

              return (
                <button
                  key={idx}
                  id={`btn-quiz-option-${idx}`}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between gap-3 ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {isSubmitted && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end">
            {!isSubmitted ? (
              <button
                id="btn-quiz-submit"
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className={`text-xs font-bold py-2.5 px-6 rounded-xl transition ${
                  selectedOption !== null
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-950/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                id="btn-quiz-next"
                onClick={handleNext}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-2.5 px-6 rounded-xl transition shadow-lg shadow-emerald-950/20"
              >
                {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            )}
          </div>

          {/* Explanatory Overlay */}
          {isSubmitted && (
            <div className="bg-slate-900 border border-slate-800/80 p-3.5 rounded-xl text-xs leading-relaxed text-slate-300 animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold mb-1.5 text-slate-100">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Concept Clarified:</span>
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
