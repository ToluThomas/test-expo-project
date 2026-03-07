import { StyleSheet, TextInput } from "react-native";

type TInputField = {
  value?: string;
  onChangeText?: (newText: string) => void;
  textContentType?: "password" | "emailAddress";
  secureTextEntry?: boolean;
};

export default function InputField({
  value,
  onChangeText,
  textContentType = "emailAddress",
  secureTextEntry = false,
}: TInputField) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.textInput}
      autoCapitalize="none"
      autoCorrect={false}
      textContentType={textContentType}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  textInput: { width: "100%", height: 24, backgroundColor: "white" },
});
