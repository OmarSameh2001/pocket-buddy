import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import  Colors  from '@/constants/Colors';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Appearance, useColorScheme } from 'react-native';



export default function TabLayout() {
  const cS = useColorScheme();
  
  
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
            <Text style={{ color: focused ? 'orange' : cS === "dark" ? "white" :  'black', fontSize: 12 }}>Morning</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="sun-o" size={28} color={focused ? "orange" : cS === "dark" ? "white" :  "black"} />
          ),
        }}
      />
      <Tabs.Screen
        name="entertainment"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'red' : cS === "dark" ? "white" : 'black', fontSize: 12 }}>Watch</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="movie-open" size={28} color={focused ? "red" : cS === "dark" ? "white" : "black"} />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'green' : cS === "dark" ? "white" : 'black', fontSize: 12 }}>Health</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="food-apple" size={28} color={focused ? "green" : cS === "dark" ? "white" : "black"} />
          ),
        }}
      />
    </Tabs>
  );
}
