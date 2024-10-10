'use client';

import NavLink from './NavLink';
import { ThemeSwitch } from './ThemeSwitch';

function Navbar() {
  return (
    <nav className='w-full mx-auto flex gap-2 sm:gap-4 md:gap-8 my-4 justify-center place-items-center'>
      <NavLink path={'/'} text='Home' />
      <NavLink path={'/todo'} text='Tasks' />
      <NavLink path={'/movies'} text='Movies' />
      <NavLink path={'/story'} text='Story' />
      <ThemeSwitch />
    </nav>
  );
}
export default Navbar;
