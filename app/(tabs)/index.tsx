import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Link, useRouter } from "expo-router";

export default function HomeScreen() {
  const navigation = useRouter();
  const data = [
    { id: 1, title: "Item" },
    { id: 2, title: "Item" },
    { id: 3, title: "Item" },
    { id: 4, title: "Item" },
    { id: 5, title: "Item" },
    { id: 6, title: "Item" },
  ];

  function navigateToScreen() {
    navigation.navigate("/nested/2");
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Link href="/some-route">Some new route</Link>}
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
      <TouchableOpacity
        style={{ backgroundColor: "white", padding: 16 }}
        onPress={navigateToScreen}
      >
        <Text>Navigate</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View style={styles.textContainer}>
            <View
              style={{
                height: "100%",
                width: "25%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>{item.title + " " + index}</Text>
            </View>
          </View>
        )}
        style={styles.flatList}
        contentContainerStyle={{ gap: 16 }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    // flexDirection: "row", // "row" is horizontal, "column" is vertical
    // justifyContent: "center", // same orientation as flexDirection
    // alignItems: "flex-start", // opposite orientation from flexDirection

    height: 100,
    borderWidth: 1,
    // paddingLeft: 16,
  },
  text: {
    color: "red",
    borderColor: "red",
  },
  flatList: {
    backgroundColor: "white",
    height: 500,
    padding: 16,
  },
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
