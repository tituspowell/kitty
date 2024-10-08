// Types specific to the Movies mini-app

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  overview: string;
}

export interface MovieResponse {
  results: Movie[];
}
