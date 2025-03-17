import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

const QuizHistory = () => {
  const { quizHistory } = useContext(QuizContext);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      {quizHistory.length === 0 ? (
        <p>No quizzes taken yet.</p>
      ) : (
        <ul>
          {quizHistory.map((quiz, index) => (
            <li key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p><strong>Topic:</strong> {quiz.topic}</p>
              <p><strong>Score:</strong> {quiz.score} / {quiz.total}</p>
              <p><strong>Date:</strong> {quiz.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizHistory;
