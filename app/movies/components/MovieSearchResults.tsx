// Iterates through an array of movies, displaying the MovieCard subcomponent for each in a grid

import { Movie } from '../types';
import MovieCard from './MovieCard';

const MovieSearchResults = ({ movies }: { movies: Movie[] }) => {
  return (
    <section className='grid justify-center sm:grid-cols-2 md:grid-cols-3 mt-2'>
      {movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </section>
  );
};

export default MovieSearchResults;
