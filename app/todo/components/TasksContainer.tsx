'use client';

import InputForm from './InputForm';
import TodoList from './TodoList';
import { useTodo } from '@/app/contexts/TodoContext';

const TasksContainer = () => {
  const { isLoading } = useTodo();

  // Using useCallback for memoization of the CRUD functions for optimisation purposes, so they
  // are not recreated every time the component renders
  // const addTask = useCallback(
  //   (task: Task) => {
  //     setTasks((currentTasks) => [...currentTasks, task]);
  //   },
  //   [setTasks]
  // );

  // const deleteTask = useCallback(
  //   (id: string) => {
  //     setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  //   },
  //   [setTasks]
  // );

  // const editTask = useCallback(
  //   (id: string, newDescription: string) => {
  //     setTasks((currentTasks) =>
  //       currentTasks.map((task) =>
  //         task.id === id ? { ...task, description: newDescription } : task
  //       )
  //     );
  //   },
  //   [setTasks]
  // );

  if (isLoading) {
    // Server-side rendering and we don't have access to localStorage, so show a loading spinner
    return (
      <div className='flex justify-center items-center h-32'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500'></div>
      </div>
    );
  }

  // Client-side hydration and we have access to localStorage, so can finally show the task list
  return (
    <section className='mx-auto'>
      <InputForm />
      <TodoList />
    </section>
  );
};

export default TasksContainer;
