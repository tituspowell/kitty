export const theme = {
  text: {
    highContrast: 'text-primary-950 dark:text-primary-50',
    // mediumContrast: 'text-primary-900 dark:text-primary-100',
    lowContrast: 'text-primary-700 dark:text-primary-500',
    // inverse: 'text-primary-50 dark:text-primary-950',
  },
  link: {
    currentPageSoInactiveLink: 'text-primary-950 dark:text-primary-600',
    activeLink:
      'text-primary-900 hover:text-primary-600 dark:text-primary-100 dark:hover:text-white',
  },
  border: 'border-primary-950 dark:border-primary-600',
  icon: 'text-primary-700 hover:text-primary-500 dark:text-primary-100 dark:hover:text-white',
  decoration: {
    // highContrast: 'decoration-primary-950 dark:decoration-primary-50',
    // mediumContrast: 'decoration-primary-900 dark:decoration-primary-100',
    lowContrast: 'decoration-primary-700 dark:decoration-primary-500',
    // inverse: 'decoration-primary-50 dark:decoration-primary-950',
  },
  task: 'text-primary-950 bg-primary-50 dark:bg-primary-100',
  button: {
    primary:
      'bg-primary-900 hover:bg-primary-850 dark:bg-primary-850 dark:hover:bg-primary-800 text-primary-50',
    secondary:
      'bg-primary-950 hover:bg-primary-900 dark:bg-primary-900 dark:hover:bg-primary-850 text-primary-50',
  },
} as const;
