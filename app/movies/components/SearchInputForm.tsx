'use client';

import React, { FormEvent, useState } from 'react';
import { SearchIconWithClass } from '../../icons';
import { toast } from 'react-toastify';
import { theme } from '@/app/styles/theme';
import BouncyButton from '../../components/BouncyButton';

interface SearchComponentProps {
  defaultInput: string;
  setQuery: (query: string) => void;
}

const SearchInputForm = ({ defaultInput, setQuery }: SearchComponentProps) => {
  const [input, setInput] = useState(defaultInput);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Searching for: ${input}`);

    // Use Toastify for the error alert
    if (!input) {
      toast.error('Meep! Please enter a task description!');
      return;
    }

    setQuery(input);

    // Clear the input after successfully adding a task
    setInput('');
  };

  return (
    <form
      className={`m-4 flex max-w-[600px] mx-auto`}
      onSubmit={handleFormSubmit}
    >
      <SearchIconWithClass className='text-xl my-auto mx-2' />
      <input
        type='text'
        placeholder='I searches movies here...'
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className={`px-4 pt-1 pb-2 flex-1 rounded-l border ${theme.border} text-black text-xl bg-primary-50 focus:outline-none focus:ring-0`}
      />
      <BouncyButton
        isSubmitType={true}
        text='Search'
        className={`${theme.button.primary} rounded-r mx-0 w-20 px-4 text-lg`}
        onClick={() => {}}
      />
    </form>
  );
};

export default SearchInputForm;
