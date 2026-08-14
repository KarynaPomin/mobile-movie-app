interface User {
  full_name: string;
  avatar: string | null;
  birth_date: Date | null;
  country: Country | null;
}

interface UserContextType {
  user: User | null;
  setUserInfo: (user: User) => void;
}

interface FavoritesContextType {
  favorites: Movie[];
  loading: boolean;
  addFavorite: (movie: Movie) => Promise<void>;
  removeFavorite: (movieId: Movie["id"]) => Promise<void>;
  isFavorite: (movieId: Movie["id"]) => Promise<boolean>;
}
