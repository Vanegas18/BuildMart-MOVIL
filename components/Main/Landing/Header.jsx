import { Pressable, StatusBar, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ isAuthenticated, onLogoutPress }) {
  return (
    <View className="flex-row justify-between p-4 bg-white shadow-sm">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      <View className="flex-row gap-2">
        <Ionicons name="home" size={24} color="#2563eb" />
        <Text className="text-lg font-bold">
          BUILD <Text className="text-blue-600 font-bold">MART</Text>
        </Text>
      </View>
      {isAuthenticated && (
        <Pressable onPress={onLogoutPress}>
          <Ionicons name="log-out-outline" size={26} color="#ef4444" />
        </Pressable>
      )}
    </View>
  );
}
