import { Link, Slot } from "expo-router";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/AntDesign";
import { AuthProvider } from "../core/context/Acceso/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />

        {/* Contenido principal con padding bottom para el footer */}
        <View style={styles.content}>
          <Slot />
        </View>

        {/* Bottom Navigation - Posición absoluta */}
        <View style={styles.bottomNav}>
          <View style={styles.navContainer}>
            <Link href="/" asChild>
              <Pressable style={styles.navItem}>
                <Ionicons name="home" size={24} color="#2563eb" />
                <Text style={styles.navText}>Inicio</Text>
              </Pressable>
            </Link>

            <Link href="/catalogo" asChild>
              <Pressable style={styles.navItem}>
                <Ionicons name="shoppingcart" size={24} color="#2563eb" />
                <Text style={styles.navText}>Tienda</Text>
              </Pressable>
            </Link>

            <Link href="/perfil" asChild>
              <Pressable style={styles.navItem}>
                <Ionicons name="user" size={24} color="#2563eb" />
                <Text style={styles.navText}>Perfil</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32, // equivalent to mt-8
    backgroundColor: "#FFF", // orange-50 background
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Espacio para el footer (altura del bottom nav)
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB", // gray-200
    paddingVertical: 16,
    paddingHorizontal: 16,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Elevación para Android
    elevation: 5,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  navText: {
    fontSize: 12,
    color: "#374151", // gray-700
    fontWeight: "500",
  },
});
