import { theme } from '@/app/styles/theme';
import { Movie } from '../types';
import { useState } from 'react';
import Image from 'next/image';
import {
  StarIconWithClass,
  UpArrowIconWithClass,
  DownArrowIconWithClass,
} from '../../icons';

// 'w500' is the image size; can also be w342, w185, w154 and w92, for smaller, or w780 or original for larger
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { title, poster_path, overview, vote_average, vote_count } = movie;
  const imageUrl = poster_path ? `${BASE_IMAGE_URL}${poster_path}` : '';
  const MIN_CHARS_FOR_EXPAND = 100;
  const overviewIsShort = overview.length <= MIN_CHARS_FOR_EXPAND;
  const [showFullText, setShowFullText] = useState(false);

  const toggleExpand = () => {
    setShowFullText(!showFullText);
  };

  return (
    <article
      className={`card ${theme.bg.highContrast} w-72 shadow-xl justify-center align-top p-4`}
    >
      <figure>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={256}
            height={384}
            priority
            className='w-full h-auto object-cover'
          />
        )}
      </figure>
      <div className='card-body grid align-top'>
        <h2 className={`${theme.text.highContrast} font-bold`}>{title}</h2>
        <h3 className={`${theme.text.highContrast}`}>
          <StarIconWithClass
            className={`${theme.text.highContrast} mx-1 inline-block align-middle`}
          />
          <span className='align-middle'>
            <span className='font-bold'>{vote_average.toFixed(1)}</span> (
            {vote_count} votes)
          </span>
        </h3>
        {showFullText || overviewIsShort ? (
          <div className='grid'>
            <p className={`${theme.text.lowContrast}`}>{overview}</p>
            <button onClick={toggleExpand}>
              {!overviewIsShort && (
                <UpArrowIconWithClass
                  className={`${theme.text.highContrast} text-xl my-auto mx-2 inline-block`}
                />
              )}
            </button>
          </div>
        ) : (
          <div className='grid'>
            <p className={`${theme.text.lowContrast}`}>
              {overview.slice(0, MIN_CHARS_FOR_EXPAND)}...
            </p>
            <button onClick={toggleExpand}>
              <DownArrowIconWithClass
                className={`${theme.text.highContrast} text-xl my-auto mx-2 inline-block`}
              />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
export default MovieCard;
