import InputField from "@/components/inputField";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignIn() {
  const navigation = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginError, setloginError] = useState("");

  function onChangeEmail(text: string) {
    const trimmedText = text.trim();

    if (!trimmedText) {
      setEmailError("No email entered");
      setEmail(trimmedText);
      return;
    }

    if (!trimmedText.includes("@")) {
      setEmailError("No @ in email");
      setEmail(trimmedText);
      return;
    }

    setEmailError(""); // Clear errors
    setEmail(trimmedText);
  }

  function onChangePassword(text: string) {
    const trimmedPassword = text.trim();

    if (!trimmedPassword) {
      setPasswordError("No password entered");
      setPassword(trimmedPassword);
      return;
    }

    if (trimmedPassword.length < 6) {
      setPasswordError("Password is less than 6 characters");
      setPassword(trimmedPassword);
      return;
    }

    setPasswordError(""); // Clear errors
    setPassword(trimmedPassword);
  }

  function onLogin() {
    if (emailError) console.log("Could not sign in. Email error");
    if (passwordError) console.log("Could not sign in. password error");

    if (!emailError && !passwordError) {
      console.log("logging in");

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          if (user) navigation.navigate("/(tabs)");
          console.log("user signed in", user);
        })
        .catch((error) => {
          console.log("login error", error);
          const errorCode = error.code;
          let friendlyErrorMessage = "";

          if (errorCode === "auth/invalid-credential") {
            friendlyErrorMessage = "Invalid email or password.";
          }

          const errorMessage = friendlyErrorMessage || error.message;

          if (errorMessage) setloginError(errorMessage);
        });
    }
  }

  return (
    <View style={styles.parent}>
      <View style={styles.inputContainer}>
        <View>
          <ThemedText>Email</ThemedText>
          <InputField value={email} onChangeText={onChangeEmail} />
          {emailError ? (
            <ThemedText darkColor="red" lightColor="red">
              {emailError}
            </ThemedText>
          ) : null}
        </View>

        <View>
          <ThemedText>Password</ThemedText>
          <InputField
            value={password}
            onChangeText={onChangePassword}
            textContentType="password"
            secureTextEntry={true}
          />
          {passwordError ? (
            <ThemedText darkColor="red" lightColor="red">
              {passwordError}
            </ThemedText>
          ) : null}
        </View>

        {loginError ? (
          <ThemedText darkColor="red" lightColor="red">
            {loginError}
          </ThemedText>
        ) : null}
        <Button onPressIn={onLogin}>Login</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: { justifyContent: "center", alignItems: "center", flex: 1 },
  inputContainer: {
    flexDirection: "column",
    width: 400,
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "white",
  },
});
