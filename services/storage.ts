import AsyncStorage from "@react-native-async-storage/async-storage";
const PROFILE_KEY = "user_profile";
const FAVORITES_KEY = "favorites_movies";

export async function saveProfile(profile: User) {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.log("Error saving data: ", error);
  }
}

export async function getProfile() {
  try {
    const jsonValue = await AsyncStorage.getItem(PROFILE_KEY);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("Error geting data: ", error);
  }
}

async function getFavoritesInternal(): Promise<Movie[]> {
  const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);

  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

export async function getFavoriteMovies(): Promise<Movie[]> {
  try {
    return await getFavoritesInternal();
  } catch (error) {
    console.log("Error getting favorite movies: ", error);
    return [];
  }
}

export async function addFavoriteMovie(movie: Movie): Promise<Movie[]> {
  try {
    const current = await getFavoritesInternal();

    if (current.some((m) => m.id === movie.id)) return current;

    const update = [...current, movie];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(update));
    return update;
  } catch (error) {
    console.log("Error saving favorite movie: ", error);
    return await getFavoriteMovies();
  }
}

export async function removeFavoriteMovies(
  movieId: Movie["id"],
): Promise<Movie[]> {
  try {
    const current = await getFavoritesInternal();
    const update = current.filter((m) => m.id !== movieId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(update));

    return update;
  } catch (error) {
    console.log("Error removing favorite movie: ", error);
    return await getFavoriteMovies();
  }
}

export async function isFavoriteMovie(movieId: Movie["id"]): Promise<boolean> {
  const current = await getFavoriteMovies();
  return current.some((m) => m.id === movieId);
}
