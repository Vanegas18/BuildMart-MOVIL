import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Badge = ({ children, bgStyle, textStyle }) => (
  <View
    className={`${bgStyle} border px-3 py-1.5 rounded-full flex-row items-center space-x-1`}>
    {children}
  </View>
);
