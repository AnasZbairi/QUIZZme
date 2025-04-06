import React, { useState } from "react";
import Topics from "./Topics";

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold text-blue-600">QUIZZme</h1>
      </header>
      <main className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {!selectedTopic ? (
          <Topics onSelectTopic={handleTopicSelect} />
        ) : (
          <p className="text-center text-gray-700">Quiz for Topic ID: {selectedTopic}</p>
        )}
      </main>
    </div>
  );
}

export default App;
