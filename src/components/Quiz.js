import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { QuizContext } from "../context/QuizContext";
import { AuthContext } from "../context/AuthContext";

const Quiz = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { addQuizResult } = useContext(QuizContext);
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (!user) {
      navigate("/auth"); // Redirect to login if user is not logged in
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${topicId}&type=multiple`
        );
        setQuestions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [topicId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(10);
    }
  }, [timeLeft, currentQuestionIndex]);

  const handleAnswerSelect = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }
    setCurrentQuestionIndex((prev) => prev + 1);
    setTimeLeft(10);
  };

  useEffect(() => {
    if (currentQuestionIndex >= questions.length && questions.length > 0) {
      addQuizResult(`Topic ${topicId}`, score, questions.length);
      navigate("/history");
    }
  }, [currentQuestionIndex, questions, score, topicId, addQuizResult, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800">Quiz Questions</h2>
      <div className="my-4 p-4 bg-gray-50 rounded-lg">
        <p className="font-medium text-gray-800">
          Question {currentQuestionIndex + 1}: {currentQuestion.question}
        </p>
        <p className="text-sm text-gray-600">Time left: {timeLeft} seconds</p>
        <ul className="mt-2 space-y-2">
          {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
            .sort(() => Math.random() - 0.5)
            .map((answer, i) => (
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
