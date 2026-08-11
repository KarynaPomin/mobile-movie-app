import AsyncStorage from "@react-native-async-storage/async-storage";
const PROFILE_KEY = "user_profile";

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
    console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("Error geting data: ", error);
  }
}
