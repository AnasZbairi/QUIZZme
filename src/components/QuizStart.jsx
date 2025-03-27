export default function QuizStart({ categories, quizSettings, setQuizSettings, startQuiz }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Quiz Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={quizSettings.category}
            onChange={(e) => setQuizSettings({...quizSettings, category: e.target.value})}
          >
            <option value="">Any Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={quizSettings.difficulty}
            onChange={(e) => setQuizSettings({...quizSettings, difficulty: e.target.value})}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
          <input
            type="number"
            min="1"
            max="50"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={quizSettings.amount}
            onChange={(e) => setQuizSettings({...quizSettings, amount: e.target.value})}
          />
        </div>

        <button
          onClick={startQuiz}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors mt-4"
        >
          Start Quiz
        </button>
      </div>
    </div>
  )
}
