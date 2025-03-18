import React, { createContext, useState, useContext } from 'react';

// Create the context
const ThemeContext = createContext();

// Create the provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export the context itself
export const ThemeContext = ThemeContext; // Explicitly export ThemeContext

// Create and export a custom hook for easier access
export const useTheme = () => useContext(ThemeContext);
