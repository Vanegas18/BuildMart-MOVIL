// components/CambiarEstado/components/ModalHeader.jsx
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ModalHeader = ({ title, onClose }) => (
  <View className="flex-row items-center justify-between mb-6">
    <Text className="text-2xl font-bold text-gray-900 flex-1">{title}</Text>
    <TouchableOpacity
      onPress={onClose}
      className="p-2 rounded-full bg-gray-100 ml-4">
      <Ionicons name="close" size={20} color="#6B7280" />
    </TouchableOpacity>
  </View>
);
