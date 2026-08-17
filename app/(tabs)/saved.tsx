import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFavorite } from "@/context/useFavorite";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const saved = () => {
  const { favorites: movies, loading } = useFavorite();

  return (
    <View className="bg-primary flex-1 ">
      <Image source={images.bg} className="absolute w-full z-0" />

      <Image source={icons.logo} className="w-20 h-20 mt-20 mb-5 mx-auto" />
      <Text className="text-lg text-white font-bold mt-5 mb-3 px-5">
        Favorites Movies
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000FF"
          className="mt-10 self-center"
        />
      ) : (
        <View className="pb-10 px-5">
          {movies ? (
            <View>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                contentContainerStyle={{ paddingBottom: 300 }}
                className="mt-2 pb-32"
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                No favorites movies found
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default saved;
