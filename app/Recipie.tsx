import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function DetailsScreen() {
  const Meals_Key = "0525a71b669846648635672782f52319";
  const { id, title } = useLocalSearchParams();
  const cS = useColorScheme();
  const [recipe, setRecipe] = useState<{ ingredients: { name: string, image: string }[] }>({
    ingredients: [],
  });

  
  const getRecipie = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${Meals_Key}`
    );
    const data = await response.json();
    if (data) {
      setRecipe(data);
      console.log(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    getRecipie();
  }, []);
  return (
    <ScrollView style={{ }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
      <Image
        source={{
          uri: `https://img.spoonacular.com/recipes/${id}-556x370.jpg`,
        }}
        style={{ width: 200, height: 200, margin: 10 }}
      />
      <Text style={{textDecorationLine: "underline", color: cS === "dark" ? "white" : "black"}}>{title}</Text>
      </View>
      <ScrollView style={{ alignSelf: "center"}}>
        {recipe ?
          recipe.ingredients.map((ingredient, index) => (
            <View key={index}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center", marginVertical: 5, borderWidth: 1, borderRadius: 5  }}
              >
                <Image
                  source={{
                    uri: `https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`,
                  }}
                  style={{ width: 100, height: 100}}
                ></Image>
                <Text style={{ color: cS === "dark" ? "white" : "black"}}>{ingredient.name}</Text>
                
              </View>
            </View>
          )) : <Text>Waiting for the Internet</Text>}
      </ScrollView>
    </ScrollView>
  );
}
