import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image} from 'react-native';

export default function DetailsScreen() {
  const { id, title } = useLocalSearchParams();

  return (
    <View >
        <Image
                source={{
                  uri: `https://img.spoonacular.com/recipes/${id}-556x370.jpg`,
                }}
                style={{ width: 200, height: 200, margin: 20 }}
              />
      <Text>Details of user {id} and {title} </Text>
    </View>
  );
}