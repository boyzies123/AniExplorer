import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(
      localStorage.getItem('darkMode') === 'true'
    );
    useEffect (()=>{
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);
    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
          {children}
        </ThemeContext.Provider>
    );
}