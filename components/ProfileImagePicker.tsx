import { icons } from "@/constants/icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface ProfileImagePickerProps {
  form: User;
  setForm: React.Dispatch<React.SetStateAction<User>>;
  setIfChangedForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileImagePicker = ({
  form,
  setForm,
  setIfChangedForm,
}: ProfileImagePickerProps) => {
  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setForm((prev) => ({
        ...prev,
        avatar: uri,
      }));

      setIfChangedForm(true);
    }
  };

  return (
    <View className="size-44 items-center justify-center rounded-full border-[5px] border-accent">
      <TouchableOpacity
        onPress={openImagePicker}
        className="size-36 items-center justify-center rounded-full border-2 border-white"
      >
        <Image
          source={form?.avatar ? { uri: form?.avatar } : icons.person}
          className={form?.avatar ? "size-36 rounded-full" : "size-10"}
          tintColor={form?.avatar ? undefined : "#fff"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImagePicker;
