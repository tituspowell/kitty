'use client';

import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../utils/localStorage';
import { TodoContextType, Task } from '../todo/types';
// Using Nanoid to create a unique ID for each task when created
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
    setTasks((prev) => [...prev, { id: nanoid(), text, completed: false }]);
  };

  const toggleCompleted = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: string, text: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, text: text } : task
      )
    );
  };

  const isFirstTask = (id: string): boolean => {
    if (tasks.length === 0) {
      console.log('isFirstTask called on empty task array!');

      return false;
    }
    return tasks[0].id === id;
  };

  const isLastTask = (id: string): boolean => {
    if (tasks.length === 0) {
      console.log('isLastTask called on empty task array!');

      return false;
    }
    return tasks[tasks.length - 1].id === id;
  };

  const moveTaskUp = (id: string) => {
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
  };

  const moveTaskDown = (id: string) => {
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
        moveTaskUp,
        moveTaskDown,
        isFirstTask,
        isLastTask,
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
