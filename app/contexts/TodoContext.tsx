// Context API specific to the To Do List mini-app, so that relevant state can be accessed where it is needed

'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useLocalStorage } from '../utils/localStorage';
import { TodoContextType, Task } from '../todo/types';
// We use Nanoid to create a unique ID for each task when created
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_KEY = 'tasks';

// Some default tasks as that looks nicer than an empty list
const DEFAULT_TASKS: Task[] = [
  { id: nanoid(), text: 'Eat Catnip', completed: false },
  { id: nanoid(), text: 'Chase laser pointer', completed: false },
  { id: nanoid(), text: 'Sleepy time', completed: false },
];

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  // We are using a custom hook, useLocalStorage, to handle localStorage, which is significantly
  // more complicated in Next.js than it was in vanilla React, due to server/client mismatches -
  // the initial server-side rendering doesn't have access to localStorage, so when the
  // client-side hydration happens, there's a mismatch. The solution is to have an initial
  // 'isLoading' state during SSR and only render the list of tasks on the client
  // once it has access to localStorage. We briefly show a loading spinner in the meantime.
  const [tasks, setTasks, isLoading] = useLocalStorage<Task[]>(
    LOCAL_STORAGE_KEY,
    DEFAULT_TASKS
  );

  // CRUD functions, wrapped in useCallback for optimisation best practice.
  // This ensures that the function references remain stable between renders
  // and avoids unnecessary re-renders in child components

  const addTask = useCallback(
    (text: string) => {
      setTasks((prev) => [...prev, { id: nanoid(), text, completed: false }]);
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const deleteAllCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, [setTasks]);

  const editTask = useCallback(
    (id: string, text: string) => {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? { ...task, text: text } : task
        )
      );
    },
    [setTasks]
  );

  const toggleCompleted = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  // It's useful for the SingleTask component to know if it is first or last in the list
  // so that it can disable the 'move up' or 'move down' functionality if appropriate

  const isFirstTask = useCallback(
    (id: string): boolean => {
      if (tasks.length === 0) {
        console.log('isFirstTask called on empty task array!');

        return false;
      }
      return tasks[0].id === id;
    },
    [tasks]
  );

  const isLastTask = useCallback(
    (id: string): boolean => {
      if (tasks.length === 0) {
        console.log('isLastTask called on empty task array!');

        return false;
      }
      return tasks[tasks.length - 1].id === id;
    },
    [tasks]
  );

  const moveTaskUp = useCallback(
    (id: string) => {
      const index = tasks.findIndex((task) => task.id === id);

      if (index < 0 || index >= tasks.length) {
        console.log(`Could not find task with ID: ${id}`);
        return;
      }

      if (index == 0) {
        console.log(
          `Tried to move task forward that was already first in the list! ID: ${id}`
        );
        return;
      }

      // Create a copy of the task array
      const newTasks = [...tasks];

      // Switch the relevant task with the one before it
      [newTasks[index - 1], newTasks[index]] = [
        newTasks[index],
        newTasks[index - 1],
      ];

      setTasks(newTasks);
    },
    [tasks, setTasks]
  );

  const moveTaskDown = useCallback(
    (id: string) => {
      const index = tasks.findIndex((task) => task.id === id);

      if (index < 0 || index >= tasks.length) {
        console.log(`Could not find task with ID: ${id}`);
        return;
      }
      if (index === tasks.length - 1) {
        console.log(
          `Tried to move task backward that was already last in the list! ID: ${id}`
        );
        return;
      }

      // Create a copy of the task array
      const newTasks = [...tasks];

      // Switch the relevant task with the one after it
      [newTasks[index], newTasks[index + 1]] = [
        newTasks[index + 1],
        newTasks[index],
      ];

      setTasks(newTasks);
    },
    [tasks, setTasks]
  );

  // Memoize the context value. This prevents unnecessary re-renders of all
  // consuming components when the context value hasn't actually changed. The
  // The dependency array includes all the values and functions in the context
  const contextValue = useMemo(
    () => ({
      isLoading,
      tasks,
      addTask,
      toggleCompleted,
      deleteTask,
      editTask,
      moveTaskUp,
      moveTaskDown,
      isFirstTask,
      isLastTask,
      deleteAllCompleted,
    }),
    [
      isLoading,
      tasks,
      addTask,
      toggleCompleted,
      deleteTask,
      editTask,
      moveTaskUp,
      moveTaskDown,
      isFirstTask,
      isLastTask,
      deleteAllCompleted,
    ]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}
