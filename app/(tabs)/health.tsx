import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

type Meal = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
};

type DayMeals = {
  meals: Meal[];
  nutrients: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
};

type MealsData = {
  [day: string]: DayMeals;
};

const Meals_Key = "0525a71b669846648635672782f52319";

const Health: React.FC = () => {
  const [meals, setMeals] = useState<MealsData | null>(null);
  const [diet, setDiet] = useState<string | null>(null);
  const [calories, setCalories] = useState<number>(2000);
  const [selectedDay, setSelectedDay] = useState<string>("monday");

  const saveMeals = async (data: MealsData, calories: number, diet: string) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("my-meal", jsonValue);
      await AsyncStorage.setItem("calories", JSON.stringify(calories));
      await AsyncStorage.setItem("diet", JSON.stringify(diet));
    } catch (error) {
      console.error("Failed to save meals to AsyncStorage", error);
    }
  };

  const getMealsLocal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-meal");
      if (jsonValue) {
        setMeals(JSON.parse(jsonValue));
      } else {
        fetchMeals();
      }
    } catch (error) {
      console.error("Failed to retrieve meals from AsyncStorage", error);
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?targetCalories=${calories}&diet=${diet}&apiKey=${Meals_Key}`
      );
      const data = await response.json();
      if (data.week) {
        setMeals(data.week);
        saveMeals(data.week, calories, diet);
      } else {
        throw new Error("Failed to fetch meals data");
      }
    } catch (error) {
      console.error("Failed to fetch meals data", error);
    }
  };

  const fetchData = useCallback(() => {
    getMealsLocal();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ScrollView style={{ padding: 10, marginTop: 20 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          marginBottom: 15,
          textDecorationLine: "underline",
        }}
      >
        Healthy Meals
      </Text>

      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 18 }}>Daily calories intake:</Text>
        <TextInput
          style={{ borderBottomWidth: 1, width: 100 }}
          placeholder="Default: 2000"
          keyboardType="numeric"
          onChangeText={(text) => setCalories(parseInt(text, 10) || 2000)}
          value={calories.toString()}
        />
      </View>

      <Text style={{ fontSize: 18 }}>Diet:</Text>
      <Picker
        style={{ backgroundColor: "#dedede" }}
        mode="dropdown"
        selectedValue={diet}
        onValueChange={(value: any) => setDiet(value)}
      >
        <Picker.Item label="Any" value={null} />
        <Picker.Item label="Gluten Free" value="gluten_free" />
        <Picker.Item label="Ketogenic" value="ketogenic" />
        <Picker.Item label="Vegetarian" value="vegetarian" />
        <Picker.Item label="Lacto-Vegetarian" value="lacto_vegetarian" />
        <Picker.Item label="Ovo-Vegetarian" value="ovo_vegetarian" />
        <Picker.Item label="Vegan" value="vegan" />
        <Picker.Item label="Pescetarian" value="pescetarian" />
        <Picker.Item label="Paleo" value="paleo" />
        <Picker.Item label="Primal" value="primal" />
        <Picker.Item label="Low FODMAP" value="low_fodmap" />
        <Picker.Item label="Whole30" value="whole30" />
      </Picker>

      <TouchableOpacity
        style={{ backgroundColor: "#8eff66", padding: 10, borderRadius: 5, marginVertical: 10 }}
        onPress={fetchMeals}
      >
        <Text style={{ color: "white", alignSelf: "center" }}>
          Get New Week PLan
        </Text>
      </TouchableOpacity>
      <View style={{ marginBottom: 20 }}>
        <Text>Select Day:</Text>
        <Picker
          style={{ backgroundColor: "#dedede" }}
          mode="dropdown"
          selectedValue={selectedDay}
          onValueChange={(value: any) => setSelectedDay(value)}
        >
          <Picker.Item label="Saturday" value="saturday" />
          <Picker.Item label="Sunday" value="sunday" />
          <Picker.Item label="Monday" value="monday" />
          <Picker.Item label="Tuesday" value="tuesday" />
          <Picker.Item label="Wednesday" value="wednesday" />
          <Picker.Item label="Thursday" value="thursday" />
          <Picker.Item label="Friday" value="friday" />
        </Picker>
      </View>

      <ScrollView style={{ borderRadius: 5, borderWidth: 2, padding: 10 }}>
        {meals &&
          meals[selectedDay] &&
          meals[selectedDay].meals.map((meal, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Image
                source={{
                  uri: `https://img.spoonacular.com/recipes/${meal.id}-556x370.jpg`,
                }}
                style={{ width: 100, height: 100, marginRight: 20 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18 }}>{meal.title}</Text>
                <Text>Ready in {meal.readyInMinutes} mins</Text>
                <Text>Servings: {meal.servings}</Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Health;
