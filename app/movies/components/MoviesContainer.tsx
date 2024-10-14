// Container for the interactive part of the movie search mini-app, encompassing the input form and the search results.
// This also has the relevant state used by both subcomponents. It uses useEffect to fetch the movie data from the TMDB
// API whenever the user submits a search query via the input form, and then passes the array of movie data objects down
// to the MovieSearchResults component to display.

'use client';

import { Movie, MovieResponse } from '../types';
import React, { useCallback, useEffect, useState } from 'react';
import SearchInputForm from './SearchInputForm';
import MovieSearchResults from './MovieSearchResults';
import { theme } from '@/app/styles/theme';
import TMDBAttribution from './TMDBAttribution';

// TMDB has a Search API and a Discovery API. The Search API has a fixed number of results (20) unless implementing
// pagination, which would be overkill for this mini-app. The Discovery API supports parameters for sorting and increasing
// the number of results, but depends on a category ID rather than a search term, so not something we can use here.
const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
const MIN_VOTE_COUNT = 10;

const MoviesContainer = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  // Fetch new movie data from the TMDB API whenever we have a new query
  const fetchMoviesData = useCallback(async () => {
    if (!query) {
      return;
    }

    const url = `${BASE_URL}&query=${query}`;
    setLoading(true);
    setSearchPerformed(true);

    try {
      const response = await fetch(url);
      const data: MovieResponse = await response.json();
      const filteredAndSortedMovies = filterAndSortMovies(data.results);
      setMovies(filteredAndSortedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Running in build mode generates a warning: "React Hook useEffect has a missing dependency: 'fetchMoviesData'".
  // So we need to include fetchMoviesData in the dependency array of this useEffect hook. However, simply adding it
  // to the array will cause an infinite loop, as fetchMoviesData is recreated on every render. The solution is to
  // wrap the fetchMoviesData function above with useCallback to memoize it. Now it will only trigger a re-fetch
  // when the query changes, which is the desired behaviour.
  useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData]);

  const filterAndSortMovies = (results: Movie[]): Movie[] => {
    // TMDB only gives us 20 results, annoyingly, but we still want to filter out the ones without images
    // because that looks rubbish in the display
    const resultsWithImages = results.filter(
      (result) =>
        result.poster_path !== null && result.vote_count > MIN_VOTE_COUNT
    );

    // Sort the remaining movies by rating score
    const sortedResults = resultsWithImages.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    return sortedResults;
  };

  // Conditional rendering - show a loading spinner while we're waiting for the movie data
  if (loading) {
    return (
      <div className='flex justify-center items-center h-32'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700'></div>
      </div>
    );
  }

  // Did we get at least one result?
  const resultsObtained: boolean = movies.length > 0;

  // Finished fetching the movie data so we can now display properly
  return (
    <section className='flex-grow'>
      <SearchInputForm setQuery={setQuery} defaultInput={query} />
      {resultsObtained ? (
        <div>
          <MovieSearchResults movies={movies} />
          <TMDBAttribution />
        </div>
      ) : (
        <h2
          className={`${theme.text.highContrast} text-2xl my-12 px-4 text-center`}
        >
          {searchPerformed && 'Meep! No results found!'}
        </h2>
      )}
    </section>
  );
};

export default MoviesContainer;
