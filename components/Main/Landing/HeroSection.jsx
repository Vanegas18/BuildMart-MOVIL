import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";

export default function HeroSection({ isAuthenticated }) {
  return (
    <View className="text-center mb-8">
      <Text className="text-3xl text-center font-bold text-gray-900 mb-2">
        Tu Casa Ideal te Está Esperando
      </Text>
      <Text className="text-center text-base text-gray-600 mb-6">
        Encuentra la casa de tus sueños con nosotros.
      </Text>

      <View className="relative h-48 mb-6 rounded-lg overflow-hidden">
        <Image
          source={require("../../../assets/imgLanding.jpg")}
          alt="Casa prefabricada moderna"
          className="container w-full h-full object-cover blur-3xl"
          blurRadius={5}
        />
      </View>

      {!isAuthenticated ? (
        <>
          <Link href="/logueo" asChild>
            <Pressable className="bg-blue-600 w-full rounded-lg p-4 active:bg-blue-700">
              <View className="flex-row items-center justify-center">
                <Feather name="log-in" size={20} color="#fff" />
                <Text className="text-white text-base font-bold ml-2">
                  Iniciar Sesión
                </Text>
              </View>
            </Pressable>
          </Link>

          <Link href="https://build-two-sage.vercel.app/register" asChild>
            <Pressable className="bg-gray-200 w-full rounded-lg p-4 active:bg-gray-300 mt-4">
              <View className="flex-row items-center justify-center">
                <Feather name="user-plus" size={20} color="#2563eb" />
                <Text className="text-blue-600 text-base font-bold ml-2">
                  Registrarse
                </Text>
              </View>
            </Pressable>
          </Link>
        </>
      ) : (
        <Link href="/catalogo" asChild>
          <Pressable className="bg-blue-600 w-full rounded-lg p-4 active:bg-blue-700">
            <View className="flex-row items-center justify-center">
              <Ionicons name="cart-outline" size={20} color="#fff" />
              <Text className="text-white text-base font-bold ml-2">
                Ir a Nuestra Tienda
              </Text>
            </View>
          </Pressable>
        </Link>
      )}
    </View>
  );
}
