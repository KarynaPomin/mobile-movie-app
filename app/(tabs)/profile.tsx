import ProfileImagePicker from "@/components/ProfileImagePicker";
import { icons } from "@/constants/icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const profile = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <Text className="mt-20 mb-5 mx-auto text-lg text-white font-bold mb-3">
        Profile
      </Text>

      <View className="w-full flex-1 flex-col items-center justify-start mt-10 gap-5">
        <ProfileImagePicker />
        <Text className="text-white text-lg">User name</Text>

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
