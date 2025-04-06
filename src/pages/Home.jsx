import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(() => {
    return localStorage.getItem('quizDifficulty') || 'easy';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryStats, setCategoryStats] = useState({});

  // Enhanced categories with popularity scores
  const categories = [
    { id: '9', name: 'General Knowledge', description: 'Common facts everyone should know', popularity: 95 },
    { id: '10', name: 'Books', description: 'Literature and famous authors', popularity: 75 },
    { id: '11', name: 'Film', description: 'Movies and cinema history', popularity: 90 },
    { id: '12', name: 'Music', description: 'Artists, albums, and genres', popularity: 85 },
    { id: '14', name: 'Television', description: 'TV shows and series', popularity: 80 },
    { id: '15', name: 'Video Games', description: 'Consoles and gaming culture', popularity: 88 },
    { id: '17', name: 'Science & Nature', description: 'Biology, physics, and chemistry', popularity: 82 },
    { id: '18', name: 'Computers', description: 'Tech and programming', popularity: 78 },
    { id: '19', name: 'Mathematics', description: 'Numbers and equations', popularity: 70 },
    { id: '20', name: 'Mythology', description: 'Gods and ancient legends', popularity: 65 },
    { id: '21', name: 'Sports', description: 'Athletes and competitions', popularity: 83 },
    { id: '22', name: 'Geography', description: 'Countries and capitals', popularity: 79 },
    { id: '23', name: 'History', description: 'Historical events', popularity: 77 },
    { id: '24', name: 'Politics', description: 'Governments and systems', popularity: 68 },
    { id: '25', name: 'Art', description: 'Paintings and artists', popularity: 72 },
    { id: '26', name: 'Celebrities', description: 'Famous personalities', popularity: 74 },
    { id: '27', name: 'Animals', description: 'Creatures and wildlife', popularity: 81 },
    { id: '28', name: 'Vehicles', description: 'Cars and transportation', popularity: 66 },
  ];

  // Load category stats from localStorage
  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem('categoryStats')) || {};
    setCategoryStats(stats);
  }, []);

  const filteredCategories = categories
    .filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by popularity (from API) and then by user attempts
      const aAttempts = categoryStats[a.id]?.attempts || 0;
      const bAttempts = categoryStats[b.id]?.attempts || 0;
      return (b.popularity + bAttempts) - (a.popularity + aAttempts);
    });

  const startQuiz = (categoryId) => {
    // Update stats
    const newStats = {
      ...categoryStats,
      [categoryId]: {
        attempts: (categoryStats[categoryId]?.attempts || 0) + 1,
        lastAttempt: new Date().toISOString()
      }
    };
    localStorage.setItem('categoryStats', JSON.stringify(newStats));
    localStorage.setItem('quizDifficulty', difficulty);
    
    navigate(`/quiz?category=${categoryId}&difficulty=${difficulty}`);
  };

  if (isLoading) return <LoadingSpinner fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={() => setError(null)} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Knowledge Challenge
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your expertise across {categories.length} categories. Your last difficulty: 
            <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize">
              {difficulty}
            </span>
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search categories..."
                  className="w-full px-5 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 pl-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            <div className="w-full lg:w-auto">
              <fieldset className="border border-gray-300 rounded-xl p-3">
                <legend className="px-2 text-sm text-gray-500">Difficulty</legend>
                <div className="flex flex-wrap gap-2">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-2 rounded-lg capitalize transition-all ${
                        difficulty === level
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {filteredCategories.length} Available Categories
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                Sorted by: <span className="font-medium">Popularity</span>
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {difficulty.toUpperCase()}
              </span>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No categories found</h3>
              <p className="text-gray-500 mb-4">Try different search terms</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Show All Categories
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <QuizCard 
                  key={category.id}
                  category={category}
                  stats={categoryStats[category.id]}
                  onClick={() => startQuiz(category.id)}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="text-center text-gray-500 text-sm mt-12 pb-10">
          <p className="mb-2">Data provided by the Open Trivia Database API</p>
          <div className="flex justify-center gap-4">
            <span>v1.0.0</span>
            <span>•</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
