import React from 'react';

const QuestionCard = ({ question, options, onAnswer }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            className="w-full bg-gray-100 p-2 rounded-md hover:bg-gray-200"
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
