import React, { useState } from "react";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([]); // This variable is now used
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleAddQuestion = () => {
    // Use the `questions` variable here
    setQuestions((prev) => [
      ...prev,
      { question, answers, correctAnswer },
    ]);
    setQuestion("");
    setAnswers(["", "", "", ""]);
    setCorrectAnswer(0);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded-lg mb-2"
      />
      {answers.map((answer, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Answer ${index + 1}`}
          value={answer}
          onChange={(e) => {
            const newAnswers = [...answers];
            newAnswers[index] = e.target.value;
            setAnswers(newAnswers);
          }}
          className="w-full p-2 border rounded-lg mb-2"
        />
      ))}
      <select
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(Number(e.target.value))}
        className="w-full p-2 border rounded-lg mb-4"
      >
        <option value={0}>Answer 1</option>
        <option value={1}>Answer 2</option>
        <option value={2}>Answer 3</option>
        <option value={3}>Answer 4</option>
      </select>
      <button
        onClick={handleAddQuestion}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Add Question
      </button>

      {/* Display the list of questions */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Added Questions</h3>
        <ul>
          {questions.map((q, index) => (
            <li key={index} className="mb-2">
              <strong>Question:</strong> {q.question}
              <br />
              <strong>Correct Answer:</strong> {q.answers[q.correctAnswer]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateQuiz;
