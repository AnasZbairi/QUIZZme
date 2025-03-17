import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizHistory from "./components/QuizHistory";
import { QuizProvider } from "./context/QuizContext";

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/history" element={<QuizHistory />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
