import { useEffect, useState } from 'react';

const QuizCard = ({ category, stats, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const categoryIcons = {
    '9': '🧠', '10': '📚', '11': '🎬', '12': '🎵',
    '14': '📺', '15': '🎮', '17': '🔬', '18': '💻',
    '19': '🧮', '20': '🏛️', '21': '⚽', '22': '🌍',
    '23': '⏳', '24': '🏛️', '25': '🎨', '26': '🌟',
    '27': '🐾', '28': '🚗'
  };

  const attempts = stats?.attempts || 0;
  const lastAttempt = stats?.lastAttempt 
    ? new Date(stats.lastAttempt).toLocaleDateString() 
    : 'Never attempted';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`relative h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-md' : ''
      } ${
        isPressed ? 'scale-95' : 'scale-100'
      }`}
    >
      <div className="p-5 pb-3">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg transition-colors ${
            attempts > 0 
              ? 'bg-green-100 text-green-600' 
              : 'bg-blue-100 text-blue-600'
          }`}>
            <span className="text-4xl">
              {categoryIcons[category.id] || '❓'}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
            <p className="text-gray-600 mt-1 text-sm">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
            {attempts} attempt{attempts !== 1 ? 's' : ''}
          </span>
          <span className="text-xs text-gray-500">Last: {lastAttempt}</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500" 
              style={{ width: `${Math.min(100, category.popularity)}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">{category.popularity}%</span>
        </div>
      </div>

      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-5 pointer-events-none"></div>
      )}
    </div>
  );
};

export default QuizCard;
