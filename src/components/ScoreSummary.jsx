import React from 'react';

const { FacebookShareButton, TwitterShareButton } = window.ReactShare;

const ScoreSummary = ({ score, totalQuestions, onRestart }) => {
  const shareUrl = window.location.href;
  const title = `I scored ${score}/${totalQuestions} on QUIZZme!`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-lg mb-4">
        You scored {score} out of {totalQuestions}.
      </p>
      <div className="flex justify-center space-x-4 mb-4">
        <FacebookShareButton url={shareUrl} quote={title}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Share on Facebook
          </button>
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500">
            Share on Twitter
          </button>
        </TwitterShareButton>
      </div>
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
