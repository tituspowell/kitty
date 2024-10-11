import { useTheme } from '../contexts/ThemeContext';
import { SunIconWithClass, MoonIconWithClass } from '../icons';
import { theme } from '../styles/theme';

export function ThemeSwitch() {
  const { isDarkMode, toggleTheme } = useTheme();
  const sharedStyle = `h-5 w-5 ${theme.icon} font-semibold transition duration-300`;

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full ml-2'
      aria-label='Toggle theme'
    >
      {isDarkMode ? (
        <SunIconWithClass className={sharedStyle} />
      ) : (
        <MoonIconWithClass className={sharedStyle} />
      )}
    </button>
  );
}
