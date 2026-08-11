import UserProvider from "@/context/UserContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./globals.css";

export default function RootLayout() {
  return (
    <UserProvider>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />

        <Stack.Screen
          name="profile/editProfile"
          options={{
            title: "Edit Profile",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#030014",
            },

            headerTintColor: "#fff",
          }}
        />

        <Stack.Screen
          name="profile/settings"
          options={{
            title: "Settings",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#030014",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack>
    </UserProvider>
  );
}
