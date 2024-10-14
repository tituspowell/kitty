// From the React-Icons library. The icons don't have a className prop so Typescript complains
// (yet still works) if Tailwind classes are assigned directly to the icons, which we often want
// to do for styling purposes. So instead we wrap them and use these components instead.

import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fa';
import { IoIosPaw } from 'react-icons/io';
import { GiCheckMark } from 'react-icons/gi';
import { FaSearch } from 'react-icons/fa';
import { SlArrowUp, SlArrowDown } from 'react-icons/sl';
import { IoCloseSharp } from 'react-icons/io5';
import { ImProfile } from 'react-icons/im';
import { FaStar } from 'react-icons/fa6';

// Icons used globally

export const SunIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <FiSun {...props} />;
};

export const MoonIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <FaMoon {...props} />;
};

export const UpArrowIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <SlArrowUp {...props} />;
};

export const DownArrowIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <SlArrowDown {...props} />;
};

export const CloseIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <IoCloseSharp {...props} />;
};

export const ProfileIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <ImProfile {...props} />;
};

// Icons used by the To-do app

export const PawIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <IoIosPaw {...props} />;
};

export const TickIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <GiCheckMark {...props} />;
};

// Icons used by the Movies app

export const SearchIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <FaSearch {...props} />;
};

export const StarIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <FaStar {...props} />;
};
