import ProfileImagePicker from "@/components/ProfileImagePicker";
import { useUser } from "@/context/useUser";
import { getProfile } from "@/services/storage";
import formatDate from "@/types/dateFormatter";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const editProfile = () => {
  const router = useRouter();

  const { user, setUserInfo } = useUser();

  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [form, setForm] = useState<User>({
    full_name: user?.full_name || "",
    avatar: user?.avatar || null,
    birth_date: user?.birth_date || null,
    location: user?.location || null,
  });

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getProfile();

      if (profile) {
        setForm(profile);
      }

      loadProfile();
    };
  }, []);

  const handleSaveProfile = async () => {
    if (!form) return;

    try {
      await setUserInfo(form);
      console.log(form);

      router.back();
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  return (
    <View className="bg-primary flex-1 px-10 flex justify-start items-center pt-10">
      <ProfileImagePicker form={form} setForm={setForm} />

      <View className="flex flex-col items-end w-11/12">
        <Text className="text-left w-11/12 mt-10 mb-5 mx-auto text-lg text-white font-bold ">
          Full Name
        </Text>

        <TextInput
          placeholder={form.full_name ? form.full_name : "Caleb Summers"}
          value={form.full_name}
          onChangeText={(text) =>
            setForm((prev) => ({
              ...prev,
              full_name: text,
            }))
          }
          className="bg-secondary text-white border-[0.5px] border-accent rounded-lg w-full placeholder:text-light-100 p-4"
        />
      </View>

      <View className="flex flex-col items-end w-11/12">
        <Text className="text-left w-11/12 mt-10 mb-5 mx-auto text-lg text-white font-bold ">
          Date of Birth
        </Text>

        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          className="bg-secondary text-white border-[0.5px] border-accent rounded-lg w-full placeholder:text-light-100 p-4"
        >
          <Text className="text-light-100 ">
            {formatDate(form.birth_date ?? new Date())}
          </Text>
          {showPicker && (
            <DateTimePicker
              value={new Date(form.birth_date ?? new Date())}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowPicker(false);

                if (selectedDate)
                  setForm((prev) => ({
                    ...prev,
                    birth_date: new Date(selectedDate),
                  }));
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View className="flex flex-col items-end w-11/12">
        <Text className="text-left w-11/12 mt-10 mb-5 mx-auto text-lg text-white font-bold ">
          Location
        </Text>

        <TextInput
          placeholder={form.location ? form.location : "Ukraine, Kyiv"}
          value={form?.location ?? ""}
          onChangeText={(text) =>
            setForm((prev) => ({
              ...prev,
              location: text,
            }))
          }
          className="bg-secondary text-white border-[0.5px] border-accent rounded-lg w-full placeholder:text-light-100 p-4"
        />
      </View>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-ld py-3.5 flex flex-row items-center justify-center z-50"
        onPress={handleSaveProfile}
      >
        <Text className="text-white font-semibold text-base">Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default editProfile;
