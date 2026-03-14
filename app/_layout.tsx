import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { firebaseConfig } from "@/firebaseConfig";
import { useAppSelector } from "@/hooks/hooks";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { isUserLoggedIn } from "@/redux/userSlice";
import { store } from "@/store";
import { initializeApp } from "firebase/app";
import { Provider } from "react-redux";

export const firebaseApp = initializeApp(firebaseConfig);

function App() {
  const colorScheme = useColorScheme();
  const isLoggedIn = useAppSelector(isUserLoggedIn);
  console.log("is logged in from root layout", isLoggedIn);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="signedIn" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="index" options={{ title: "Sign In" }} />
          <Stack.Screen name="signUp" options={{ title: "Sign Up" }} />
        </Stack.Protected>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
