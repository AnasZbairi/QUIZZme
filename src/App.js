import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Topics from './components/Topics';
import Quiz from './components/Quiz';
import QuizHistory from './components/QuizHistory';
import Auth from './components/Auth';
import CreateQuiz from './components/CreateQuiz';
import Header from './components/Header';
import NotFound from './components/NotFound';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QuizProvider>
          <Router>
            <AppContent />
          </Router>
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Header />
        <Routes>
          <Route path="/" element={<Topics />} />
          <Route path="/quiz/:topicId" element={<Quiz />} />
          <Route
            path="/history"
            element={user ? <QuizHistory /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/create-quiz"
            element={user ? <CreateQuiz /> : <Navigate to="/auth" />}
          />
          <Route path="/profile" element={<UserProfile />} /> {/* Add UserProfile route */}
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
