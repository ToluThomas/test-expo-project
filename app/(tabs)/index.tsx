import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  getTemperatureFromRedux,
  getWeatherConditionFromRedux,
  saveTemperatureToRedux,
  saveWeatherConditionToRedux,
} from "@/redux/weatherSlice";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
// import EncryptedStorage from "react-native-encrypted-storage";

const TEMPERATURE_STORAGE_KEY = "temperature";
const LONGITUDE = "6.438706";
const LATITUDE = "3.522862";
const API_KEY = "1ef25b303c8e3862bfa13549a597954d";
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;

export default function HomeScreen() {
  const navigation = useRouter();
  const dispatch = useAppDispatch();
  const temperatureFromRedux = useAppSelector(getTemperatureFromRedux);
  const weatherFromRedux = useAppSelector(getWeatherConditionFromRedux);

  const [temperature, setTemperature] = useState<string>("");
  const [error, setError] = useState("");

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

  function someFunction() {
    console.log("I ran some function before the browser paints anything");
  }

  async function getWeatherWithFetch() {
    // try {
    //   const response = await fetch(WEATHER_API_URL);

    //   if (!response.ok) {
    //     throw Error("Invalid location");
    //   }

    //   const responseJson = await response.json();
    //   console.log("responseJson", responseJson);

    //   const newTemperature = responseJson?.main?.temp ?? "37";
    //   setTemperature(newTemperature);
    // } catch (error) {
    //   if (error) {
    //     setError(error?.message ?? error);
    //   }
    // } finally {
    //   console.log("We tried to fetch weather");
    // }

    fetch(WEATHER_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw Error("Invalid location");
        }

        return response.json();
      })
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        const newTemperature = responseJson?.main?.temp ?? "37";
        setTemperature(newTemperature);
      })
      .catch((error) => {
        if (error) {
          setError(error?.message ?? error);
        }
      })
      .finally(() => {
        console.log("We tried to fetch weather");
      });
  }

  async function getPersistedTemperature() {
    // return await EncryptedStorage.getItem(TEMPERATURE_STORAGE_KEY);
    return "";
  }

  async function persistTemperature(newTemperature: string) {
    // await EncryptedStorage.setItem(TEMPERATURE_STORAGE_KEY, newTemperature);
  }

  function fetchWithAxios() {
    axios
      .get(WEATHER_API_URL)
      .then(async (response) => {
        const newTemperature = response?.data?.main?.temp ?? "37";
        const newWeatherCondition =
          response?.data?.weather?.description ?? "no data";
        console.log("axios response", response);
        setTemperature(newTemperature);
        // await persistTemperature(String(newTemperature));
        dispatch(saveTemperatureToRedux(newTemperature));
        dispatch(saveWeatherConditionToRedux(newWeatherCondition));
      })
      .catch((error) => {
        if (error) {
          setError(error?.message ?? error);
        }
      })
      .finally(() => {
        console.log("We tried to fetch weather");
      });
  }

  async function updateTemperatureFromStorage() {
    const newTemperature = await getPersistedTemperature();

    if (newTemperature) {
      setTemperature(newTemperature);
    }
  }

  function updateTemperatureFromRedux() {
    console.log("temperatureFromRedux", temperatureFromRedux);
    if (temperatureFromRedux) {
      setTemperature(temperatureFromRedux);
    }
  }

  useLayoutEffect(() => {
    // updateTemperatureFromStorage();
    updateTemperatureFromRedux();
  }, []);

  useLayoutEffect(() => {
    someFunction();
  }, []);

  useEffect(() => {
    // getWeatherWithFetch();
    fetchWithAxios();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Link href="/some-route">Some new route</Link>}
    >
      <Text
        style={{ color: "white", fontSize: 20 }}
      >{`${temperature} °C`}</Text>

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
