import { Text, View } from "react-native";

export default function FeaturesSection() {
  const features = [
    "Más de 15 años de experiencia",
    "Garantía en todos nuestros productos",
    "Entrega e instalación incluida",
  ];

  return (
    <View className="px-4 pb-8">
      <View className="bg-blue-600 text-white rounded-lg p-6 text-center">
        <Text className="text-xl text-white text-center font-bold mb-4">
          ¿Por qué elegir BuildMart?
        </Text>
        <View className="flex-col gap-3">
          {features.map((feature, index) => (
            <View key={index} className="flex-row items-center gap-3">
              <View className="w-2 h-2 bg-white rounded-full"></View>
              <Text className="text-white font-bold">{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
