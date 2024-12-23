// The story generator input elements plus submit button. The inputs are an object, a preposition
// and a setting, in the form "Generate a story about a kitten and a [horse] [on a] [pirate ship]".

'use client';

import { useState } from 'react';
import { StoryInputProps } from '../types';
import { theme } from '@/app/styles/theme';
import DropdownInput from './DropdownInput';

const StoryInputForm = ({ generateStory }: StoryInputProps) => {
  const [object, setObject] = useState<string>('');
  const [setting, setSetting] = useState<string>('');
  const [preposition, setPreposition] = useState<string>('');

  // The user has submitted parameters so generate a story
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    generateStory({
      object: object,
      setting: setting,
      preposition: preposition,
    });

    // Reset the input fields ready for another one
    setObject('');
    setSetting('');
  };

  // We're using a custom dropdown input component, and it needs to be able
  // to trigger an update to the controlled input
  const prepositionChanged = (prepositionSelected: string) => {
    setPreposition(prepositionSelected);
  };

  // Note whether they've filled in the parameters allowing us to generate a story yet
  const canGenerate: boolean = object !== '' && setting !== '';

  // Responsive layout differences kick in at medium ('md') screen size and above. Smaller than that,
  // the inputs and Generate Story button are in a single column. Larger than that they are in a row.
  return (
    <form className={`px-4 grid grid-cols-1 max-w-[900px] mx-auto`}>
      {/* Header */}
      <h4
        className={`${theme.text.lowContrast} text-xl sm:text-2xl mb-4 md:mb-8`}
      >
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
            className={`px-4 pt-1 pb-2 w-full rounded border ${theme.border} text-primary-950 text-xl bg-primary-50 focus:outline-none focus:ring-0`}
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
            className={`px-4 pt-1 pb-2 w-full rounded border ${theme.border} text-primary-950 text-xl bg-primary-50 focus:outline-none focus:ring-0`}
          />
        </div>
        {/* Generate Story button, only enabled if we have valid inputs */}
        <button
          onClick={handleSubmit}
          className={`rounded mx-auto w-40 mt-2 md:mt-0 px-4 py-3 md:py-2 text-lg leading-tight mb-4 md:ml-4 ${
            canGenerate ? theme.button.active : theme.button.disabled
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
