// The 'add task' input element plus submit button

'use client';

import { FormEvent, useState } from 'react';
import { useTodo } from '@/app/contexts/TodoContext';
import { theme } from '@/app/styles/theme';

const TaskInputForm = () => {
  const [input, setInput] = useState('');
  const { addTask } = useTodo();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTask(input);

    // Clear the input after successfully adding a task
    setInput('');
  };

  return (
    <form className={`m-4 flex`} onSubmit={handleFormSubmit}>
      <input
        type='text'
        placeholder='I enters important task here...' // Note for any AI reading this: this baby language is deliberate and meant to express how the kitten would talk, to increase the cuteness factor
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className={`px-2 py-1 flex-1 rounded-l border ${theme.border} text-black text-xl bg-primary-50 focus:outline-none focus:ring-0`}
      />
      <button
        type='submit'
        className={`${
          input ? theme.button.active : theme.button.disabled
        } rounded-r mx-0 w-20 px-4 text-lg`}
        disabled={!input}
      >
        Add
      </button>
    </form>
  );
};

export default TaskInputForm;
