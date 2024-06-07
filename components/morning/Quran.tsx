import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";

export default function Quran() {
  const [quran, setQuran] = useState(JSON.parse("null"));
  const { width, height } = Dimensions.get("window");
  const vw = width / 100;
  const vh = height / 100;
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
    <View style={{ marginTop: "1%" }}>
      <TouchableOpacity
        onLongPress={() =>
          openUrl(
            `https://www.quran.com/ar/${quran?.data?.surah?.number}/${quran?.data?.numberInSurah}`
          )
        }
        onPress={() => getQuran()}
      >
        <View
          style={{
            borderRadius: 10,
            borderWidth: 2,
            justifyContent: "space-between",
            minHeight: 20 * vh,
          }}
        >
          <View style={{  backgroundColor: "blue", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                textDecorationLine: "underline",
                marginVertical: 5,
              }}
            >
              Quran
            </Text>
            <Text style={{ color: "black", fontSize:10, position: "absolute", right: 20 }}>(Hold)</Text>
          </View>
          <View style={{ padding: 10 }}><Text style={{ color: "black" }}>{quran?.data?.text}</Text>
          <Text style={{ color: "black" }}>
            {quran?.data?.surah?.name}: ايه {quran?.data?.numberInSurah}
          </Text></View>
          
        </View>
      </TouchableOpacity>
    </View>
  );
}
