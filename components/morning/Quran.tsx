import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  useColorScheme,
  Button,
} from "react-native";

export default function Quran() {
  const [quran, setQuran] = useState(JSON.parse("null"));
  const { width, height } = Dimensions.get("window");
  const vw = width / 100;
  const vh = height / 100;
  const cS = useColorScheme();
  const openUrl = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  const randomNumber = () => Math.floor(Math.random() * 6236) + 1;
  const getQuran = async () => {
    try {
      const response = await fetch(
        `http://api.alquran.cloud/v1/ayah/${randomNumber()}`
      );
      const data = await response.json();
      setQuran(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuran();
  }, []);

  return (
    <View
      style={{
        marginTop: "1%",
        borderColor: cS === "dark" ? "gray" : "black",
        borderRadius: 5,
        borderWidth: 2,
        justifyContent: "space-between",
      }}
    >
      <View>
        <View
          style={{
            backgroundColor: "#3438fe",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              color: cS === "dark" ? "white" : "black",
              fontSize: 20,
              textDecorationLine: "underline",
            }}
          >
            Quran
          </Text>
          <View
            style={{
              position: "absolute",
              right: 20,
            }}
          >
            <TouchableOpacity onPress={() => getQuran()}>
              <Text
                style={{
                  color: cS === "dark" ? "white" : "black",
                  borderWidth: 1,
                  paddingHorizontal: 2,
                }}
              >
                New Ayah
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              left: 20,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                openUrl(
                  `https://www.quran.com/ar/${quran?.data?.surah?.number}/${quran?.data?.numberInSurah}`
                )
              }
            >
              <Text
                style={{
                  color: cS === "dark" ? "white" : "black",
                  borderWidth: 1,
                  paddingHorizontal: 2,
                }}
              >
                Full Surah
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ backgroundColor: cS === "dark" ? "black" : "white" }}>
          <View style={{ padding: 10 }}>
            <Text style={{ color: cS === "dark" ? "white" : "black" }}>
              {quran?.data?.text}
            </Text>
            <Text style={{ color: cS === "dark" ? "white" : "black" }}>
              {quran?.data?.surah?.name}: ايه {quran?.data?.numberInSurah}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
