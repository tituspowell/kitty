// The movie search input element plus submit button

'use client';

import React, { FormEvent, useState } from 'react';
import { SearchIconWithClass } from '../../icons';
import { theme } from '@/app/styles/theme';
import BouncyButton from '../../components/BouncyButton';
import { SearchComponentProps } from '../types';

const SearchInputForm = ({ defaultInput, setQuery }: SearchComponentProps) => {
  const [input, setInput] = useState(defaultInput);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setQuery(input);

    // Clear the input after successfully adding a task
    setInput('');
  };

  return (
    <form
      className={`flex w-full max-w-[600px] px-4 mx-auto`}
      onSubmit={handleFormSubmit}
    >
      <SearchIconWithClass className='text-xl w-5 h-5 mr-1 my-auto flex-shrink-0' />
      <input
        type='text'
        placeholder='I searches movies here...'
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className={`px-4 pt-1 pb-2 flex-1 rounded-l border ${theme.border} text-black text-xl bg-primary-50 focus:outline-none focus:ring-0 overflow-hidden min-w-0`}
      />
      <BouncyButton
        isSubmitType={true}
        text='Search'
        className={`${theme.button.primary} rounded-r mx-0 w-20 px-4 text-lg flex-shrink-0`}
        onClick={() => {}}
      />
    </form>
  );
};

export default SearchInputForm;
