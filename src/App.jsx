import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';
import ScoreSummary from './components/ScoreSummary';
import QuizHistory from './components/QuizHistory';
import CreateQuiz from './components/CreateQuiz';

const App = () => {
  // State for user authentication
  const [user, setUser] = useState(null);

  // State for quiz flow
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  // State for quiz history
  const [quizHistory, setQuizHistory] = useState([]);

  // State for custom quiz creation
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);

  // Check if the user is already logged in
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setUser(username);
    }
  }, []);

  // Handle user login
  const handleLogin = (username) => {
    setUser(username);
  };

  // Handle quiz start
  const handleStart = (questions) => {
    setQuizQuestions(questions);
    setQuizStarted(true);
  };

  // Handle quiz end
  const handleQuizEnd = () => {
    const history = JSON.parse(localStorage.getItem('quizHistory') || []);
    const newHistory = [
      ...history,
      {
        username: user,
        topic: quizQuestions[0].category,
        score,
        total: quizQuestions.length,
      },
    ];
    localStorage.setItem('quizHistory', JSON.stringify(newHistory));
    setQuizHistory(newHistory);
    setQuizStarted(false);
  };

  // Handle answer selection
  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleQuizEnd();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {/* Dark mode toggle */}
      <button
        className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-md"
        onClick={() => document.documentElement.classList.toggle('dark')}
      >
        Toggle Dark Mode
      </button>

      {/* Main app flow */}
      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : showCreateQuiz ? (
        <CreateQuiz onSave={() => setShowCreateQuiz(false)} />
      ) : !quizStarted && quizQuestions.length === 0 ? (
        <div>
          <QuizStart onStart={handleStart} />
          <button
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            onClick={() => setShowCreateQuiz(true)}
          >
            Create Quiz
          </button>
        </div>
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
        <div>
          <ScoreSummary
            score={score}
            totalQuestions={quizQuestions.length}
            onRestart={() => {
              setQuizQuestions([]);
              setCurrentQuestionIndex(0);
              setScore(0);
            }}
          />
          <QuizHistory history={quizHistory.filter((quiz) => quiz.username === user)} />
        </div>
      )}
    </div>
  );
};

export default App;
