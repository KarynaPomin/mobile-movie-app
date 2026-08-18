import ProfileImagePicker from "@/components/ProfileImagePicker";
import { useUser } from "@/context/useUser";
import { fetchCountries } from "@/services/api";
import { getProfile } from "@/services/storage";
import useFetch from "@/services/useFetch";
import formatDate from "@/types/dateFormatter";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const editProfile = () => {
  const router = useRouter();

  const { user, setUserInfo } = useUser();

  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [form, setForm] = useState<User>({
    full_name: user?.full_name || "",
    avatar: user?.avatar || null,
    birth_date: user?.birth_date || null,
    country: user?.country || null,
  });

  const [ifChangedForm, setIfChangedForm] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");

  const {
    data: countries,
    loading: loading,
    error: error,
    refetch: loadCountries,
    reset,
  } = useFetch(() => fetchCountries(countryQuery));

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getProfile();

      if (profile) {
        setForm(profile);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    if (error) console.log("useFetch error:", error);
  }, [error]);

  useEffect(() => {
    if (!expanded) return;

    const timeout = setTimeout(() => {
      loadCountries();
    }, 300);

    return () => clearTimeout(timeout);
  }, [expanded, countryQuery]);

  const handleSaveProfile = async () => {
    if (!form) return;

    try {
      await setUserInfo(form);

      setIfChangedForm(false);
      router.back();
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  return (
    <View className="bg-primary flex-1 px-10 flex justify-start items-center pt-10">
      <ProfileImagePicker
        form={form}
        setForm={setForm}
        setIfChangedForm={setIfChangedForm}
      />

      <View className="flex flex-col items-end w-11/12">
        <Text className="text-left w-11/12 mt-10 mb-5 mx-auto text-lg text-white font-bold ">
          Full Name
        </Text>

        <TextInput
          placeholder={form.full_name ? form.full_name : "Caleb Summers"}
          value={form.full_name}
          onChangeText={(text) => {
            setForm((prev) => ({
              ...prev,
              full_name: text,
            }));

            setIfChangedForm(true);
          }}
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

                setIfChangedForm(true);
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View className="flex flex-col items-end w-11/12">
        <Text className="text-left w-11/12 mt-10 mb-5 mx-auto text-lg text-white font-bold ">
          Country
        </Text>

        <TouchableOpacity
          onPress={() => setExpanded((prev) => !prev)}
          className="bg-secondary border-[0.5px] border-accent rounded-lg w-full p-4"
        >
          <TextInput
            value={countryQuery}
            placeholder={form.country?.names?.common ?? "Select country"}
            placeholderTextColor="#aaa"
            onFocus={() => setExpanded(true)}
            onChangeText={(text) => {
              setCountryQuery(text);
              setIfChangedForm(true);
            }}
            className="text-white p-4"
          />
        </TouchableOpacity>

        {expanded && (
          <ScrollView
            className="bg-secondary border border-accent rounded-lg w-full mt-2"
            style={{ maxHeight: 140 }}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
          >
            {countries && countries.length > 0 ? (
              countries.map((country: Country, index: number) => (
                <TouchableOpacity
                  key={country.codes.alpha_2}
                  onPress={() => {
                    setForm((prev) => ({
                      ...prev,
                      country: country,
                    }));
                    setCountryQuery(country.names.common);
                    setExpanded(false);
                  }}
                  className={`p-4 ${
                    index !== countries.length - 1
                      ? "border-b border-accent/30"
                      : ""
                  }`}
                >
                  <Text className="text-white">{country.names.common}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-white p-5">Not found</Text>
            )}
          </ScrollView>
        )}
      </View>

      <TouchableOpacity
        className={`${
          ifChangedForm ? "bg-accent" : "bg-dark-100"
        } absolute bottom-5 left-0 right-0 mx-5 rounded-ld py-3.5 flex flex-row items-center justify-center z-50`}
        onPress={handleSaveProfile}
        disabled={!ifChangedForm}
      >
        <Text className="text-white font-semibold text-base">Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default editProfile;
