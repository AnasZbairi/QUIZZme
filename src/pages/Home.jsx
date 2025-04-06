import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';

const Home = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('easy');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: '9', name: 'General Knowledge', description: 'Test your common knowledge' },
    { id: '10', name: 'Books', description: 'Literature and authors' },
    { id: '11', name: 'Film', description: 'Movies and cinema' },
    { id: '12', name: 'Music', description: 'Artists and albums' },
    { id: '14', name: 'Television', description: 'TV shows and series' },
    { id: '15', name: 'Video Games', description: 'Consoles and gaming' },
    { id: '17', name: 'Science & Nature', description: 'Biology and physics' },
    { id: '18', name: 'Computers', description: 'Tech and programming' },
    { id: '19', name: 'Mathematics', description: 'Numbers and equations' },
    { id: '20', name: 'Mythology', description: 'Gods and legends' },
    { id: '21', name: 'Sports', description: 'Athletes and competitions' },
    { id: '22', name: 'Geography', description: 'Countries and capitals' },
    { id: '23', name: 'History', description: 'Past events and civilizations' },
    { id: '24', name: 'Politics', description: 'Governments and systems' },
    { id: '25', name: 'Art', description: 'Paintings and artists' },
    { id: '26', name: 'Celebrities', description: 'Famous personalities' },
    { id: '27', name: 'Animals', description: 'Creatures and wildlife' },
    { id: '28', name: 'Vehicles', description: 'Cars and transportation' },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startQuiz = (categoryId) => {
    navigate(`/quiz?category=${categoryId}&difficulty=${difficulty}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Challenge</h1>
          <p className="text-lg text-gray-600">Test your knowledge across various topics</p>
        </header>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Categories
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty Level
              </label>
              <div className="flex space-x-2">
                {['easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                      difficulty === level
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredCategories.length} Available Categories
            </h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {difficulty.toUpperCase()}
            </span>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No categories found matching your search</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-blue-600 hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <div 
                  key={category.id} 
                  onClick={() => startQuiz(category.id)}
                  className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <QuizCard category={category} />
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>Powered by Open Trivia Database | Questions are randomized</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
