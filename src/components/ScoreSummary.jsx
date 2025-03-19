import React from 'react';

const ScoreSummary = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-lg mb-4">
        You scored {score} out of {totalQuestions}.
      </p>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        onClick={onRestart}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default ScoreSummary;
