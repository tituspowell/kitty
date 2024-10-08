'use client';

import { Movie, MovieResponse } from '../types';
import React, { useEffect, useState } from 'react';
import SearchInputForm from './SearchInputForm';
import MovieSearchResults from './MovieSearchResults';

// TMDB has a Search API and a Discovery API. The Search API has a fixed number of results (20) unless implementing
// pagination, which would be overkill for this mini-app. The Discovery API supports parameters for sorting and increasing
// the number of results, but depends on a category ID rather than a search term, so not something we can use here.
const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
const MIN_VOTE_COUNT = 10;

const MoviesContainer = () => {
  const [query, setQuery] = useState<string>('cat');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const filterResults = (results: Movie[]): Movie[] => {
    console.log(results.length);

    // Filter out the ones without images because that looks rubbish in the display
    const resultsWithImages = results.filter(
      (result) =>
        result.poster_path !== null && result.vote_count > MIN_VOTE_COUNT
    );

    const sortedResults = resultsWithImages.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    return sortedResults;
  };

  const fetchMoviesData = async () => {
    const url = `${BASE_URL}&query=${query}`;
    setLoading(true);

    try {
      console.log(url);

      const response = await fetch(url);
      const data: MovieResponse = await response.json();
      const filteredResults = filterResults(data.results);
      setMovies(filteredResults);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesData();
  }, [query]);

  if (loading) {
    // Server-side rendering and we don't have access to localStorage, so show a loading spinner
    return (
      <div className='flex justify-center items-center h-32'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700'></div>
      </div>
    );
  }

  return (
    <section>
      <SearchInputForm setQuery={setQuery} />
      <MovieSearchResults movies={movies} />
    </section>
  );
};
export default MoviesContainer;
