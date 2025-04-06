import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizQuestion from '../components/QuizQuestion';
import QuizResult from '../components/QuizResult';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        const data = await response.json();
        if (data.response_code === 0) {
          setQuestions(data.results);
        } else {
          setError('Failed to fetch questions. Please try again.');
        }
      } catch (err) {
        setError('An error occurred while fetching questions.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [category, difficulty]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const restartQuiz = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-red-600 bg-red-100 rounded-md">{error}</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-red-600 bg-red-100 rounded-md">No questions available. Please try a different category or difficulty.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {currentQuestionIndex < questions.length ? (
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          currentQuestionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          handleAnswer={handleAnswer}
        />
      ) : (
        <QuizResult 
          score={score} 
          totalQuestions={questions.length} 
          restartQuiz={restartQuiz} 
        />
      )}
    </div>
  );
};

export default Quiz;
