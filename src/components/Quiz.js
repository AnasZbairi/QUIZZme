import React, { useEffect, useState } from "react";
import axios from "axios";

const Quiz = ({ topicId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${topicId}&type=multiple`
        );
        setQuestions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [topicId]);

  if (loading) {
    return <p className="text-center text-gray-700">Loading questions...</p>;
  }
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [score, setScore] = useState(0);
  const handleAnswerSelect = (answer) => {
  const currentQuestion = questions[currentQuestionIndex];
  if (answer === currentQuestion.correct_answer) {
    setScore(score + 1);
  }
  setCurrentQuestionIndex(currentQuestionIndex + 1);
};
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800">Quiz Questions</h2>
      {questions.map((question, index) => (
        <div key={index} className="my-4 p-4 bg-gray-50 rounded-lg">
          <p className="font-medium text-gray-800">{question.question}</p>
          <ul className="mt-2 space-y-2">
            {[...question.incorrect_answers, question.correct_answer]
              .sort(() => Math.random() - 0.5)
              .map((answer, i) => (
                <li key={i} className="bg-white p-2 rounded-lg shadow-sm">
                  {answer}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
