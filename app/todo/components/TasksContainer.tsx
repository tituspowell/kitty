'use client';

import { useCallback } from 'react';
import { useLocalStorage } from '../../utils/localStorage';
import InputForm from './InputForm';
import TodoList from './TodoList';
import { Task } from '../types';
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_KEY = 'tasks';

const DEFAULT_TASKS: Task[] = [
  { id: nanoid(), description: 'Eat Catnip', isComplete: false },
  { id: nanoid(), description: 'Chase laser pointer', isComplete: false },
  { id: nanoid(), description: 'Sleepy time', isComplete: false },
];

const TasksContainer = () => {
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

  // Using useCallback for memoization of the CRUD functions for optimisation purposes, so they
  // are not recreated every time the component renders
  const addTask = useCallback(
    (task: Task) => {
      setTasks((currentTasks) => [...currentTasks, task]);
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const editTask = useCallback(
    (id: string, newDescription: string) => {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? { ...task, description: newDescription } : task
        )
      );
    },
    [setTasks]
  );

  const toggleCompleted = useCallback(
    (id: string) => {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? { ...task, isComplete: !task.isComplete } : task
        )
      );
    },
    [setTasks]
  );

  if (isLoading) {
    // Server-side rendering and we don't have access to localStorage, so show a loading spinner
    return (
      <div className='flex justify-center items-center h-32'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500'></div>
      </div>
    );
  }

  // Client-side hydration and we have access to localStorage, so can finally show the task list
  return (
    <section className='mx-auto'>
      <InputForm addTask={addTask} />
      <TodoList
        tasks={tasks}
        deleteTask={deleteTask}
        editTask={editTask}
        toggleCompleted={toggleCompleted}
      />
    </section>
  );
};

export default TasksContainer;
