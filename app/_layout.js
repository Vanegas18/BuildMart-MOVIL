import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../core/context/Acceso/AuthContext";
import { Footer } from "../components/Footer";
import Toast from "react-native-toast-message";
import { PedidosProvider } from "../core/context/Pedidos/PedidosContext";

export default function Layout() {
  return (
    <AuthProvider>
      <PedidosProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />

          {/* Contenido principal con padding bottom para el footer */}
          <View style={styles.content}>
            <Slot />
          </View>

          {/* Footer con navegación */}
          <Footer />

          {/* Toast para notificaciones */}
          <Toast
            position="top"
            autoHide={true}
            visibilityTime={2000}
            topOffset={30}
            style={{ zIndex: 1000 }} // Asegura que el Toast esté por encima de otros componentes
          />
        </View>
      </PedidosProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
