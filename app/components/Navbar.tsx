'use client';

import NavLink from './NavLink';
import { ThemeSwitch } from './ThemeSwitch';

function Navbar() {
  return (
    <nav className='w-full mx-auto flex gap-4 md:gap-8 mt-6 mb-12 justify-center place-items-center'>
      <NavLink path={'/'} text='Home' />
      <NavLink path={'/todo'} text='To Do List' />
      <NavLink path={'/movies'} text='Movies' />
      <NavLink path={'/calculator'} text='Calculator' />
      <ThemeSwitch />
    </nav>
  );
}
export default Navbar;
