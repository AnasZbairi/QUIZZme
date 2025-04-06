import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';

const Home = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('easy');

  const categories = [
    { id: '9', name: 'General Knowledge' },
    { id: '10', name: 'Books' },
    { id: '11', name: 'Film' },
    { id: '12', name: 'Music' },
    { id: '14', name: 'Television' },
    { id: '15', name: 'Video Games' },
    { id: '17', name: 'Science & Nature' },
    { id: '18', name: 'Computers' },
    { id: '19', name: 'Mathematics' },
    { id: '20', name: 'Mythology' },
    { id: '21', name: 'Sports' },
    { id: '22', name: 'Geography' },
    { id: '23', name: 'History' },
    { id: '24', name: 'Politics' },
    { id: '25', name: 'Art' },
    { id: '26', name: 'Celebrities' },
    { id: '27', name: 'Animals' },
    { id: '28', name: 'Vehicles' },
  ];

  const startQuiz = (categoryId) => {
    navigate(`/quiz?category=${categoryId}&difficulty=${difficulty}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Quiz App</h1>
        
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Select Difficulty</h2>
          <div className="flex space-x-4">
            {['easy', 'medium', 'hard'].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2 rounded-md capitalize ${
                  difficulty === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Current difficulty: <span className="font-medium capitalize">{difficulty}</span>
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">Choose a Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id} 
              onClick={() => startQuiz(category.id)}
              className="cursor-pointer"
            >
              <QuizCard category={category} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>Questions sourced from the Open Trivia Database</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
