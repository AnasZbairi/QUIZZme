import React, { useState, useEffect } from 'react';
import { fetchCategories, fetchQuizQuestions } from '../utils/api';

const QuizStart = ({ onStart }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [amount, setAmount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleStart = async () => {
    if (!amount || amount < 1 || amount > 50) {
      alert('Please enter a valid number of questions (1-50).');
      return;
    }

    setIsLoading(true);
    try {
      const questions = await fetchQuizQuestions(amount, selectedCategory, selectedDifficulty);
      setIsLoading(false);
      onStart(questions);
    } catch (err) {
      setIsLoading(false);
      alert('Failed to fetch questions. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">QUIZZme</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <label className="block mb-4">
          <span className="text-gray-700">Category:</span>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Any Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Difficulty:</span>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Number of Questions:</span>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            max="50"
          />
        </label>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          onClick={handleStart}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
};

export default QuizStart;
