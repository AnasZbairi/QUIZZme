import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Topics = ({ onSelectTopic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const topics = [
    { id: 9, name: 'General Knowledge' },
    { id: 17, name: 'Science & Nature' },
    { id: 23, name: 'History' },
    { id: 22, name: 'Geography' },
  ];

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTopicClick = (topicId) => {
    if (onSelectTopic) {
      onSelectTopic(topicId); // Call the onSelectTopic prop if it exists
    }
    navigate(`/quiz/${topicId}`); // Navigate to the quiz route
  };

  return (
    <div className="space-y-4">
      <SearchBar onSearch={setSearchQuery} />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Choose a Topic
      </h2>
      {filteredTopics.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No topics found.</p>
      ) : (
        filteredTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicClick(topic.id)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            {topic.name}
          </button>
        ))
      )}
    </div>
  );
};

export default Topics;
