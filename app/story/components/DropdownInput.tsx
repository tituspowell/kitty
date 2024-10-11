'use client';

import { DownArrowIconWithClass } from '@/app/icons';
import { theme } from '@/app/styles/theme';
import { useState } from 'react';
import { DropdownInputProps } from '../types';

const DropdownInput: React.FC<DropdownInputProps> = ({
  prepositionChanged,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('in a');

  const options = [
    { value: 'in a', label: 'in a' },
    { value: 'on a', label: 'on a' },
    { value: 'with a', label: 'with a' },
    { value: 'and a', label: 'and a' },
  ];

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
        className={`text-primary-950 bg-primary-100 text-xl block appearance-none w-full border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
      >
        {/* <option value='' disabled>
          Select an option
        </option> */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2'>
        <DownArrowIconWithClass className='text-primary-950 fill-current h-4 w-4 mt-1 text-xs' />
      </div>
    </div>
  );
};

export default DropdownInput;
