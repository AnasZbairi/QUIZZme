import React, { useState } from 'react';

const CreateQuiz = ({ onSave }) => {
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAddQuestion = () => {
    if (!question || options.some((option) => !option) || !correctAnswer) {
      alert('Please fill out all fields.');
      return;
    }

    const newQuestion = {
      question,
      options,
      correctAnswer,
    };

    setQuestions([...questions, newQuestion]);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  const handleSaveQuiz = () => {
    if (!quizName || questions.length === 0) {
      alert('Please add a quiz name and at least one question.');
      return;
    }

    const quizzes = JSON.parse(localStorage.getItem('quizzes') || []);
    quizzes.push({ quizName, questions });
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    alert('Quiz saved successfully!');
    onSave();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4">Create Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Name"
        className="w-full p-2 mb-4 border rounded-md"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Question"
        className="w-full p-2 mb-4 border rounded-md"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          className="w-full p-2 mb-2 border rounded-md"
          value={option}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }}
        />
      ))}
      <input
        type="text"
        placeholder="Correct Answer"
        className="w-full p-2 mb-4 border rounded-md"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-4"
        onClick={handleAddQuestion}
      >
        Add Question
      </button>
      <button
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        onClick={handleSaveQuiz}
      >
        Save Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;
