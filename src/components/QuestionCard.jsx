import React, { useState, useEffect } from 'react';

const QuestionCard = ({ question, options, onAnswer, selectedAnswer, isCorrect }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      onAnswer(null); // Automatically skip the question if time runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onAnswer]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4" dangerouslySetInnerHTML={{ __html: question }} />
      <p className="text-sm mb-4">Time left: {timeLeft} seconds</p>
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
