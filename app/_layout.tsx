import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { firebaseConfig } from "@/firebaseConfig";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { initializeApp } from "firebase/app";

export const unstable_settings = {
  initialRouteName: "index",
};

export const firebaseApp = initializeApp(firebaseConfig);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Sign In" }} />
        <Stack.Screen name="signUp" options={{ title: "Sign Up" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen
          name="some-route"
          options={{ title: "Some Route Component" }}
        />
        <Stack.Screen name="nested/[itemId]" options={{ title: "" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
