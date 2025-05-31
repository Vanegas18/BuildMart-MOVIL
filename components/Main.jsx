import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { useAuth } from "../core/context/Acceso/AuthContext";
import { useEffect, useState } from "react";

export default function Main() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCuentaRol, setIsCuentaRol] = useState(false);
  const { user, isAuthenticated, logout, checkAuthStatus } = useAuth();

  // Efecto para verificar el rol del usuario
  useEffect(() => {
    // Verifica los roles del usuario
    const verifyRoles = async () => {
      if (isAuthenticated && (!user || !user.rol)) {
        await checkAuthStatus();
      }

      // Comprueba si es el rol específico para "Mi cuenta"
      setIsCuentaRol(user?.rol === "67cb9a96a5866273d8830fb0");

      // Comprueba si es admin (y no tiene el rol específico de cuenta)
      setIsAdmin(
        user?.rol === "67cb9a4fa5866273d8830fad" &&
          user?.rol !== "67cb9a96a5866273d8830fb0"
      );
    };

    verifyRoles();
  }, [user, isAuthenticated, checkAuthStatus]);

  // Ejecuta el cierre de sesión cuando se confirma
  const handleConfirmLogout = () => {
    logout();
    setIsDialogOpen(false);
  };

  return (
    <ScrollView>
      {/* HEADER */}
      <View className="flex-row justify-between p-4 bg-white shadow-sm">
        <View className="flex-row gap-2">
          <Ionicons name="home" size={24} color="#2563eb" />
          <Text className="text-lg font-bold">
            BUILD <Text className="text-blue-600 font-bold">MART</Text>
          </Text>
        </View>
        {isAuthenticated && (
          <>
            <Pressable onPress={() => setIsDialogOpen(true)}>
              <Ionicons name="log-out-outline" size={26} color="#ef4444" />
            </Pressable>
          </>
        )}
      </View>

      {/* MAIN */}
      <View className="px-4 py-8">
        <View className="text-center mb-8">
          <Text className="text-3xl text-center font-bold text-gray-900 mb-2">
            Tu Casa Ideal te Está Esperando
          </Text>
          <Text className="text-center text-base text-gray-600 mb-6 ">
            Encuentra la casa de tus sueños con nosotros.
          </Text>

          <View className="relative h-48 mb-6 rounded-lg overflow-hidden">
            <Image
              source={require("../assets/imgLanding.jpg")}
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

              <Link href="/registro" asChild>
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
                  <Ionicons name="person-outline" size={20} color="#fff" />
                  <Text className="text-white text-base font-bold ml-2">
                    Ir al Catálogo
                  </Text>
                </View>
              </Pressable>
            </Link>
          )}
        </View>
      </View>

      {/* SERVICES */}
      <View className="px-4 pb-8">
        <Text className="text-2xl font-bold text-center mb-6 text-gray-900">
          Nuestros Servicios
        </Text>

        <View className="grid gap-4 ">
          {/* CARD 1 */}
          <View style={styles.container}>
            <View style={styles.card}>
              <View className="p-6">
                <View style={styles.flexContainer}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="home-outline" size={24} color="#2563eb" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>Casas Prefabricadas</Text>
                    <Text style={styles.description}>
                      Diseños modernos y funcionales, listos para habitar.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* CARD 2 */}
          <View style={styles.container}>
            <View style={styles.card}>
              <View className="p-6">
                <View style={styles.flexContainer}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="construct-outline"
                      size={24}
                      color="#2563eb"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>Materiales de Construcción</Text>
                    <Text style={styles.description}>
                      Todo lo que necesitas para tu proyecto de construcción.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* CARD 3 */}
          <View style={styles.container}>
            <View style={styles.card}>
              <View className="p-6">
                <View style={styles.flexContainer}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="people-outline" size={24} color="#2563eb" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>Asesoría Personalizada</Text>
                    <Text style={styles.description}>
                      Te acompañamos en cada paso de tu proyecto.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View className="px-4 pb-8">
        <View className="bg-blue-600 text-white rounded-lg p-6 text-center">
          <Text className="text-xl text-white text-center font-bold mb-4">
            ¿Por qué elegir BuildMart?
          </Text>
          <View className="flex-col gap-3">
            <View className="flex-row items-center gap-3">
              <View className="w-2 h-2 bg-white rounded-full"></View>
              <Text className="text-white font-bold">
                Más de 15 años de experiencia
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="w-2 h-2 bg-white rounded-full"></View>
              <Text className="text-white font-bold">
                Garantía en todos nuestros productos
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="w-2 h-2 bg-white rounded-full"></View>
              <Text className="text-white font-bold">
                Entrega e instalación incluida
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contact Section */}
      <View className="px-4 pb-24">
        <View className="bg-gray-50 rounded-lg p-6">
          <Text className="text-xl font-bold text-gray-900 mb-4 text-center">
            ¿Necesitas más información?
          </Text>
          <Text className="text-gray-600 mb-6 text-center">
            {" "}
            Nuestro equipo está listo para ayudarte con tu proyecto
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center gap-3 p-3 bg-white rounded-lg">
              <Ionicons name="call-outline" size={24} color="#2563eb" />
              <View>
                <Text className="font-medium text-gray-900">Llámanos</Text>
                <Text className="text-sm text-gray-600">+57 300 123 4567</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 p-3 bg-white rounded-lg">
              <Ionicons name="location-outline" size={24} color="#2563eb" />
              <View>
                <Text className="font-medium text-gray-900">Visítenos</Text>
                <Text className="text-sm text-gray-600">
                  Cra 15 #45-67, Bogotá
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 p-3 bg-white rounded-lg">
              <Ionicons name="logo-whatsapp" size={24} color="#2563eb" />
              <View>
                <Text className="font-medium text-gray-900">WhatsApp</Text>
                <Text className="text-sm text-gray-600">+57 300 123 4567</Text>
              </View>
            </View>
          </View>

          <Link href="https://web.whatsapp.com/" asChild>
            <Pressable className="w-full mt-4 rounded-lg p-4  bg-black active:bg-gray-800 text-white">
              <View className="flex-row items-center justify-center">
                <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                <Text className="text-white text-base font-bold ml-2">
                  Escribir por WhatsApp
                </Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Diálogo de confirmación */}
      <Modal
        visible={isDialogOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDialogOpen(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-6 mx-4 w-80">
            {/* Header */}
            <Text className="text-lg font-semibold text-center text-gray-900 mb-2">
              ¿Cerrar sesión?
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              ¿Estás seguro de que deseas cerrar tu sesión?
            </Text>

            {/* Footer */}
            <View className="flex-row justify-end space-x-2">
              <Pressable
                onPress={() => setIsDialogOpen(false)}
                className="px-4 py-2 rounded-md">
                <Text className="text-gray-600">Cancelar</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  handleConfirmLogout();
                  setIsDialogOpen(false);
                }}
                className="px-4 py-2 bg-red-600 rounded-md active:bg-red-700">
                <Text className="text-white font-medium">Cerrar Sesión</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = {
  container: {
    gap: 16, // equivalent to gap-4
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2563eb", // orange-200
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Para Android
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16, // equivalent to gap-4
  },
  iconContainer: {
    backgroundColor: "#DBEAFE", // orange-100
    padding: 12,
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    color: "#111827", // gray-900
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#4b5563", // gray-600
    lineHeight: 20,
  },
};
