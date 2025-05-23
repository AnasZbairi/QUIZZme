import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Quiz = ({ topicId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10); // Timer state

  // Memoize fetchQuestions to avoid unnecessary recreations
  const fetchQuestions = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${topicId}&type=multiple`
      );
      const questionsWithSortedAnswers = response.data.results.map((question) => ({
        ...question,
        sortedAnswers: [...question.incorrect_answers, question.correct_answer].sort(
          () => Math.random() - 0.5
        ),
      }));
      setQuestions(questionsWithSortedAnswers);
      setLoading(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load questions. Please try again."); // Set the error message
      setLoading(false);
    }
  }, [topicId]); // Add 'topicId' as a dependency

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]); // Add 'fetchQuestions' to the dependency array

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); // Cleanup the timer
    } else {
      // Move to the next question when time runs out
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(10); // Reset timer for the next question
    }
  }, [timeLeft, currentQuestionIndex]);

  const handleAnswerSelect = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimeLeft(10); // Reset timer when user selects an answer
  };

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchQuestions}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-4"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">Quiz Finished!</h2>
        <p className="text-gray-700">Your score: {score} / {questions.length}</p>
        <button
          onClick={() => {
            setCurrentQuestionIndex(0);
            setTimeLeft(10); // Reset the timer
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-4"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800">Quiz Questions</h2>
      <div className="my-4 p-4 bg-gray-50 rounded-lg">
        <p className="font-medium text-gray-800">
          Question {currentQuestionIndex + 1}: {currentQuestion.question}
        </p>
        <p className="text-sm text-gray-600">Time left: {timeLeft} seconds</p>
        <ul className="mt-2 space-y-2">
          {currentQuestion.sortedAnswers.map((answer, i) => (
            <li
              key={i}
              onClick={() => handleAnswerSelect(answer)}
              className="bg-white p-2 rounded-lg shadow-sm cursor-pointer hover:bg-blue-100 transition"
            >
              {answer}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-gray-700">
        Score: {score} / {questions.length}
      </p>
    </div>
  );
};

export default Quiz;
