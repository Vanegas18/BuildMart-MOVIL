import { Slot } from "expo-router";
import { View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../core/context/Acceso/AuthContext";
import Toast from "react-native-toast-message";
import { PedidosProvider } from "../core/context/Pedidos/PedidosContext";
import { Footer } from "../components/Main/Footer";
import { VentasProvider } from "../core/context/Ventas/VentasContext";
import { ClientesProvider } from "../core/context/Clientes/ClientesContext";
import { ProductosProvider } from "../core/context/Productos/ProductosContext";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
      <ClientesProvider>
        <PedidosProvider>
          <VentasProvider>
            <ProductosProvider> 
            <SafeAreaView className="flex-1 bg-white">
              {/* StatusBar configuration */}
              <StatusBar style="dark" translucent={Platform.OS === "android"} />

              {/* Contenido principal */}
              <View className="flex-1 pb-20">
                <Slot />
              </View>

              {/* Footer con navegación */}
              <Footer />

              {/* Toast para notificaciones */}
              <Toast
                position="top"
                autoHide={true}
                visibilityTime={2000}
                topOffset={Platform.OS === "ios" ? 60 : 40}
                style={{ zIndex: 1000 }}
              />
            </SafeAreaView>
            </ProductosProvider>
          </VentasProvider>
        </PedidosProvider>
        </ClientesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
