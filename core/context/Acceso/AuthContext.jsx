// AuthContext.js - Contexto de autenticación corregido
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  registerRequest,
  loginRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  verifyTokenRequest,
} from "../../api/Acceso/auth";
import { tokenService } from "../../api/tokenService";
import { createContext, useContext, useEffect, useState } from "react";

// Contexto de autenticación para manejar el estado del usuario
export const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Estados para manejar la autenticación
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para verificar el estado de la autenticación actual
  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const token = await tokenService.getToken();
      if (token) {
        const response = await verifyTokenRequest();
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Error checking auth status:", err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (usuario) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerRequest(usuario);
      await tokenService.setToken(response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: "Bienvenido a BuildMart",
      });
      return response;
    } catch (err) {
      console.error("Error registering:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al registrar";
      setError(errorMessage);
      Toast.show({
        type: "error",
        text1: "Error en el registro",
        text2: errorMessage,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión - CORREGIDA
  const login = async (usuario) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Intentando login con:", usuario);

      // Validar datos antes de enviar
      if (!usuario.correo || !usuario.contraseña) {
        throw new Error("Correo y contraseña son requeridos");
      }

      const response = await loginRequest(usuario);
      console.log("Login exitoso:", response.data);

      // Guardar token y datos del usuario
      if (response.data.token) {
        await tokenService.setToken(response.data.token);
      }

      if (response.data.user || response.data.usuario) {
        setUser(response.data.user || response.data.usuario);
      }

      setIsAuthenticated(true);

      Toast.show({
        type: "success",
        text1: "Inicio de sesión exitoso",
        text2: "Bienvenido de nuevo a BuildMart",
      });

      return response;
    } catch (err) {
      console.error("Error logging in:", err);

      let errorMessage = "Error al iniciar sesión";

      if (err.response?.status === 400) {
        errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Credenciales inválidas";
      } else if (err.response?.status === 401) {
        errorMessage = "Correo o contraseña incorrectos";
      } else if (err.response?.status === 404) {
        errorMessage = "Usuario no encontrado";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);

      Toast.show({
        type: "error",
        text1: "Error de autenticación",
        text2: errorMessage,
      });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    setLoading(true);
    try {
      await tokenService.removeToken();
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      Toast.show({
        type: "success",
        text1: "Sesión cerrada",
        text2: "Hasta luego de BuildMart",
      });
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  };

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    async function checkLogin() {
      setLoading(true);
      try {
        const token = await tokenService.getToken();
        if (token) {
          const response = await verifyTokenRequest();
          setUser(response.data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error verifying token:", err);
        setIsAuthenticated(false);
        // Limpiar token inválido
        await tokenService.removeToken();
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  // Proveer el contexto de autenticación
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        loading,
        register,
        login,
        logout,
        checkAuthStatus,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
