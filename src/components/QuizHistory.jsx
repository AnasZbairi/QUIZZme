import React from 'react';

const QuizHistory = ({ history }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96 mt-6">
      <h2 className="text-xl font-semibold mb-4">Quiz History</h2>
      {history.length === 0 ? (
        <p>No quiz history available.</p>
      ) : (
        <ul>
          {history.map((quiz, index) => (
            <li key={index} className="mb-2">
              <span className="font-medium">{quiz.topic}</span> - {quiz.score}/{quiz.total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizHistory;
