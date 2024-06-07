import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import  Colors  from '@/constants/Colors';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';



export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'orange' : 'black', fontSize: 12 }}>Morning</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="sun-o" size={28} color={focused ? "orange" : "black"} />
          ),
        }}
      />
      <Tabs.Screen
        name="entertainment"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'red' : 'black', fontSize: 12 }}>Entertainment</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="movie-open" size={28} color={focused ? "red" : "black"} />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'green' : 'black', fontSize: 12 }}>Health</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="food-apple" size={28} color={focused ? "green" : "black"} />
          ),
        }}
      />
    </Tabs>
  );
}
