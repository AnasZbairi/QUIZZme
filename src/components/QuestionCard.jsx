import React from 'react';

const QuestionCard = ({ question, options, onAnswer, selectedAnswer, isCorrect }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-2 rounded-md ${
              selectedAnswer === option
                ? isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => onAnswer(option)}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
