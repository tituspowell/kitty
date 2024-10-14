// Shows a cute kitten image and the page title - Kitty's Movie Search

import Image from 'next/image';
import kittenImage from '../images/kitty-watching-movie.png';
import kittenImageMeep from '../images/kitty-watching-movie-meep.png';
import { theme } from '../../styles/theme';

const Hero = () => {
  return (
    <section className='max-w-[600px] mx-auto grid grid-cols-2 gap-4 justify-items-stretch align-top p-4 mb-4'>
      {/* The title part */}
      <div className='grid grid-cols-1 align-top justify-items-center h-[100px]'>
        <h1
          className={`${theme.text.lowContrast} text-6xl text-primary-500 italic`}
        >
          Kitty's
        </h1>
        <h2
          className={`${theme.text.highContrast} text-3xl md:text-4xl mt-6 text-center`}
        >
          MOVIE SEARCH
        </h2>
      </div>
      <div className='relative group'>
        {/* When the user hovers over the image, a cute speech bubble appears saying 'meeep!'. This is
        achieved by having two images, one with the speech bubble and one without, and transitioning
        between them */}
        <Image
          src={kittenImage}
          width={256}
          height={256}
          alt='kitten'
          priority
          className='transition-opacity duration-300 ease-in-out shadow-lg'
        ></Image>
        <Image
          src={kittenImageMeep}
          width={256}
          height={256}
          alt='kitten'
          priority
          className='absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-in-out shadow-lg group-hover:opacity-100'
        ></Image>
      </div>
    </section>
  );
};

export default Hero;
