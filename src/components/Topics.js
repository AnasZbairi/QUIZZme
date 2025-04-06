import React from "react";

const Topics = ({ onSelectTopic }) => {
  const topics = [
    { id: 9, name: "General Knowledge" },
    { id: 17, name: "Science & Nature" },
    { id: 23, name: "History" },
    { id: 22, name: "Geography" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Choose a Topic</h2>
      {topics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onSelectTopic(topic.id)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          {topic.name}
        </button>
      ))}
    </div>
  );
};

export default Topics;
