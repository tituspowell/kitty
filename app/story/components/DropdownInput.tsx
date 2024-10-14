// Custom dropdown input component, separated out to reduce clutter even though
// it won't be used anywhere other than the story input form. As part of the
// story parameters we let the user pick a preposition, as in, "Generate a story
// about a kitten and a [pig] [in a] [toy factory]". If the preposition was fixed
// as 'in' then it would restrict the settings that would make sense and could
// frustrate the user. By having a few preposition options, the user gets to enter
// things like 'on a train', 'with a huge hat', etc.

'use client';

import { DownArrowIconWithClass } from '@/app/icons';
import { theme } from '@/app/styles/theme';
import { useState } from 'react';
import { DropdownInputProps } from '../types';

const DropdownInput: React.FC<DropdownInputProps> = ({
  prepositionChanged,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('in a');

  // The hard-coded options
  const options = [
    { value: 'in a', label: 'in a' },
    { value: 'on a', label: 'on a' },
    { value: 'with a', label: 'with a' },
    { value: 'and a', label: 'and a' },
  ];

  // Control the input
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    prepositionChanged(newValue);
  };

  return (
    <div className='relative inline-block w:8 md:w-72 md:px-1 my-1 md:my-0'>
      <select
        value={selectedOption}
        onChange={handleChange}
        className={`text-primary-950 bg-primary-50 text-xl block appearance-none w-full border ${theme.border} px-4 py-2 pb-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2'>
        <DownArrowIconWithClass className='text-primary-950 fill-current h-4 w-4 text-xs' />
      </div>
    </div>
  );
};

export default DropdownInput;
