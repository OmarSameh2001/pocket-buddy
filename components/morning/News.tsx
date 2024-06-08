import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function News() {
  const [news, setNews] = useState([]);
  const { width, height } = Dimensions.get("window");
  const vw = width / 100;
  const vh = height / 100;
  const News_Key = "7cb25c29b6e54779b969a9b1e8b874a4";
  const cS = useColorScheme();

  const storeNews = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("my-news", jsonValue);
    } catch (e) {
      console.log("Error storing news data: ", e);
    }
  };

  const getNewsLocal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-news");
      if (jsonValue != null) {
        setNews(JSON.parse(jsonValue));
      } else {
        console.log("No local news data found");
      }
    } catch (e) {
      console.log("Error retrieving local news data: ", e);
    }
  };

  const openUrl = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const getNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=eg&apiKey=${News_Key}`
      );
      const data = await response.json();
      if (data.articles) {
        setNews(data.articles);
        storeNews(data.articles);
      } else {
        throw new Error("Failed to fetch news articles");
      }
    } catch (error) {
      console.log("Fetching news from API failed, loading local news: ", error);
      getNewsLocal();
    }
  };
  

  useEffect(() => {
    getNews();
  }, []);

  return (
    <View style={{ marginTop: "1%" }}>
      <View
        style={{
          borderRadius: 5,
          borderWidth: 2,
          borderColor: cS === "dark" ? "gray" : "black",
          justifyContent: "space-between",
          maxHeight: 45 * vh,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            backgroundColor: "#8eff66",
            padding: 20,
          }}
        >
          <FontAwesome5 name="newspaper" size={30} color= {cS === "dark" ? "white" : "black"} />
          <Text
            style={{
              color: cS === "dark" ? "white" : "black",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            News
          </Text>
        </View>

        {news ? (
          <ScrollView style={{backgroundColor: cS === "dark" ? "black" : "white"}}>
            {news.map((item : any, index) => (
              <TouchableOpacity key={index} onPress={() => openUrl(item.url)}>
                <View key={index} style={{ padding: 10, borderWidth: 1, borderColor: cS === "dark" ? "gray" : "black" }}>
                  <Text
                    style={{
                      color: cS === "dark" ? "white" : "black",
                      alignSelf: "center",
                      textDecorationLine: "underline",
                    }}
                  >
                    {item.author}
                  </Text>
                  <Text style={{ color: cS === "dark" ? "white" : "black" }}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={{ color: "black", alignSelf: "center" }}>Loading...</Text>
        )}
      </View>
    </View>
  );
}
