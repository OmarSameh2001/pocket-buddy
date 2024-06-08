import { Text, View, Image } from "react-native";

import { useState, useEffect } from "react";

import { ScrollView } from "react-native-gesture-handler";

import Temperature from "@/components/morning/Tempreature";
import News from "@/components/morning/News";
import Quran from "@/components/morning/Quran";

export default function Index() {
  

  return (
    <ScrollView style={{  paddingHorizontal: 2  }}>
      <Temperature />
      <News />
      <Quran />
    </ScrollView>
  );
}
