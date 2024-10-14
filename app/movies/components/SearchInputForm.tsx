// The movie search input element plus submit button

'use client';

import React, { FormEvent, useState } from 'react';
import { SearchIconWithClass } from '../../icons';
import { theme } from '@/app/styles/theme';
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
    <section className=' w-full max-w-[600px] px-4 mx-auto'>
      <form className={'flex'} onSubmit={handleFormSubmit}>
        <SearchIconWithClass className='text-xl w-5 h-5 mr-1 my-auto flex-shrink-0' />
        <input
          type='text'
          placeholder='I searches movies here...'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className={`px-4 pt-1 pb-2 w-full rounded-l border ${theme.border} text-primary-950 text-xl bg-primary-50 focus:outline-none focus:ring-0`}
        />
        <button
          type='submit'
          className={`${
            input ? theme.button.active : theme.button.disabled
          } rounded-r mx-0 w-20 px-4 text-lg flex-shrink-0`}
          disabled={!input}
        >
          Search
        </button>
      </form>
      <h4 className={`mt-2 pl-6 ${theme.text.lowContrast}`}>
        Please enter a search term above, e.g. dog
      </h4>
    </section>
  );
};

export default SearchInputForm;
