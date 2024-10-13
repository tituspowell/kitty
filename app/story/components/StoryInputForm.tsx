// The story generator input elements plus submit button

'use client';

import { useState } from 'react';
import { StoryInputProps } from '../types';
import { theme } from '@/app/styles/theme';
import DropdownInput from './DropdownInput';

const StoryInputForm = ({ isGenerating, generateStory }: StoryInputProps) => {
  const [object, setObject] = useState<string>('');
  const [setting, setSetting] = useState<string>('');
  const [preposition, setPreposition] = useState<string>('');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    generateStory({
      object: object,
      setting: setting,
      preposition: preposition,
    });

    // Reset the input fields
    setObject('');
    setSetting('');
  };

  const prepositionChanged = (prepositionSelected: string) => {
    setPreposition(prepositionSelected);
  };

  const canGenerate: boolean = !isGenerating && object !== '' && setting !== '';

  // Responsive layout differences kick in at medium ('md') screen size and above. Smaller than that,
  // the inputs and Generate Story button are in a single column. Larger than that they are in a row.
  return (
    <form className={`px-4 grid grid-cols-1 max-w-[900px] mx-auto`}>
      {/* Header */}
      <h4 className='text-xl sm:text-2xl mb-4 md:mb-8'>
        Create a story about a kitten and a...
      </h4>
      {/* This div wraps both the inputs and also the Generate Story button, to control the layout  */}
      <div className='grid md:flex'>
        {/* This div wraps both inputs, to control the layout */}
        <div className='flex flex-1 flex-col md:flex-row mb-4'>
          {/* Input for the 'object' part of the prompt */}
          <input
            type='text'
            placeholder='e.g., turtle, magic wand'
            value={object}
            onChange={(e) => {
              setObject(e.target.value);
            }}
            className={`px-4 pt-1 pb-2 w-full rounded-l border ${theme.border} text-black text-xl bg-primary-50 focus:outline-none focus:ring-0`}
          />
          {/* Input for the 'preposition' part of the prompt, e.g. 'in a' */}
          <DropdownInput prepositionChanged={prepositionChanged} />
          {/* Input for the 'setting' part of the prompt */}
          <input
            type='text'
            placeholder='e.g., forest, spaceship'
            value={setting}
            onChange={(e) => {
              setSetting(e.target.value);
            }}
            className={`px-4 pt-1 pb-2 w-full rounded-l border ${theme.border} text-black text-xl bg-primary-50 focus:outline-none focus:ring-0`}
          />
        </div>
        {/* Generate Story button, only shown if we have valid inputs */}
        <button
          onClick={handleClick}
          className={`rounded mx-auto w-40 mt-2 md:mt-0 px-4 py-3 md:py-2 text-lg leading-tight mb-4 md:ml-4 ${
            canGenerate ? `${theme.button.primary}` : `${theme.button.disabled}`
          }`}
          disabled={!canGenerate}
        >
          Generate Story!
        </button>
      </div>
    </form>
  );
};

export default StoryInputForm;
