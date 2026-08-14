import { icons } from "@/constants/icons";
import { useFavorite } from "@/context/useFavorite";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>

    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

function toMovie(details: MovieDetails): Movie {
  return {
    id: details.id,
    title: details.title,
    adult: details.adult,
    backdrop_path: details.backdrop_path ?? "",
    genre_ids: details.genres.map((g) => g.id),
    original_language: details.original_language,
    original_title: details.original_title,
    overview: details.overview,
    popularity: details.popularity,
    poster_path: details.poster_path ?? "",
    release_date: details.release_date,
    video: details.video,
    vote_average: details.vote_average,
    vote_count: details.vote_count,
  };
}

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movieDetails, loading } = useFetch(() =>
    fetchMovieDetails(id as string),
  );

  const { favorites, isFavorite, addFavorite, removeFavorite } = useFavorite();

  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => setIsFavorited(await isFavorite(Number(id)));

    load();
  }, [id, isFavorite]);

  const handleToggleFavorite = async () => {
    if (!movieDetails) return;
    const movie = toMovie(movieDetails);

    if (isFavorited) {
      await removeFavorite(movie.id);
      setIsFavorited(false);
    } else {
      await addFavorite(movie);
      setIsFavorited(true);
    }
  };

  return (
    <View className="bg-primary flex-1 ">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://images.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
            }}
            className="w-full h-[550px]"
          />

          <View className="pl-7 pr-7 pt-5 pb-5">
            <View className="flex flex-row justify-around ">
              <Text className="text-white font-bold text-xl">
                {movieDetails?.title}
              </Text>
              <TouchableOpacity onPress={handleToggleFavorite}>
                {isFavorited ? (
                  <Image
                    source={icons.bookmark}
                    className="size-7"
                    tintColor="#fc0137"
                  />
                ) : (
                  <Image
                    source={icons.save}
                    className="size-7"
                    tintColor="#fff"
                  />
                )}
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-200 text-sm">
                {movieDetails?.release_date?.split("-")[0]}
              </Text>

              <Text className="text-light-200 text-sm">
                {movieDetails?.runtime}m
              </Text>
            </View>

            <View className="fles-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image
                source={icons.star}
                className="size-4"
                tintColor={"#FAD643"}
              />
              <Text className="text-white font-bold text-sm">
                {Math.round(movieDetails?.vote_average ?? 0)}/10
              </Text>

              <Text className="text-light-200 text-sm">
                ({movieDetails?.vote_count} votes)
              </Text>
            </View>
            <MovieInfo label="Overview" value={movieDetails?.overview} />
            <MovieInfo
              label="Genres"
              value={
                movieDetails?.genres?.map((g) => g.name).join(" - ") || "N/A"
              }
            />

            <View className="flex flex-row justify-between w-1/2">
              <MovieInfo
                label="Budget"
                value={`$${(movieDetails?.budget ?? 0) / 1_000_000} milion`}
              />
              <MovieInfo
                label="Revenue"
                value={`$${Math.round((movieDetails?.revenue ?? 0) / 1_000_000)}`}
              />
            </View>

            <MovieInfo
              label="Productoin Companies"
              value={
                movieDetails?.production_companies
                  .map((c) => c.name)
                  .join(" - ") || "N/A"
              }
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-ld py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5"
          tintColor="#fff"
        />

        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
