import { View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const LoadingState = ({ isAdmin }) => (
  <View className="items-center py-16 px-6">
    <View className="bg-blue-50 w-24 h-24 rounded-full items-center justify-center mb-6">
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
    <Text className="text-xl font-bold text-gray-900 mb-3 text-center">
      Cargando Información...
    </Text>
    <Text className="text-base text-gray-500 text-center leading-relaxed">
      {isAdmin ? "Obteniendo datos del sistema" : "Buscando tu información"}
    </Text>

    {/* Skeleton loading cards */}
    <View className="w-full mt-8 space-y-4">
      {[1, 2].map((index) => (
        <View
          key={index}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
          {/* Header skeleton */}
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1">
              <View className="h-6 bg-gray-200 rounded w-32 mb-2"></View>
              <View className="h-4 bg-gray-200 rounded w-24"></View>
            </View>
            <View className="h-8 bg-gray-200 rounded-full w-20"></View>
          </View>

          {/* Products skeleton */}
          <View className="mb-4">
            <View className="h-5 bg-gray-200 rounded w-28 mb-3"></View>
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <View className="flex-1">
                  <View className="h-4 bg-gray-200 rounded w-3/4 mb-2"></View>
                  <View className="h-3 bg-gray-200 rounded w-1/2"></View>
                </View>
                <View className="h-4 bg-gray-200 rounded w-16"></View>
              </View>
              <View className="flex-row justify-between">
                <View className="flex-1">
                  <View className="h-4 bg-gray-200 rounded w-2/3 mb-2"></View>
                  <View className="h-3 bg-gray-200 rounded w-1/3"></View>
                </View>
                <View className="h-4 bg-gray-200 rounded w-16"></View>
              </View>
            </View>
          </View>

          {/* Total skeleton */}
          <View className="bg-gray-50 rounded-xl p-4 mb-4">
            <View className="flex-row justify-between items-center">
              <View>
                <View className="h-3 bg-gray-200 rounded w-20 mb-2"></View>
                <View className="h-6 bg-gray-200 rounded w-24"></View>
              </View>
              <View className="h-10 bg-gray-200 rounded-lg w-28"></View>
            </View>
          </View>

          {/* Button skeleton */}
          <View className="h-12 bg-gray-200 rounded-xl"></View>
        </View>
      ))}
    </View>
  </View>
);
