import InputField from "@/components/inputField";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { firebaseConfig } from "../firebaseConfig";

export default function Register() {
  initializeApp(firebaseConfig);
  const navigation = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [signUpError, setSignUpError] = useState("");

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

  function onChangeConfirmPassword(text: string) {
    const trimmedPassword = text.trim();

    if (!trimmedPassword) {
      setConfirmPasswordError("No confirm password entered");
      setConfirmPassword(trimmedPassword);
      return;
    }

    if (trimmedPassword.length < 6) {
      setConfirmPasswordError("Confirm password is less than 6 characters");
      setConfirmPassword(trimmedPassword);
      return;
    }

    if (trimmedPassword !== password) {
      setConfirmPasswordError("Password and confirm password are not the same");
      setConfirmPassword(trimmedPassword);
      return;
    }

    setConfirmPasswordError(""); // Clear errors
    setConfirmPassword(trimmedPassword);
  }

  function onSignUp() {
    if (emailError) console.log("Could not sign up. Email error");
    if (passwordError) console.log("Could not sign up. password error");

    if (!emailError && !passwordError && !confirmPasswordError) {
      console.log("signing up");

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          if (user) navigation.navigate("/(tabs)");
          console.log("user signed up", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          let friendlyErrorMessage = "";

          if (errorCode === "auth/email-already-in-use") {
            friendlyErrorMessage = "User already exists. Please login.";
          }

          if (friendlyErrorMessage) setSignUpError(friendlyErrorMessage);
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

        <View>
          <ThemedText>Confirm Password</ThemedText>
          <InputField
            value={confirmPassword}
            onChangeText={onChangeConfirmPassword}
            textContentType="password"
            secureTextEntry={true}
          />
          {confirmPasswordError ? (
            <ThemedText darkColor="red" lightColor="red">
              {confirmPasswordError}
            </ThemedText>
          ) : null}
        </View>

        {signUpError ? (
          <ThemedText darkColor="red" lightColor="red">
            {signUpError}
          </ThemedText>
        ) : null}
        <Button onPressIn={onSignUp}>Sign Up</Button>
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
