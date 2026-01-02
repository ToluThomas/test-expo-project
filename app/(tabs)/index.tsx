import { Image } from "expo-image";
import { FlatList, StyleSheet, Text } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";

export default function HomeScreen() {
  const data = [
    { id: 1, title: "Item" },
    { id: 2, title: "Item" },
    { id: 3, title: "Item" },
    { id: 4, title: "Item" },
    { id: 5, title: "Item" },
    { id: 6, title: "Item" },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={{ uri: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" }}
          style={styles.reactLogo}
        />
      }
    >
      {/* <ScrollView style={{ backgroundColor: "white", height: 50 }}> */}
      {/* <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text> */}

      {/* <TouchableOpacity
          onPress={() => {
            console.log("abiodun is watching you press the button");
          }}
          style={styles.button}
        >
          Press me
        </TouchableOpacity> */}
      {/* </ScrollView> */}
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Text style={styles.text}>{item.title + " " + index}</Text>
        )}
        style={{ backgroundColor: "white", height: 50 }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  text: { color: "red" },
  button: { width: 100, height: 100, backgroundColor: "red" },
  step3: {
    marginTop: 200,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 50,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
