import { useState } from 'react'

export default function QuestionCard({ question, currentQuestion, totalQuestions, handleAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  
  const allAnswers = [...question.incorrect_answers, question.correct_answer]
  // Shuffle answers
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5)

  const handleSubmit = () => {
    if (selectedAnswer) {
      handleAnswer(selectedAnswer)
      setSelectedAnswer(null)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4 text-sm text-gray-500">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>
      
      <h3 className="text-xl font-medium mb-6 text-gray-800" 
          dangerouslySetInnerHTML={{ __html: question.question }} />
      
      <div className="space-y-3 mb-6">
        {shuffledAnswers.map((answer, index) => (
          <div 
            key={index}
            className={`p-3 border rounded-md cursor-pointer transition-colors ${
              selectedAnswer === answer 
                ? 'bg-indigo-100 border-indigo-500' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedAnswer(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer}
        className={`w-full py-2 px-4 rounded-md transition-colors ${
          selectedAnswer
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
      </button>
    </div>
  )
}
