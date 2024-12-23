// Renders a single interactive task in the task list

'use client';

import { useState } from 'react';
import { Task } from '../types';
import { useTodo } from '@/app/contexts/TodoContext';
import { theme } from '@/app/styles/theme';
import {
  PawIconWithClass,
  TickIconWithClass,
  UpArrowIconWithClass,
  DownArrowIconWithClass,
} from '../../icons';
import { motion } from 'framer-motion';

const SingleTask = ({ task }: { task: Task }) => {
  const { id, text } = task;

  // By default, this single task displays its description plus a Delete and an Edit button. When
  // the user clicks Edit, 'isEditing' mode is enabled, and different elements are rendered instead:
  // an input field for the new description, plus an Update button to submit the change and a Cancel
  // button to revert back. These local state variables keep track of that.
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  // Retrieve various functions we'll need from the Context API through the useTodo custom hook
  const {
    toggleCompleted,
    deleteTask,
    editTask,
    moveTaskUp,
    moveTaskDown,
    isFirstTask,
    isLastTask,
  } = useTodo();

  // The user clicked 'Edit' so switch into editing mode and set the input for the new description
  // to be the current task description
  const handleEdit = () => {
    setIsEditing(true);
    setInput(text);
  };

  // The user clicked 'Update' after editing the task description to commit the change
  const handleUpdate = () => {
    editTask(id, input);
    setIsEditing(false);
  };

  // Detect an Enter key press when updating a task description
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  };

  // It's useful for this SingleTask component to know if it is first or last in the list
  // so that it can disable the 'move up' or 'move down' functionality if appropriate
  const first: boolean = isFirstTask(id);
  const last: boolean = isLastTask(id);

  return (
    // Use Framer Motion library to wrap the JSX so we can have nice animation effects
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }} // Starting state (invisible and slightly above)
      animate={{ opacity: 1, y: 0 }} // Ending state (fully visible and at normal position)
      exit={{ opacity: 0, y: -10 }} // Exiting state (fades out and moves up)
    >
      <article className={`${theme.task} md:min-w-[600px]`}>
        {/* Conditional rendering: normally we show the task plus a Delete and an Edit button. Once they
          click Edit, we show an input field and an Update and a Cancel button instead. */}
        {!isEditing ? (
          <div className='flex my-0.5 items-center'>
            {/* Normal version, showing the task plus a Delete and an Edit button.
              The task itself is a button because clicking on it toggles its 'completed' status. */}
            <button
              onClick={() => toggleCompleted(task.id)}
              className={`flex-1 text-nowrap overflow-hidden justify-start grid grid-flow-col `}
            >
              {/* Show a tick icon if the task is completed, or a paw icon if not. Hide on small screens to make space */}
              {task.completed ? (
                <TickIconWithClass className='text-xl my-auto mx-2 hidden md:block' />
              ) : (
                <PawIconWithClass className='text-xl my-auto mx-2 hidden md:block' />
              )}
              {/* Display the task description and put a line through it if completed */}
              <h4
                className={`md:text-lg pl-2 whitespace-normal overflow-hidden text-left ${
                  task.completed && 'line-through'
                }`}
              >
                {text}
              </h4>
            </button>
            {/* Delete button */}
            <button
              className={`${theme.button.active} mx-0 w-16 p-1 pb-1.5 self-start`}
              onClick={() => deleteTask(id)}
            >
              Delete
            </button>
            {/* Edit button */}
            <button
              className={`${theme.button.active} mx-0 w-16 p-1 pb-1.5 self-start ml-0.5`}
              onClick={handleEdit}
            >
              Edit
            </button>
            <div className={`grid px-0.5 ${theme.bg.arrow} w-5 self-start`}>
              {/* Up arrow button to move the task up in the task list, unless already at the top */}
              <button
                disabled={first}
                onClick={() => moveTaskUp(id)}
                className={`${
                  first ? theme.button.arrowDisabled : theme.button.arrow
                }`}
              >
                <UpArrowIconWithClass />
              </button>
              {/* Down arrow button to move the task down in the task list, unless already at the bottom */}
              <button
                disabled={last}
                onClick={() => moveTaskDown(id)}
                className={`${
                  last ? theme.button.arrowDisabled : theme.button.arrow
                }`}
              >
                <DownArrowIconWithClass />
              </button>
            </div>
          </div>
        ) : (
          <div className='flex my-0.5'>
            {/* 'isEditing' version, showing the task as an input plus an Update and a Cancel button */}
            <input
              className={`w-full flex-1 min-w-0 whitespace-normal overflow-hidden text-left text-primary-950 bg-primary-50 md:text-lg rounded-l pl-2 focus:outline-none focus:ring-0 focus:border ${theme.border}`}
              value={input}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            {/* Update button */}
            <button
              className={`${theme.button.active} mx-0 w-16 p-1 pb-1.5 self-start`}
              onClick={handleUpdate}
            >
              Update
            </button>
            {/* Cancel button */}
            <button
              className={`${theme.button.active} mx-0 w-16 p-1 pb-1.5 self-start ml-0.5`}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            {/* Empty div to maintain alignment; this is where other tasks have the up and down arrows */}
            <div className={`w-5 ${theme.bg.arrow}`}></div>
          </div>
        )}
      </article>
    </motion.div>
  );
};

export default SingleTask;
