// The home page, which Next.js uses because of its location in the root of 'app'.
// It is wrapped by the accompanying layout.tsx which holds the Navbar as well.

import Image from 'next/image';
import kittenImage from './images/KittyHome.png';
import { theme } from './styles/theme';

export default function Home() {
  return (
    <div className='max-w-[900px] mx-auto'>
      <section className='max-w-[600px] mx-auto grid grid-cols-2 gap-4 justify-items-stretch align-top p-4 mb-4'>
        {/* The title part */}
        <div className='grid grid-cols-1 align-top justify-items-center h-[100px]'>
          <h1
            className={`${theme.text.lowContrast} text-5xl md:text-6xl text-primary-500 italic text-center leading-10 md:leading-[50px]`}
          >
            Titus Powell
          </h1>
          <h2
            className={`${theme.text.highContrast} text-2xl sm:text-3xl md:text-4xl mt-5 md:mt-8`}
          >
            WEB DEV
          </h2>
          <h2
            className={`${theme.text.highContrast} text-2xl sm:text-3xl md:text-4xl`}
          >
            PORTFOLIO
          </h2>
        </div>
        <div className='relative group'>
          {/* The image */}
          <Image
            src={kittenImage}
            width={256}
            height={256}
            alt='kitten'
            priority
            className='shadow-lg'
          ></Image>
        </div>
      </section>
      {/* The card with info below */}
      <div
        className={`card ${theme.card} ${theme.shadow} justify-center align-top p-4 m-4 mt-4`}
      >
        <h2 className='text-2xl font-bold mb-4'>Welcome!</h2>
        <p className='text-lg'>
          This set of three mini-apps are to show my web development skills
          using <b>React</b>, <b>Next.js</b>, <b>Typescript</b> and{' '}
          <b>Tailwind</b>, with a little help from Kitty.
        </p>{' '}
        <p className='text-lg mt-4'>
          Each page has a button at the bottom that explains what's happening
          behind the scenes. The full code is on{' '}
          <a href='https://github.com/tituspowell/kitty'>
            <b>
              <u>Github</u>
            </b>
          </a>
          .
        </p>
      </div>
    </div>
  );
}
