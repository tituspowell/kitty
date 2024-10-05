import { useCallback, useEffect, useState } from 'react';

// This is a custom hook for localStorage management, which is significantly more
// complicated in Next.js than it was in vanilla React, due to server/client mismatches -
// the initial server-side rendering doesn't have access to localStorage so when the
// client-side hydration happens, there's a mismatch. The solution is to check is to have
// an initial 'isLoading' state during SSR and only render the list of tasks on the client
// once it has access to localStorage. We briefly show a loading spinner in the meantime.

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    // Good practice to wrap localStorage get and set in try/catch blocks because of the
    // conversion to and from JSON
    try {
      const item = localStorage.getItem(key);
      if (item && item !== undefined) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  // This function serves as a setter for our custom useLocalStorage hook. It could be simplified but
  // this more complex version guarantees we're working with the latest state, so is best practice,
  // even if overkill in a simple app like this. It's wrapped in useCallback to maintain referential
  // equality between renders. Excessive comments incoming...
  const setValue = useCallback(
    // The function accepts a generic type T which could be:
    // 1. A direct value of type T
    // 2. A function that takes the previous value (of type T) and returns a new value (also type T)
    (value: T | ((val: T) => T)) => {
      try {
        // Determine whether to use the direct value or call the updater function
        const valueToStore =
          value instanceof Function
            ? // If it is a function, call it with the current storedValue
              // This allows for updates based on the previous state,
              // e.g.: setValue(prev => [...prev, newItem])
              value(storedValue)
            : // If it's not a function, use the value directly
              value;

        // Update our local React state with the new value
        setStoredValue(valueToStore);

        // Persist the new value to localStorage
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    },
    // Dependencies array for useCallback. The function will be recreated if either of these change:
    // 1. key - the localStorage key we're using (in this case a constant but good practice to check)
    // 2. storedValue - needed because we use it in the function
    [key, storedValue]
  );

  return [storedValue, setValue, isLoading] as const;
}
