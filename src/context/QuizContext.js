import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizHistory, setQuizHistory] = useState([]);

  const addQuizResult = (topic, score, total) => {
    setQuizHistory((prev) => [
      ...prev,
      { topic, score, total, date: new Date().toLocaleDateString() },
    ]);
  };

  return (
    <QuizContext.Provider value={{ quizHistory, addQuizResult }}>
      {children}
    </QuizContext.Provider>
  );
};
