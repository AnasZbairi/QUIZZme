import React, { useState } from "react";
import Topics from "./Topics";
import Quiz from "./Quiz";

function App() {
  // State to track the selected topic ID
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Function to handle topic selection
  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold text-blue-600">QUIZZme</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Conditional Rendering */}
        {!selectedTopic ? (
          // Show Topics component if no topic is selected
          <Topics onSelectTopic={handleTopicSelect} />
        ) : (
          // Show Quiz component if a topic is selected
          <Quiz topicId={selectedTopic} />
        )}
      </main>
    </div>
  );
}

export default App;
