// Global types across the app

// Actually this is currently just used by the ThemeSwitch component in the Navbar, but
// we may need to access it elsewhere
export interface Theme {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
