'use client';

import { useState } from 'react';
import { Task } from '../types';
import { toast } from 'react-toastify';
import { PawIconWithClass, TickIconWithClass } from '../../icons';
import { useTodo } from '@/app/contexts/TodoContext';
import { theme } from '@/app/styles/theme';

const SingleTask = ({ task }: { task: Task }) => {
  const { id, text } = task;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const { toggleCompleted, deleteTask, editTask } = useTodo();

  const handleEdit = () => {
    setIsEditing(true);
    setInput(text);
  };

  const handleUpdate = () => {
    if (!input) {
      toast.error('Meep! Please enter a value!');
      return;
    }

    editTask(id, input);
    setIsEditing(false);
  };

  return (
    <article>
      {/* Conditional rendering: normally we show the task plus a Delete and an Edit button. Once they
      click Edit, through, we show an input field and an Update and a Cancel button instead. */}
      {!isEditing ? (
        <div className='flex py-0.5'>
          {/* Normal version, showing the task plus a Delete and an Edit button */}
          <button
            onClick={() => toggleCompleted(task.id)}
            className={`flex-1 ${theme.task}`}
          >
            <div className='flex'>
              {task.completed ? (
                <TickIconWithClass className='text-xl my-auto mx-2' />
              ) : (
                <PawIconWithClass className='text-xl my-auto mx-2' />
              )}
              <h4
                className={`flex-1 flex text-lg rounded-l pl-2 ${
                  task.completed && 'line-through'
                }`}
              >
                {text}
              </h4>
            </div>
          </button>
          {/* Delete button */}
          <button
            className={`${theme.button.primary} mx-0 w-20`}
            onClick={() => deleteTask(id)}
          >
            Delete
          </button>
          {/* Edit button */}
          <button
            className={`${theme.button.secondary} mx-0 w-20`}
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      ) : (
        <div className='flex py-0.5'>
          {/* 'Editing' version, showing the task as an input plus an Update and a Cancel button */}
          <div className='flex-1 flex text-primary-100 bg-primary-950'>
            <input
              className={`flex-1 text-black text-lg rounded-l pl-2 focus:outline-none focus:ring-0 focus:border-none`}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
          {/* Update button */}
          <button
            className={`${theme.button.primary} mx-0 w-20`}
            onClick={handleUpdate}
          >
            Update
          </button>
          {/* Cancel button */}
          <button
            className={`${theme.button.secondary} mx-0 w-20`}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </article>
  );
};
export default SingleTask;