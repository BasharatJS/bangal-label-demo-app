import React, { createContext, useContext, useState, useEffect } from 'react'

// Create the theme context
export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference stored in localStorage
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    // Check for system preference
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark'
    }
    return 'light'
  }

  const [theme, setTheme] = useState(getInitialTheme)

  // Update theme in localStorage and apply to document when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme)

    // Apply theme to the document body
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme')
      document.documentElement.classList.remove('light-theme')
    } else {
      document.documentElement.classList.add('light-theme')
      document.documentElement.classList.remove('dark-theme')
    }
  }, [theme])

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook for easy theme access in components
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
