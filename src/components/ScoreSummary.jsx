import { FacebookShareButton, TwitterShareButton, WhatsAppShareButton } from 'react-share';

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
          Share on Facebook
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          Share on Twitter
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
