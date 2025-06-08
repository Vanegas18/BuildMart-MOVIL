import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ContactItem({ icon, title, subtitle, subtitle2 }) {
  return (
    <View className="flex-row items-center gap-3 p-3 bg-white rounded-lg">
      <Ionicons name={icon} size={24} color="#2563eb" />
      <View>
        <Text className="font-medium text-gray-900">{title}</Text>
        <Text className="text-sm text-gray-600">{subtitle}</Text>
        <Text className="text-sm text-gray-500">{subtitle2}</Text>
      </View>
    </View>
  );
}
