'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useTodo } from '@/app/contexts/TodoContext';
import { theme } from '@/app/styles/theme';
import BouncyButton from './BouncyButton';

const InputForm = () => {
  const [input, setInput] = useState('');
  const { addTask } = useTodo();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Use Toastify for the error alert
    if (!input) {
      toast.error('Meep! Please enter a task description!');
      return;
    }

    addTask(input);

    // Clear the input after successfully adding a task
    setInput('');
  };

  return (
    <form className={`m-4 flex`} onSubmit={handleFormSubmit}>
      <input
        type='text'
        placeholder='I enters important task here...'
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className={`px-2 py-1 flex-1 rounded-l border ${theme.border} text-black text-xl bg-primary-50 focus:outline-none focus:ring-0`}
      />
      <BouncyButton
        isSubmitType={true}
        text='Add'
        className={`${theme.button.primary} rounded-r mx-0 w-20 px-4 text-lg`}
        onClick={() => {}}
      />
    </form>
  );
};
export default InputForm;
