import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-500'} text-white p-4 mb-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          QUIZZme
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/history" className="hover:underline">
                    History
                  </Link>
                </li>
                <li>
                  <Link to="/create-quiz" className="hover:underline">
                    Create Quiz
                  </Link>
                </li>
              </>
            )}
            <li>
              {user ? (
                <button onClick={logout} className="hover:underline">
                  Logout
                </button>
              ) : (
                <Link to="/auth" className="hover:underline">
                  Login
                </Link>
              )}
            </li>
            <li>
              <button onClick={toggleTheme} className="hover:underline">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
