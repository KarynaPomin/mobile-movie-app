import { icons } from "@/constants/icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

const ProfileImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };
  return (
    <View className="size-44 items-center justify-center rounded-full border-[5px] border-accent">
      <TouchableOpacity
        onPress={openImagePicker}
        className="size-36 items-center justify-center rounded-full border-2 border-white"
      >
        <Image
          source={selectedImage ? { uri: selectedImage } : icons.person}
          className={selectedImage ? "size-36 rounded-full" : "size-10"}
          tintColor={selectedImage ? undefined : "#fff"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImagePicker;
