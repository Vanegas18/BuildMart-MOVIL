import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  const services = [
    {
      icon: "home-outline",
      title: "Casas Prefabricadas",
      description: "Diseños modernos y funcionales, listos para habitar.",
    },
    {
      icon: "construct-outline",
      title: "Materiales de Construcción",
      description: "Todo lo que necesitas para tu proyecto de construcción.",
    },
    {
      icon: "people-outline",
      title: "Asesoría Personalizada",
      description: "Te acompañamos en cada paso de tu proyecto.",
    },
  ];

  return (
    <View className="px-6 pb-10">
      <Text className="text-2xl font-bold text-center mb-6 text-gray-900">
        Nuestros Servicios
      </Text>

      <View>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </View>
    </View>
  );
}
