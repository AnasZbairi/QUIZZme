import React, { useState } from 'react';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';
import ScoreSummary from './components/ScoreSummary';
import QuizHistory from './components/QuizHistory';

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizHistory, setQuizHistory] = useState([]);

  const handleStart = (questions) => {
    setQuizQuestions(questions);
    setQuizStarted(true);
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizStarted(false);
      setQuizHistory([
        ...quizHistory,
        {
          topic: quizQuestions[0].category,
          score,
          total: quizQuestions.length,
        },
      ]);
    }
  };

  const handleRestart = () => {
    setQuizQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div>
      {!quizStarted && quizQuestions.length === 0 ? (
        <QuizStart onStart={handleStart} />
      ) : quizStarted ? (
        <QuestionCard
          question={quizQuestions[currentQuestionIndex].question}
          options={[
            ...quizQuestions[currentQuestionIndex].incorrect_answers,
            quizQuestions[currentQuestionIndex].correct_answer,
          ].sort(() => Math.random() - 0.5)}
          onAnswer={handleAnswer}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-6">
          <ScoreSummary
            score={score}
            totalQuestions={quizQuestions.length}
            onRestart={handleRestart}
          />
          <QuizHistory history={quizHistory} />
        </div>
      )}
    </div>
  );
};

export default App;
