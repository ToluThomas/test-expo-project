import { Stack } from "expo-router";
import "react-native-reanimated";

import { firebaseConfig } from "@/firebaseConfig";
import { initializeApp } from "firebase/app";

export const firebaseApp = initializeApp(firebaseConfig);

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function LoggedInLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
      <Stack.Screen name="signedIn" options={{ title: "Signed In Screen" }} />
    </Stack>
  );
}
