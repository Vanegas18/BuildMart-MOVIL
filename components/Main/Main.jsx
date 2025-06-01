import { ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../core/context/Acceso/AuthContext";
import Header from "./Landing/Header";
import HeroSection from "./Landing/HeroSection";
import ServicesSection from "./Landing/ServicesSection";
import FeaturesSection from "./Landing/FeaturesSection";
import ContactSection from "./Landing/ContactSection";
import LogoutModal from "./Landing/LogoutModal";

export default function Main() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCuentaRol, setIsCuentaRol] = useState(false);
  const { user, isAuthenticated, logout, checkAuthStatus } = useAuth();

  // Efecto para verificar el rol del usuario
  useEffect(() => {
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
      <Header
        isAuthenticated={isAuthenticated}
        onLogoutPress={() => setIsDialogOpen(true)}
      />

      <View className="px-4 py-8">
        <HeroSection isAuthenticated={isAuthenticated} />
      </View>

      <ServicesSection />
      <FeaturesSection />

      <View className="px-4 pb-24">
        <ContactSection />
      </View>

      <LogoutModal
        isVisible={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </ScrollView>
  );
}
