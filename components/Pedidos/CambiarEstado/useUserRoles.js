// components/CambiarEstado/hooks/useUserRoles.js
import { useState, useEffect } from "react";
import { useAuth } from "../../../core/context/Acceso/AuthContext";

const ROLES = {
  ADMIN: "67cb9a4fa5866273d8830fad",
  CUENTA: "67cb9a96a5866273d8830fb0",
};

export const useUserRoles = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCuentaRol, setIsCuentaRol] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user, isAuthenticated, checkAuthStatus } = useAuth();

  useEffect(() => {
    const verifyRoles = async () => {
      setIsLoading(true);

      try {
        // Verifica el estado de autenticación si es necesario
        if (isAuthenticated && (!user || !user.rol)) {
          await checkAuthStatus();
        }

        // Determina los roles del usuario
        const userRole = user?.rol;

        setIsCuentaRol(userRole === ROLES.CUENTA);
        setIsAdmin(userRole === ROLES.ADMIN && userRole !== ROLES.CUENTA);
      } catch (error) {
        console.error("Error verificando roles:", error);
        setIsAdmin(false);
        setIsCuentaRol(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyRoles();
  }, [user, isAuthenticated, checkAuthStatus]);

  return {
    isAdmin,
    isCuentaRol,
    isLoading,
    userRole: user?.rol,
    isAuthenticated,
  };
};
