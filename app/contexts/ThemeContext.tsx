// Context API for the light/dark mode theme, wrapping the entire website. It is actually
// only used in the ThemeSwitch component at the moment, so all this state and functionality
// could be moved there but having 'isDarkMode' available anywhere feels more future proofed.

'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Theme } from '../types';

const ThemeContext = createContext<Theme | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with a default theme that matches what the server would render
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize theme on the client side
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const initialDarkMode =
      storedTheme === 'dark' || (!storedTheme && prefersDark);

    setIsDarkMode(initialDarkMode);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Only update DOM after initialization
    if (!isInitialized) return;

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode, isInitialized]);

  // Give relevant components a way of toggling the theme.
  // Wrapped in useCallback for optimisation purposes
  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // Memoize the context value. This prevents unnecessary re-renders of all
  // consuming components when the context value hasn't actually changed. The
  // The dependency array includes the value and the function in the context
  const contextValue = useMemo(
    () => ({
      isDarkMode,
      toggleTheme,
    }),
    [isDarkMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
