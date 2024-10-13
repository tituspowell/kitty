// TMDB requires attribution as a condition of use, so this component displays that

import Image from 'next/image';
import TMDBAttributionImage from '../images/tmdb.svg';

const TMDBAttribution = () => {
  return (
    <div className='flex gap-2 m-4 align-top'>
      <p className='pb-1'>Search results provided by</p>
      <Image
        src={TMDBAttributionImage}
        alt='TMDB'
        priority
        className='w-32 h-auto object-contain'
      ></Image>
    </div>
  );
};
export default TMDBAttribution;
