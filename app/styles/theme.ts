export const theme = {
  text: {
    highContrast: 'text-primary-950 dark:text-primary-50',
    lowContrast: 'text-primary-700 dark:text-primary-500',
  },
  bg: {
    highContrast: 'text-primary-50 dark:text-primary-950',
    // lowContrast: 'text-primary-500 dark:text-primary-700',
  },
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
    primary:
      'bg-primary-900 hover:bg-primary-500 dark:bg-primary-850 dark:hover:bg-primary-500 text-primary-50',
    secondary:
      'bg-primary-950 hover:bg-primary-500 dark:bg-primary-900 dark:hover:bg-primary-500 text-primary-50',
    arrow:
      'text-amber-900 bg-primary-50 dark:bg-primary-100 hover:bg-primary-500 dark:hover:bg-primary-500',
    arrowDisabled: 'text-gray-400 bg-primary-50 dark:bg-primary-100',
  },
} as const;
