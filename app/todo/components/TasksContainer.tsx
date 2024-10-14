// Container for the interactive part of the to-do list mini-app, encompassing the 'add task' input form and the interactive list of tasks.
// For this mini-app, the state is managed using Context API, in the 'TodoContext.tsx' file.

'use client';

import TaskInputForm from './TaskInputForm';
import TodoList from './TodoList';
import { useTodo } from '@/app/contexts/TodoContext';

const TasksContainer = () => {
  const { isLoading } = useTodo();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-32 flex-grow'>
        <div
          className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700'
          // For accessibility / screen readers
          aria-label='Loading tasks'
          role='status'
        ></div>
      </div>
    );
  }

  // Client-side hydration and we have access to localStorage, so can finally show the task list
  return (
    <section className='w-full mx-auto flex-grow'>
      <TaskInputForm />
      <TodoList />
    </section>
  );
};

export default TasksContainer;
