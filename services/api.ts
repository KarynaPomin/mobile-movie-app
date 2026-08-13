export const TMBD_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMBD_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMBD_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMBD_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string,
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMBD_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMBD_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMBD_CONFIG.headers,
      },
    );

    if (!response.ok) throw new Error("Failed to fetch movie details");

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface RestCountriesErrorPayload {
  errors?: { message: string }[];
}
const RESTCOUNTRIES_BASE_URL = "https://api.restcountries.com/countries/v5";
const RESTCOUNTRIES_API_KEY = process.env.EXPO_PUBLIC_RESTCOUNTRIES_API_KEY;

export const fetchCountries = async (query?: string): Promise<Country[]> => {
  if (!RESTCOUNTRIES_API_KEY) {
    throw new Error(
      "Missing EXPO_PUBLIC_RESTCOUNTRIES_API_KEY — set it in your .env file.",
    );
  }

  const params = new URLSearchParams({
    response_fields:
      "names.common,names.official,codes.alpha_2,region,subregion",
    limit: "20",
  });

  if (query) params.set("q", query);

  const response = await fetch(
    `${RESTCOUNTRIES_BASE_URL}?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${RESTCOUNTRIES_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    const payload: RestCountriesErrorPayload = await response
      .json()
      .catch(() => ({}));
    const message = payload.errors?.[0]?.message ?? response.statusText;

    if (response.status === 404) {
      return [];
    }

    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }

  const data = await response.json();

  return Array.isArray(data.data?.objects) ? data.data.objects : [];
};
