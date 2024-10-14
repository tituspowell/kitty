// Global types across the app

// Actually this is currently just used by the ThemeSwitch component in the Navbar, but
// we may theoretically need to access 'isDarkMode' elsewhere in the future, so it feels
// better to have it available anywhere that needs it

export interface Theme {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
