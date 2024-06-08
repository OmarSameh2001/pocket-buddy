import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  useColorScheme,
  TouchableOpacity,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export default function MovieScreen() {
  const { poster, title, id } = useLocalSearchParams();
  const Movies_Key =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGIwMzNjMTRlYWQzZGNjNWI1MGI5NmY1Y2RhNDI1NSIsInN1YiI6IjY2NjA4ZWQxNzk5Y2VkYzMzYWYyNjc2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-AopGEMHd18jKlzGbuY0m0KYABiWi85y15C731RUoQ";
  const cS = useColorScheme();
  const [series, setSeries] = useState<any>();

  const getSeries = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${Movies_Key}`,
        },
      }
    );
    const data = await response.json();
    if (data) {
      setSeries(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    getSeries();
  }, []);
  return (
    <ScrollView style={{  marginBottom: 20 }}>
        <View style={{ alignItems: "center" }}>
      <Text
        style={{
          textDecorationLine: "underline",
          color: cS === "dark" ? "white" : "black",
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        {series?.original_name}
      </Text>
      {series?.tagline && (
        <Text
          style={{
            color: cS === "dark" ? "white" : "black",
          }}
        >
          ({series?.tagline})
        </Text>
      )}
      {series?.seasons?.[0]?.air_date && (
        <Text
          style={{
            color: cS === "dark" ? "white" : "black",
            marginVertical: 5,
          }}
        >
          First aired: {series?.seasons?.[0]?.air_date}
        </Text>
      )}
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${poster}`,
        }}
        style={{ width: 200, height: 300, marginBottom: 10 }}
      />

      <Text
        style={{
          color: cS === "dark" ? "white" : "black",
          margin: 15,
        }}
      >
        Description: {"\n"}
        {series?.overview}
      </Text>
      {series?.seasons && <Text style={{ color: cS === "dark" ? "white" : "black" }}>
        Number of Seasons: {series?.seasons?.length}
      </Text>}
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: cS === "dark" ? "white" : "black",
          padding: 5,
          flexDirection: "row",
          gap: 5,
          marginTop: 10 
        }}
        onPress={() =>
          Linking.openURL(`https://www.google.com/search?q=${title}+movie`)
        }
      >
        <AntDesign
          name="google"
          size={24}
          color={cS === "dark" ? "white" : "black"}
        />
        <Text style={{ color: cS === "dark" ? "white" : "black"}}>
          Google It!
        </Text>
      </TouchableOpacity></View>
    </ScrollView>
  );
}
