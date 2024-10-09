// Displays a card for a single movie, showing the poster image, title, rating with vote count, and an
// overview that can be expanded or collapsed by the user

import { theme } from '@/app/styles/theme';
import { Movie } from '../types';
import { useState } from 'react';
import Image from 'next/image';
import {
  StarIconWithClass,
  UpArrowIconWithClass,
  DownArrowIconWithClass,
} from '../../icons';

// Construct the base URL for displaying the image. 'w342' is the image width; can also be w185, w154
// and w92 for smaller, or w500, w780 or original for larger. Next.js cleverly optimises image sizes
// but since we display in a 256x384 size, there's no point asking TMDB for a larger image
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w342';

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { title, poster_path, overview, vote_average, vote_count } = movie;
  const imageUrl = poster_path ? `${BASE_IMAGE_URL}${poster_path}` : '';

  // If the movie overview text is long, we start with it collapsed and only show the first 100 characters
  const MIN_CHARS_FOR_EXPAND = 100;
  const overviewIsShort = overview.length <= MIN_CHARS_FOR_EXPAND;
  const [showFullText, setShowFullText] = useState(false);

  const toggleExpand = () => {
    setShowFullText(!showFullText);
  };

  return (
    <article
      className={`card ${theme.card} w-72 shadow-xl justify-center align-top p-4 m-2`}
    >
      <figure>
        {/* Show the image if there is one */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={256}
            height={384}
            priority
            className='w-64 h-auto object-cover'
          />
        )}
      </figure>
      {/* The movie title */}
      <div className='card-body grid align-top mt-2'>
        <h2 className={`${theme.text.highContrast} text-lg font-bold`}>
          {title}
        </h2>
        {/* The movie rating with vote count */}
        <h3 className={`${theme.text.highContrast}`}>
          <StarIconWithClass
            className={`${theme.text.highContrast} mx-1 inline-block align-middle`}
          />
          <span className='align-middle'>
            <span className='font-bold'>{vote_average.toFixed(1)}</span> (
            {vote_count} votes)
          </span>
        </h3>
        {/* The movie overview, collapsed or in full */}
        {showFullText || overviewIsShort ? (
          <div className='grid mt-2'>
            <p className={`${theme.text.cardSecondary}`}>{overview}</p>
            <button onClick={toggleExpand}>
              {!overviewIsShort && (
                <UpArrowIconWithClass
                  className={`${theme.text.highContrast} text-xl my-auto mx-2 inline-block`}
                />
              )}
            </button>
          </div>
        ) : (
          <div className='grid mt-2'>
            <p className={`${theme.text.cardSecondary}`}>
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
