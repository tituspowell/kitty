// These are Tailwind class combos encompassing both a light mode and a dark mode variant,
// so as to avoid lots of repetition in the styling of components. 'primary' is used rather
// than the specific colour theme used (Amber in this case) just in case I wanted to change
// it easily. They are defined in tailwind.config.ts

export const theme = {
  text: {
    highContrast: 'text-primary-950 dark:text-primary-50',
    lowContrast: 'text-primary-700 dark:text-primary-500',
    cardSecondary: 'text-primary-700 dark:text-primary-50',
  },
  bg: {
    highContrast: 'bg-primary-50 dark:bg-primary-950',
    lowContrast: 'bg-primary-100 dark:bg-primary-900',
    arrow:
      'bg-primary-50 dark:bg-primary-100 hover:bg-primary-500 dark:hover:bg-primary-500',
  },
  card: 'text-primary-950 dark:text-primary-50 bg-primary-50 dark:bg-primary-975',
  shadow:
    'shadow-xl dark:shadow-[0_20px_25px_-5px_rgba(255,255,255,0.1),_0_8px_10px_-6px_rgba(255,255,255,0.1)]',
  link: {
    currentPageSoInactiveLink: 'text-primary-950 dark:text-primary-600',
    activeLink:
      'text-primary-900 hover:text-primary-600 dark:text-primary-100 dark:hover:text-white',
  },
  border: 'border-primary-950 dark:border-primary-600',
  icon: 'text-primary-700 hover:text-primary-500 dark:text-primary-100 dark:hover:text-white',
  strikethrough: 'decoration-primary-700 dark:decoration-primary-500',
  task: 'text-primary-950 hover:text-primary-700 bg-primary-50 dark:bg-primary-100',
  button: {
    active:
      'bg-primary-900 hover:bg-primary-500 dark:bg-primary-850 dark:hover:bg-primary-500 text-primary-50',
    disabled: 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed',
    arrow:
      'text-amber-900 bg-primary-50 dark:bg-primary-100 hover:bg-primary-500 dark:hover:bg-primary-500',
    arrowDisabled: 'text-gray-400 bg-primary-50 dark:bg-primary-100',
  },
} as const;
