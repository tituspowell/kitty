'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Task } from '../types';
import { nanoid } from 'nanoid';

const InputForm = ({ addTask }: { addTask: (task: Task) => void }) => {
  const [input, setInput] = useState('');

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Using Toastify for the error alert
    if (!input) {
      toast.error('Meep! Please enter a task description!');
      return;
    }

    // Using Nanoid to create a unique ID for each task when created
    const newTask: Task = {
      id: nanoid(),
      description: input,
      isComplete: false,
    };
    addTask(newTask);

    // Clear the input after successfully adding a task
    setInput('');
  };

  return (
    <form className='m-4 flex' onSubmit={handleFormSubmit}>
      <input
        type='text'
        name=''
        id=''
        placeholder='I enters important task here...'
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className='px-2 py-1 flex-1 rounded-l text-black text-xl focus:outline-none focus:ring-0 focus:border-none bg-amber-50'
      />
      <button type='submit' className='bg-amber-900 rounded-r mx-0 px-4'>
        Add Task
      </button>
    </form>
  );
};
export default InputForm;