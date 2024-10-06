import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fa';
import { IoIosPaw } from 'react-icons/io';
import { GiCheckMark } from 'react-icons/gi';

// The React icons don't have a className prop so Typescript complains (yet still works) if Tailwind classes
// are assigned directly to the icons. So instead we wrap them

// Icons used globally by ThemeSwitch

export const SunIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <FiSun {...props} />;
};

export const MoonIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <FaMoon {...props} />;
};

// Icons used by the To-do app

export const PawIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <IoIosPaw {...props} />;
};

export const TickIconWithClass = (props: React.ComponentProps<'svg'>) => {
  return <GiCheckMark {...props} />;
};
