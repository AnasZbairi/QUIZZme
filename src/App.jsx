import { useState, useEffect } from 'react'
import axios from 'axios'
import QuizStart from './components/QuizStart'
import QuestionCard from './components/QuestionCard'
import ScoreSummary from './components/ScoreSummary'
import QuizHistory from './components/QuizHistory'

function App() {
  const [quizState, setQuizState] = useState('start') // 'start', 'quiz', 'summary'
  const [categories, setCategories] = useState([])
  const [quizSettings, setQuizSettings] = useState({
    category: '',
    difficulty: 'medium',
    amount: 10
  })
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [quizHistory, setQuizHistory] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php')
        setCategories(response.data.trivia_categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const startQuiz = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=${quizSettings.amount}&category=${quizSettings.category}&difficulty=${quizSettings.difficulty}&type=multiple`
      const response = await axios.get(url)
      setQuestions(response.data.results)
      setQuizState('quiz')
      setCurrentQuestion(0)
      setScore(0)
      setUserAnswers([])
    } catch (error) {
      console.error('Error fetching questions:', error)
      alert('Failed to fetch questions. Please try again.')
    }
  }

  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct_answer
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setUserAnswers([...userAnswers, {
      question: questions[currentQuestion].question,
      userAnswer: selectedAnswer,
      correctAnswer: questions[currentQuestion].correct_answer,
      isCorrect
    }])

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const quizResult = {
        category: categories.find(cat => cat.id === Number(quizSettings.category))?.name || 'Unknown',
        difficulty: quizSettings.difficulty,
        score,
        total: questions.length,
        date: new Date().toISOString()
      }
      setQuizHistory([...quizHistory, quizResult])
      setQuizState('summary')
    }
  }

  const restartQuiz = () => {
    setQuizState('start')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">QUIZZme</h1>
        
        {quizState === 'start' && (
          <QuizStart 
            categories={categories} 
            quizSettings={quizSettings}
            setQuizSettings={setQuizSettings}
            startQuiz={startQuiz}
          />
        )}

        {quizState === 'quiz' && questions.length > 0 && (
          <QuestionCard 
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            handleAnswer={handleAnswer}
          />
        )}

        {quizState === 'summary' && (
          <div className="space-y-8">
            <ScoreSummary 
              score={score}
              total={questions.length}
              userAnswers={userAnswers}
              restartQuiz={restartQuiz}
            />
            <QuizHistory quizHistory={quizHistory} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
