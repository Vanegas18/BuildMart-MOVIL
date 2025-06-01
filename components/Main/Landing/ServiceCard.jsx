import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ServiceCard({ icon, title, description }) {
  return (
    <View className="bg-white rounded-lg border border-blue-600 shadow-sm mb-5">
      <View className="p-6 mb-4">
        <View className="flex-row items-center gap-10">
          <View className="bg-blue-100 p-3 rounded-full w-12 h-12 justify-center items-center">
            <Ionicons name={icon} size={24} color="#2563eb" />
          </View>
          <View className="flex-1">
            <Text className="font-semibold text-gray-900 text-base mb-1">
              {title}
            </Text>
            <Text className="text-sm text-gray-600 leading-5">
              {description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
