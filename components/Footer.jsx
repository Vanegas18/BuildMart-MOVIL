import { Link } from "expo-router";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../core/context/Acceso/AuthContext";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCuentaRol, setIsCuentaRol] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  return (
    <>
      {/* Bottom Navigation - Posición absoluta */}
      <View style={styles.bottomNav}>
        <View style={styles.navContainer}>
          <Link href="/" asChild>
            <Pressable style={styles.navItem}>
              <Ionicons name="home-outline" size={24} color="#2563eb" />
              <Text style={styles.navText}>Inicio</Text>
            </Pressable>
          </Link>

          <Link href="/catalogo" asChild>
            <Pressable style={styles.navItem}>
              <Ionicons name="cart-outline" size={24} color="#2563eb" />
              <Text style={styles.navText}>Tienda</Text>
            </Pressable>
          </Link>

          {isAuthenticated && isCuentaRol ? (
            <Link href="/perfil" asChild>
              <Pressable style={styles.navItem}>
                <Ionicons name="person-outline" size={24} color="#2563eb" />
                <Text style={styles.navText}>Perfil</Text>
              </Pressable>
            </Link>
          ) : (
            isAdmin && (
              <>
                <Link href="/" asChild>
                  <Pressable style={styles.navItem}>
                    <Ionicons
                      name="receipt-outline"
                      size={24}
                      color="#2563eb"
                    />
                    <Text style={styles.navText}>Pedidos</Text>
                  </Pressable>
                </Link>
                <Link href="/" asChild>
                  <Pressable style={styles.navItem}>
                    <Ionicons name="trending-up" size={24} color="#2563eb" />
                    <Text style={styles.navText}>Ventas</Text>
                  </Pressable>
                </Link>
              </>
            )
          )}
        </View>
      </View>
    </>
  );
};

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
