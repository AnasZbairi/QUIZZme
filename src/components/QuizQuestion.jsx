import { useState } from 'react';

const QuizQuestion = ({ question, currentQuestionNumber, totalQuestions, handleAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

  const handleSelectAnswer = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      setTimeout(() => {
        handleAnswer(answer === question.correct_answer);
        setSelectedAnswer(null);
        setIsAnswered(false);
      }, 1000);
    }
  };

  const getAnswerClass = (answer) => {
    if (!isAnswered) return '';
    if (answer === question.correct_answer) return 'bg-green-500 text-white';
    if (answer === selectedAnswer && answer !== question.correct_answer) return 'bg-red-500 text-white';
    return 'opacity-70';
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4 text-sm text-gray-600">
        <span>Question {currentQuestionNumber} of {totalQuestions}</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {question.category}
        </span>
      </div>

      <h2 className="mb-6 text-xl font-semibold text-gray-800" dangerouslySetInnerHTML={{ __html: question.question }} />

      <div className="space-y-3">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(answer)}
            className={`w-full p-3 text-left border rounded-md transition-colors ${getAnswerClass(answer)} ${
              !isAnswered ? 'hover:bg-gray-100' : ''
            }`}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>

      {isAnswered && (
        <div className="mt-4 text-sm text-gray-600">
          {selectedAnswer === question.correct_answer ? 'Correct!' : 'Incorrect!'}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
