'use client';

import { Movie, MovieResponse } from '../types';
import React, { useEffect, useState } from 'react';
import SearchInputForm from './SearchInputForm';
import MovieSearchResults from './MovieSearchResults';

const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
const ADDITIONAL_QUERY_PARAMS = '&sort_by=vote_average.desc&vote_count.gte=100';
const NUM_RESULTS_TO_DISPLAY = 10;

const MoviesContainer = () => {
  const [query, setQuery] = useState<string>('cat');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMoviesData = async () => {
    if (!query) {
      console.log('Tried to fetch with null query!');
      return;
    }

    const url = `${BASE_URL}&query=${query}${ADDITIONAL_QUERY_PARAMS}`;
    setLoading(true);

    try {
      console.log(url);

      const response = await fetch(url);
      const data: MovieResponse = await response.json();
      console.log(data.results.slice(0, NUM_RESULTS_TO_DISPLAY));

      setMovies(data.results.slice(0, NUM_RESULTS_TO_DISPLAY));
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Fetching data for query: ', query);

    fetchMoviesData();
  }, [query]);

  return (
    <section>
      <SearchInputForm setQuery={setQuery} />
      <MovieSearchResults movies={movies} />
    </section>
  );
};
export default MoviesContainer;
