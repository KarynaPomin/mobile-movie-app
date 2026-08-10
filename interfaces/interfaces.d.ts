interface Movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: numberp[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

interface MovieDetails {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  tagline: string;
  status: string;
  release_date: string;
  runtime: number;
  adult: boolean;

  backdrop_path: string | null;
  poster_path: string | null;

  popularity: number;
  vote_average: number;
  vote_count: number;

  budget: number;
  revenue: number;

  video: boolean;

  genres: {
    id: number;
    name: string;
  }[];

  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];

  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;

  homepage: string | null;
  imdb_id: string | null;
}
