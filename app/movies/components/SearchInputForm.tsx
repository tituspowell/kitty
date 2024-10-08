'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { SearchIconWithClass } from '../../icons';

interface SearchComponentProps {
  setQuery: (query: string) => void;
}

const SearchInputForm = ({ setQuery }: SearchComponentProps) => {
  const [input, setInput] = useState('cat');

  const loading = false; // TODO

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Search term is: ${input}`);

    if (input) {
      setQuery(input);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <form onSubmit={handleSubmit} className='mb-8'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='I searches for movies...'
            // className='flex-grow'
          />
          <button type='submit' disabled={loading}>
            <SearchIconWithClass className='mr-2 h-4 w-4' />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInputForm;
