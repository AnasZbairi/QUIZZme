import React from "react";

const Topics = ({ onSelectTopic }) => {
  // List of available topics with their IDs and names
  const topics = [
    { id: 9, name: "General Knowledge" },
    { id: 17, name: "Science & Nature" },
    { id: 23, name: "History" },
    { id: 22, name: "Geography" },
  ];

  return (
    <div className="space-y-4">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-800">Choose a Topic</h2>

      {/* Buttons for each topic */}
      {topics.map((topic) => (
        <button
          key={topic.id} // Unique key for React lists
          onClick={() => onSelectTopic(topic.id)} // Handle topic selection
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          {topic.name}
        </button>
      ))}
    </div>
  );
};

export default Topics;
