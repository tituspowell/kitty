'use client';

import NavLink from './NavLink';

function Navbar() {
  return (
    <nav className='w-full mx-auto flex gap-8 my-4 justify-center'>
      <NavLink path={'/'} text='Home' />
      <NavLink path={'/todo'} text='To Do List' />
      <NavLink path={'/weather'} text='Weather' />
      <NavLink path={'/calculator'} text='Calculator' />
    </nav>
  );
}
export default Navbar;
