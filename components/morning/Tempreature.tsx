import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default function Temperature() {
  const [weather, setWeather] = useState(JSON.parse("null"));
  const [time, setTime] = useState(Number);
  const { width, height } = Dimensions.get("window");
  const [location, setLocation] = useState({});
  const vw = width / 100;
  const vh = height / 100;
  const Weather_Key = "af95b5582bf544c0a64181401240406";
  const cS = useColorScheme();

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let result = await Location.getCurrentPositionAsync({});
      const { coords } = result;
      setLocation(coords);
      getWeather(coords);
    } catch (error) {
      console.log(error);
    }
  };

  const storeWeather = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("my-weather", jsonValue);
      await AsyncStorage.setItem("time", Date.now().toString());
    } catch (e) {
      console.log(e);
    }
  };
  const getWeatherLocal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-weather");
      setWeather(jsonValue != null ? JSON.parse(jsonValue) : null);
      const timestored = await AsyncStorage.getItem("time");
      setTime(Number(timestored));
    } catch (e) {
      console.log(e);
    }
  };

  const getWeather = async (loc: any) => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${Weather_Key}&q=${loc?.latitude},${loc?.longitude}&aqi=no`
      );
      const data = await response.json();
      if (data) {
        setWeather(data);
        storeWeather(data);
        setTime(Date.now());
      } else {
        getWeatherLocal();
      }
    } catch (error) {
      console.log(error);
      getWeatherLocal();
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={{}}>
      {weather ? (
        <View
          style={{
            backgroundColor: cS === "dark" ? "black" : "white",
            borderWidth: 2,
            borderRadius: 5, // Optional: To give rounded corners to the box
            minHeight: 20 * vh,
            borderColor: cS === "dark" ? "gray" : "black",
          }}
        >
          <View style={{ backgroundColor: "#ff4242", paddingVertical: 10 }}>
            <Text
              style={{
                color: cS === "dark" ? "white" : "black",
                alignSelf: "center",
                textDecorationLine: "underline",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Temperature Status
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 40,
            }}
          >
            <Text style={{ color: cS === "dark" ? "white" : "black" }}>
              Degree: {weather?.current?.temp_c} °C
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: cS === "dark" ? "white" : "black" }}>
                {weather?.current?.condition?.text}
              </Text>
              <Image
                source={{ uri: `https:${weather?.current?.condition?.icon}` }}
                style={{ width: 64, height: 64 }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 40,
            }}
          >
            <Text style={{ color: cS === "dark" ? "white" : "black" }}>
              City: {weather.location?.name}
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => getWeather(location)}
            >
              <Text style={{ color: cS === "dark" ? "white" : "black" }}>
                Updated:{" "}
                {time
                  ? new Date(time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : null}
                <Ionicons
                  name="reload-circle-outline"
                  size={15}
                  color={cS === "dark" ? "white" : "black"}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>Loading weather...</Text>
      )}
    </View>
  );
}
