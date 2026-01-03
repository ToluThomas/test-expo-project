import { ThemedText } from "@/components/themed-text";
import { useLocalSearchParams } from "expo-router";

export default function ShowNumber() {
  const params = useLocalSearchParams();
  const textToShow = `You tried to navigate to ${params.itemId}`;
  return <ThemedText>{textToShow}</ThemedText>;
}
