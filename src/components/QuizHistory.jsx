export default function QuizHistory({ quizHistory }) {
  if (quizHistory.length === 0) return null

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Quiz History</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quizHistory.map((quiz, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{quiz.category}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 capitalize">{quiz.difficulty}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    (quiz.score / quiz.total) >= 0.7 ? 'bg-green-100 text-green-800' :
                    (quiz.score / quiz.total) >= 0.5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {quiz.score}/{quiz.total}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                  {new Date(quiz.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
