import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import ContactItem from "./ContactItem";

export default function ContactSection() {
  const contactMethods = [
    {
      icon: "call-outline",
      title: "Llámanos",
      subtitle: "+57 320 458 0644",
      subtitle2: "Lun-Vie: 8:00 a.m - 06:00 p.m",
    },
    {
      icon: "location-outline",
      title: "Visítenos",
      subtitle: "Calle 46 # 78-340",
      subtitle2: "Vía Machado, Copacabana",
    },
    {
      icon: "logo-whatsapp",
      title: "WhatsApp",
      subtitle: "+57 320 458 0644",
      subtitle2: "Lun-Vie: 8:00 a.m - 06:00 p.m",
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
            subtitle2={method.subtitle2}
          />
        ))}
      </View>

      <Link
        href="https://api.whatsapp.com/send?phone=573204580644&text=Hola%20%F0%9F%A4%97%20estamos%20felices%20de%20tenerte%20aqu%C3%AD.%20Me%20gustar%C3%ADa%20hacer%20una%20cotizaci%C3%B3n%20sobre..."
        asChild>
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
