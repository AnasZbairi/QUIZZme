import { Link } from 'react-router-dom';

const QuizCard = ({ category }) => {
  // Map category IDs to icons or images
  const getCategoryIcon = (id) => {
    const icons = {
      '9': '🎓',   // General Knowledge
      '10': '📚',  // Books
      '11': '🎬',  // Film
      '12': '🎵',  // Music
      '14': '📺',  // Television
      '15': '🎮',  // Video Games
      '17': '🔬',  // Science
      '18': '💻',  // Computers
      '19': '🧮',  // Mathematics
      '20': '🏛️',  // Mythology
      '21': '⚽',  // Sports
      '22': '🌍',  // Geography
      '23': '🏰',  // History
      '24': '🏛️',  // Politics
      '25': '🎨',  // Art
      '26': '🌟',  // Celebrities
      '27': '🐾',  // Animals
      '28': '🚗',  // Vehicles
    };
    return icons[id] || '❓';
  };

  return (
    <Link 
      to={`/quiz?category=${category.id}`}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center space-x-4">
        <span className="text-4xl">{getCategoryIcon(category.id)}</span>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
          <p className="text-gray-600">Test your knowledge</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>10 questions</span>
        <span>Multiple choice</span>
      </div>
    </Link>
  );
};

export default QuizCard;QuizCard.jsx
