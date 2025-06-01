import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import ContactItem from "./ContactItem";

export default function ContactSection() {
  const contactMethods = [
    {
      icon: "call-outline",
      title: "Llámanos",
      subtitle: "+57 300 123 4567",
    },
    {
      icon: "location-outline",
      title: "Visítenos",
      subtitle: "Cra 15 #45-67, Bogotá",
    },
    {
      icon: "logo-whatsapp",
      title: "WhatsApp",
      subtitle: "+57 300 123 4567",
    },
  ];

  return (
    <View className="bg-gray-50 rounded-lg p-6">
      <Text className="text-xl font-bold text-gray-900 mb-4 text-center">
        ¿Necesitas más información?
      </Text>
      <Text className="text-gray-600 mb-6 text-center">
        Nuestro equipo está listo para ayudarte con tu proyecto
      </Text>

      <View className="space-y-4">
        {contactMethods.map((method, index) => (
          <ContactItem
            key={index}
            icon={method.icon}
            title={method.title}
            subtitle={method.subtitle}
          />
        ))}
      </View>

      <Link href="https://web.whatsapp.com/" asChild>
        <Pressable className="w-full mt-4 rounded-lg p-4 bg-black active:bg-gray-800 text-white">
          <View className="flex-row items-center justify-center">
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text className="text-white text-base font-bold ml-2">
              Escribir por WhatsApp
            </Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
