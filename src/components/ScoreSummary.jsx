export default function ScoreSummary({ score, total, userAnswers, restartQuiz }) {
  const percentage = Math.round((score / total) * 100)
  
  let resultClass = 'bg-red-100 text-red-800'
  if (percentage >= 70) resultClass = 'bg-green-100 text-green-800'
  else if (percentage >= 50) resultClass = 'bg-yellow-100 text-yellow-800'

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Quiz Results</h2>
      
      <div className={`${resultClass} p-4 rounded-lg text-center mb-6`}>
        <p className="text-lg font-medium">You scored {score} out of {total}</p>
        <p className="text-2xl font-bold mt-2">{percentage}%</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Question Review</h3>
        <div className="space-y-4">
          {userAnswers.map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <p className="font-medium mb-2" dangerouslySetInnerHTML={{ __html: `Q${index + 1}: ${item.question}` }} />
              <p className={`text-sm ${item.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                Your answer: <span dangerouslySetInnerHTML={{ __html: item.userAnswer }} />
              </p>
              {!item.isCorrect && (
                <p className="text-sm text-green-600">
                  Correct answer: <span dangerouslySetInnerHTML={{ __html: item.correctAnswer }} />
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={restartQuiz}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Start New Quiz
      </button>
    </div>
  )
}
