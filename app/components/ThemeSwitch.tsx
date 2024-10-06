import { useTheme } from '../contexts/ThemeContext';
import { SunIconWithClass, MoonIconWithClass } from '../icons';

export function ThemeSwitch() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full transition-colors duration-200
                hover:bg-gray-200 dark:hover:bg-gray-700'
      aria-label='Toggle theme'
    >
      {isDarkMode ? (
        <SunIconWithClass className='h-5 w-5 text-gray-200' />
      ) : (
        <MoonIconWithClass className='h-5 w-5 text-gray-800' />
      )}
    </button>
  );
}
