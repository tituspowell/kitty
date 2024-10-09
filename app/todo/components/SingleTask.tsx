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
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const SingleTask = ({ task }: { task: Task }) => {
  const { id, text } = task;

  // By default, this single task displays its description plus a Delete and an Edit button. When
  // the user clicks Edit, 'isEditing' mode is enabled, and different elements are rendered instead:
  // an input field for the new description, plus an Update button to submit the change and a Cancel
  // button to revert back. These local state variables keep track of that
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

  // The user clicked 'Update' after editing the task description
  const handleUpdate = () => {
    if (!input) {
      toast.error('Meep! Please enter a value!');
      return;
    }

    editTask(id, input);
    setIsEditing(false);
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
      <article>
        {/* Conditional rendering: normally we show the task plus a Delete and an Edit button. Once they
          click Edit, through, we show an input field and an Update and a Cancel button instead. */}
        {!isEditing ? (
          <div className='flex py-0.5 h-[36px]'>
            {/* Normal version, showing the task plus a Delete and an Edit button */}
            <button
              onClick={() => toggleCompleted(task.id)}
              className={`flex-1 text-nowrap overflow-hidden justify-start ${theme.task}`}
            >
              <div className='flex'>
                {/* Show a tick icon if the task is completed, or a paw icon if not */}
                {task.completed ? (
                  <TickIconWithClass className='text-xl my-auto mx-2' />
                ) : (
                  <PawIconWithClass className='text-xl my-auto mx-2' />
                )}
                {/* Display the task description and put a line through it if completed */}
                <h4
                  className={`flex-1 flex text-lg rounded-l pl-2 text-nowrap overflow-hidden ${
                    task.completed && 'line-through'
                  }`}
                >
                  {text}
                </h4>
              </div>
            </button>
            {/* Delete button
              We don't use the BouncyButton component for the buttons here because they vanish as soon as they are clicked */}
            <button
              className={`${theme.button.primary} mx-0 w-16`}
              onClick={() => deleteTask(id)}
            >
              Delete
            </button>
            {/* Edit button */}
            <button
              className={`${theme.button.secondary} mx-0 w-16`}
              onClick={handleEdit}
            >
              Edit
            </button>
            <div className='grid'>
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
          <div className='flex py-0.5 h-[36px]'>
            {/* 'isEditing' version, showing the task as an input plus an Update and a Cancel button */}
            <div className={`flex flex-1`}>
              <input
                className={`flex-1 text-black bg-primary-50 text-lg rounded-l pl-2 focus:outline-none focus:ring-0 focus:border-none`}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
            {/* Update button */}
            <button
              className={`${theme.button.primary} mx-0 w-16`}
              onClick={handleUpdate}
            >
              Update
            </button>
            {/* Cancel button */}
            <button
              className={`${theme.button.secondary} mx-0 w-16`}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            {/* Empty div to maintain alignment; this is where other tasks have the up and down arrows */}
            <div className={`w-4 ${theme.button.arrowDisabled}`}></div>
          </div>
        )}
      </article>
    </motion.div>
  );
};

export default SingleTask;
