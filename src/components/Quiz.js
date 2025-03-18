import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QuizContext } from '../context/QuizContext';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Add this import for dark mode

const Quiz = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { addQuizResult } = useContext(QuizContext);
  const { user } = useContext(AuthContext);
  const { isDarkMode } = useTheme(); // Get dark mode state
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Fetch questions for the selected topic
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${topicId}&type=multiple`
        );
        setQuestions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [topicId]);

  // Timer for each question
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(10);
    }
  }, [timeLeft, currentQuestionIndex]);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }
    setCurrentQuestionIndex((prev) => prev + 1);
    setTimeLeft(10);
  };

  // Save quiz result and navigate to history when quiz
