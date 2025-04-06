const QuizResult = ({ score, totalQuestions, restartQuiz }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  let message = '';
  let emoji = '';

  if (percentage >= 80) {
    message = 'Excellent!';
    emoji = '🎉';
  } else if (percentage >= 60) {
    message = 'Good job!';
    emoji = '👍';
  } else if (percentage >= 40) {
    message = 'Not bad!';
    emoji = '😊';
  } else {
    message = 'Keep practicing!';
    emoji = '📚';
  }

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
      <div className="text-5xl my-4">{emoji}</div>
      <p className="text-xl font-semibold text-gray-700 mb-2">{message}</p>
      <p className="text-lg text-gray-600 mb-6">
        You scored {score} out of {totalQuestions} ({percentage}%)
      </p>
      <button
        onClick={restartQuiz}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Start New Quiz
      </button>
    </div>
  );
};

export default QuizResult;
