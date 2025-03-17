import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

const QuizHistory = () => {
  const { quizHistory } = useContext(QuizContext);

  const shareScore = (score, total) => {
    const message = `I scored ${score}/${total} on QUIZZme! Try it out: [Insert App URL]`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

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
              <button
                onClick={() => shareScore(quiz.score, quiz.total)}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                Share Score
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizHistory;
