// The story generator input elements plus submit button

'use client';

import { useState } from 'react';
import { StoryInputProps } from '../types';
import { theme } from '@/app/styles/theme';

const StoryInputForm = ({ isGenerating, generateStory }: StoryInputProps) => {
  const [object, setObject] = useState('horse');
  const [setting, setSetting] = useState('forest');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    generateStory({ object: object, setting: setting });
  };

  const validInputs: boolean = object !== '' && setting !== '';

  return (
    <form className={`p-4 grid grid-cols-1 max-w-[600px] mx-auto`}>
      <h4 className='text-xl my-2'>Create a story about a kitten and a...</h4>
      <input
        type='text'
        placeholder='e.g., turtle, magic wand, pony'
        value={object}
        onChange={(e) => {
          setObject(e.target.value);
        }}
        className={`px-4 pt-1 pb-2 flex-1 rounded-l border ${theme.border} text-black text-xl bg-primary-50 focus:outline-none focus:ring-0`}
      />
      <h4 className='text-xl my-2'>in a...</h4>
      <input
        type='text'
        placeholder='e.g., forest, boat, castle'
        value={setting}
        onChange={(e) => {
          setSetting(e.target.value);
        }}
        className={`px-4 pt-1 pb-2 flex-1 rounded-l border ${theme.border} text-black text-xl bg-primary-50 focus:outline-none focus:ring-0`}
      />
      {validInputs && (
        <button
          onClick={handleClick}
          className='bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors'
          disabled={isGenerating}
        >
          {isGenerating ? 'Creating Story...' : 'Generate Adventure!'}
        </button>
      )}
    </form>
  );
};

export default StoryInputForm;
