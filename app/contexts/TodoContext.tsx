'use client';

import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../utils/localStorage';
import { TodoContextType, Task } from '../todo/types';
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_KEY = 'tasks';

const DEFAULT_TASKS: Task[] = [
  { id: nanoid(), text: 'Eat Catnip', completed: false },
  { id: nanoid(), text: 'Chase laser pointer', completed: false },
  { id: nanoid(), text: 'Sleepy time', completed: false },
];

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  // We are using a custom hook, useLocalStorage, to handle localStorage, which is significantly
  // more complicated in Next.js than it was in vanilla React, due to server/client mismatches -
  // the initial server-side rendering doesn't have access to localStorage so when the
  // client-side hydration happens, there's a mismatch. The solution is to check is to have
  // an initial 'isLoading' state during SSR and only render the list of tasks on the client
  // once it has access to localStorage. We briefly show a loading spinner in the meantime.
  const [tasks, setTasks, isLoading] = useLocalStorage<Task[]>(
    LOCAL_STORAGE_KEY,
    DEFAULT_TASKS
  );

  const addTask = (text: string) => {
    // Using Nanoid to create a unique ID for each task when created
    setTasks((prev) => [...prev, { id: nanoid(), text, completed: false }]);
  };

  // TODO - should these be wrapped with useCallback? E.g.:
  // const toggleCompleted = useCallback(
  //   (id: string) => { ... },
  //   [setTasks]
  // );

  const toggleCompleted = (id: string) => {
    setTasks((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTask = (id: string, text: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, text: text } : task
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        isLoading,
        tasks,
        addTask,
        toggleCompleted,
        deleteTask,
        editTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}
