import React, { useState, useEffect } from 'react';
import { fetchCategories, fetchQuizQuestions } from '../utils/api';

const QuizStart = ({ onStart }) => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">QUIZZme</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <input
          type="text"
          placeholder="Search topics..."
          className="w-full p-2 mb-4 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredCategories.length === 0 ? (
          <p>No topics found.</p>
        ) : (
          <select
            className="w-full p-2 mb-4 border rounded-md"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Any Category</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
        {/* Add other inputs for difficulty and number of questions */}
      </div>
    </div>
  );
};

export default QuizStart;
