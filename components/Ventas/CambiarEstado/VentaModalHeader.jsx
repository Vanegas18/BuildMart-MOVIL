import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const VentaModalHeader = ({ title, onClose }) => (
  <View className="flex-row items-center justify-between mb-6">
    <Text className="text-xl font-bold text-gray-900 flex-1 mr-4">{title}</Text>
    <TouchableOpacity
      onPress={onClose}
      className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
      <Ionicons name="close" size={20} color="#6B7280" />
    </TouchableOpacity>
  </View>
);
