import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Movies() {
  const [cMovie, setCMovie] = useState([]);
  const [tMovie, setTMovie] = useState([]);
  const [tSeries, setTSeries] = useState([]);
  const [first, setFirst] = useState(1);
  const [second, setSecond] = useState(1);
  const [third, setThird] = useState(1);
  const { width, height } = Dimensions.get("window");
  const vw = width / 100;
  const vh = height / 100;
  const Movies_Key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGIwMzNjMTRlYWQzZGNjNWI1MGI5NmY1Y2RhNDI1NSIsInN1YiI6IjY2NjA4ZWQxNzk5Y2VkYzMzYWYyNjc2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-AopGEMHd18jKlzGbuY0m0KYABiWi85y15C731RUoQ";

  const saveData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Failed to save data", error);
    }
  };

  const getData = async (key: string, set: any, get: () => void) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        set(JSON.parse(value));
      } else {
        get();
      }
    } catch (error) {
      console.log("Failed to get data", error);
    }
  };

  const getMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${first}`,
        {
          headers: {
            Authorization: `Bearer ${Movies_Key}`,
          },
        }
      );
      const data = await response.json();
      if (data.results) {
        setCMovie(data.results);
        saveData("current-movies", data.results);
      } else {
        throw new Error("Failed to fetch movies");
      }
    } catch (error) {
      console.log(error);
      getData("current-movies", setCMovie, getMovies);
    }
  };

  const getTopMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${second}`,
        {
          headers: {
            Authorization: `Bearer ${Movies_Key}`,
          },
        }
      );
      const data = await response.json();
      if (data.results) {
        setTMovie(data.results);
        saveData("top-movies", data.results);
      } else {
        throw new Error("Failed to fetch movies top");
      }
    } catch (error) {
      console.log(error);
      getData("top-movies", setTMovie, getTopMovies);
    }
  };

  const getTopSeries = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${third}`,
        {
          headers: {
            Authorization: `Bearer ${Movies_Key}`,
          },
        }
      );
      const data = await response.json();
      if (data.results) {
        setTSeries(data.results);
        saveData("top-series", data.results);
      } else {
        throw new Error("Failed to fetch movies top");
      }
    } catch (error) {
      console.log(error);
      getData("top-series", setTSeries, getTopSeries);
    }
  };

  useEffect(() => {
    getMovies();
    getTopMovies();
    getTopSeries();
  }, [first, second, third]);
  return (
    <ScrollView>
      <View style={{ backgroundColor: "#34495e", margin: 5, borderRadius: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              marginHorizontal: 10,
              textDecorationLine: "underline",
              color: "white",
              alignSelf: "center",
              paddingHorizontal: 10,
            }}
          >
            Movies in theaters
          </Text>
          {first === 1 ? (
            <TouchableOpacity
              onPress={() => setFirst(2)}
              style={{ position: "absolute", right: 2 }}
            >
              <Entypo name="arrow-with-circle-right" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setFirst(1)}
              style={{ position: "absolute", left: 2 }}
            >
              <Entypo name="arrow-with-circle-left" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView horizontal style={{ marginHorizontal: 5 }}>
          {cMovie ? (
            cMovie.map((movie: any, index: number) => (
              <TouchableOpacity
                style={{
                  marginHorizontal: 5,
                  flex: 1,
                  alignItems: "center",
                  marginVertical: 10,
                }}
                key={index}
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/search?q=${movie.title}+movie`
                  )
                }
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                  }}
                  style={{ width: 30 * vw, height: 20 * vh }}
                />
                <Text style={{ maxWidth: 30 * vw, color: "white" }}>
                  {movie.title}
                </Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Text style={{ maxWidth: 20 * vw, color: "white" }}>
                    {movie.vote_average.toString().slice(0, 3)}
                  </Text>
                  <FontAwesome name="star" size={20} color="gold" />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Loading...</Text>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: "#34495e",
          marginHorizontal: 5,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              marginHorizontal: 10,
              textDecorationLine: "underline",
              color: "white",
            }}
          >
            Top Rated Movies
          </Text>
          {second === 1 ? (
            <TouchableOpacity
              onPress={() => setSecond(2)}
              style={{ position: "absolute", right: 2 }}
            >
              <Entypo name="arrow-with-circle-right" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setSecond(1)}
              style={{ position: "absolute", left: 2 }}
            >
              <Entypo name="arrow-with-circle-left" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView horizontal style={{ marginHorizontal: 5 }}>
          {tMovie ? (
            tMovie.map((movie: any, index: number) => (
              <TouchableOpacity
                style={{
                  marginHorizontal: 5,
                  flex: 1,
                  alignItems: "center",
                  marginVertical: 10,
                }}
                key={index}
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/search?q=${movie.title}+movie`
                  )
                }
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                  }}
                  style={{ width: 30 * vw, height: 20 * vh }}
                />
                <Text
                  style={{ maxWidth: 30 * vw, color: "white" }}
                  numberOfLines={3}
                >
                  {movie.title}
                </Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Text style={{ maxWidth: 20 * vw, color: "white" }}>
                    {movie.vote_average.toString().slice(0, 3)}
                  </Text>
                  <FontAwesome name="star" size={20} color="gold" />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Loading...</Text>
          )}
        </ScrollView>
      </View>
      <View style={{ backgroundColor: "#34495e", margin: 5, borderRadius: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              marginHorizontal: 10,
              textDecorationLine: "underline",
              color: "white",
            }}
          >
            Top Rated Series
          </Text>
          {third === 1 ? (
            <TouchableOpacity
              onPress={() => setThird(2)}
              style={{ position: "absolute", right: 2 }}
            >
              <Entypo name="arrow-with-circle-right" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setThird(1)}
              style={{ position: "absolute", left: 2 }}
            >
              <Entypo name="arrow-with-circle-left" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView horizontal style={{ marginHorizontal: 5 }}>
          {tSeries ? (
            tSeries.map((movie: any, index: number) => (
              <TouchableOpacity
                style={{
                  marginHorizontal: 5,
                  flex: 1,
                  alignItems: "center",
                  marginVertical: 10,
                }}
                key={index}
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/search?q=${movie.name}+series`
                  )
                }
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                  }}
                  style={{ width: 30 * vw, height: 20 * vh }}
                />
                <Text
                  style={{ maxWidth: 30 * vw, color: "white" }}
                  numberOfLines={3}
                >
                  {movie.name}
                </Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Text style={{ maxWidth: 20 * vw, color: "white" }}>
                    {movie.vote_average.toString().slice(0, 3)}
                  </Text>
                  <FontAwesome name="star" size={20} color="gold" />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Loading...</Text>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
