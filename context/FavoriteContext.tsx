import {
    addFavoriteMovie,
    getFavoriteMovies,
    isFavoriteMovie,
    removeFavoriteMovies,
} from "@/services/storage";
import {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoriteMoviesProvider = ({ children }: FavoriteProviderProps) => {
  const [favorites, setFavoritesList] = useState<Movie[] | []>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const favorites = await getFavoriteMovies();

      setFavoritesList(favorites);
    };

    loadFavorites();
  }, []);

  const addFavorite = useCallback(async (movie: Movie) => {
    if (await isFavorite(movie.id)) return;

    const update = await addFavoriteMovie(movie);
    setFavoritesList(update);
  }, []);

  const removeFavorite = useCallback(async (movieId: Movie["id"]) => {
    if (!(await isFavorite(movieId))) return;

    const update = await removeFavoriteMovies(movieId);
    setFavoritesList(update);
  }, []);

  const isFavorite = useCallback(
    async (movieId: Movie["id"]): Promise<boolean> => {
      return await isFavoriteMovie(movieId);
    },
    [],
  );

  const contexValue = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favorites, addFavorite, removeFavorite, isFavorite],
  );

  return (
    <FavoriteContext.Provider value={contexValue}>
      {children}
    </FavoriteContext.Provider>
  );
};
