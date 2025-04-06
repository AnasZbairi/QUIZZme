import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCategory from '../components/QuizCategory';

const Home = () => {
  const [category, setCategory] = useState('9');
  const [difficulty, setDifficulty] = useState('easy');
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz?category=${category}&difficulty=${difficulty}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quiz App</h1>
        <QuizCategory 
          category={category} 
          setCategory={setCategory} 
          difficulty={difficulty} 
          setDifficulty={setDifficulty} 
        />
        <button
          onClick={startQuiz}
          className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
