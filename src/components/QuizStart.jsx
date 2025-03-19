import React, { useState, useEffect } from 'react';
import { fetchCategories, fetchQuizQuestions } from '../utils/api';
import LoadingSpinner from './LoadingSpinner'; // Import the loading spinner
import ErrorModal from './ErrorModal'; // Import the error modal

const QuizStart = ({ onStart }) => {
  // State for categories, selected options, loading, and error
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [amount, setAmount] = useState(10);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch categories when the component mounts
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to fetch categories. Please try again later.'); // Handle category fetch error
      }
    };
    loadCategories();
  }, []);

  // Handle quiz start
  const handleStart = async () => {
    if (!amount || amount < 1 || amount > 50) {
      setError('Please enter a valid number of questions (1-50).'); // Validate number of questions
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const questions = await fetchQuizQuestions(amount, selectedCategory, selectedDifficulty);
      setIsLoading(false); // Stop loading
      onStart(questions); // Pass questions to the parent component
    } catch (err) {
      setIsLoading(false); // Stop loading
      setError('Failed to fetch questions. Please try again later.'); // Handle question fetch error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">QUIZZme</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Show loading spinner if loading */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Category selection */}
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

            {/* Difficulty selection */}
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

            {/* Number of questions input */}
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

            {/* Start quiz button */}
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              onClick={handleStart}
            >
              Start Quiz
            </button>
          </>
        )}
      </div>

      {/* Show error modal if there's an error */}
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default QuizStart;
