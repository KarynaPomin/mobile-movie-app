import { icons } from "@/constants/icons";
import { useUser } from "@/context/useUser";
import formatDate from "@/types/dateFormatter";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const profile = () => {
  const { user } = useUser();

  return (
    <View className="bg-primary flex-1 px-10">
      <Text className="mt-20 mb-5 mx-auto text-lg text-white font-bold mb-3">
        Profile
      </Text>

      <View className="w-full flex-1 flex-col items-center justify-start mt-10 gap-5">
        <View className="size-44 items-center justify-center rounded-full border-[5px] border-accent">
          <View className="size-36 items-center justify-center rounded-full border-2 border-white">
            <Image
              source={user?.avatar ? { uri: user?.avatar } : icons.person}
              className={user?.avatar ? "size-36 rounded-full" : "size-10"}
              tintColor={user?.avatar ? undefined : "#fff"}
            />
          </View>
        </View>
        <Text className="text-white text-lg">
          {user?.full_name ? user?.full_name : "User name"}
        </Text>

        <View className="w-10/12 gap-3">
          <View className="flex flex-row gap-3 bg-secondary text-white border-[0.5px] border-accent rounded-lg w-full placeholder:text-light-100 p-4">
            <Text className=" text-light-100 ">Birthday</Text>
            <Text className=" text-light-200">
              {user?.birth_date ? formatDate(user?.birth_date) : "unknown"}
            </Text>
          </View>

          <View className="flex flex-row bg-secondary text-white border-[0.5px] border-accent rounded-lg w-full placeholder:text-light-100 p-4">
            <Text className=" text-light-100 mr-3">Location</Text>
            <Text className=" text-light-200">
              {user?.country ? user?.country?.names?.official : "unknown"}
            </Text>
          </View>
        </View>

        <View className="mt-10 w-full gap-4">
          <TouchableOpacity
            className="h-20 w-full flex-row items-center rounded-2xl bg-dark-100 px-4"
            onPress={() => router.push("/profile/editProfile")}
          >
            <View className="size-12 items-center justify-center rounded-full bg-accent">
              <Image
                source={icons.person}
                className="size-6"
                tintColor="#fff"
              />
            </View>

            <Text className="ml-5 flex-1 text-base font-semibold text-white">
              Edit profile
            </Text>

            <Image
              source={icons.arrow}
              className="size-5 rotate-180"
              tintColor="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="h-20 w-full flex-row items-center rounded-2xl bg-dark-100 px-4"
            onPress={() => router.push("/(tabs)/saved")}
          >
            <View className="size-12 items-center justify-center rounded-full bg-accent">
              <Image source={icons.save} className="size-6" tintColor="#fff" />
            </View>

            <Text
              className="ml-5 flex-1 text-base font-semibold text-white"
              onPress={() => router.push("/(tabs)/saved")}
            >
              Saved movies
            </Text>

            <Image
              source={icons.arrow}
              className="size-5 rotate-180"
              tintColor="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="h-20 w-full flex-row items-center rounded-2xl bg-dark-100 px-4"
            onPress={() => router.push("/profile/settings")}
          >
            <View className="size-12 items-center justify-center rounded-full bg-accent">
              <Image
                source={icons.setting}
                className="size-6"
                tintColor="#fff"
              />
            </View>

            <Text className="ml-5 flex-1 text-base font-semibold text-white">
              Settings
            </Text>

            <Image
              source={icons.arrow}
              className="size-5 rotate-180"
              tintColor="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default profile;
