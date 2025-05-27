// auth.js - Servicios de autenticación corregidos
import axios from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Servicio para registrar un nuevo usuario
export const registerRequest = (usuario) => axios.post(`/usuarios`, usuario);

// Servicio para iniciar sesión - CORREGIDO
export const loginRequest = async (usuario) => {
  try {
    console.log("Enviando datos de login:", usuario);

    const response = await axios.post(`/usuarios/login`, {
      correo: usuario.correo,
      contraseña: usuario.contraseña,
    });

    console.log("Respuesta del servidor:", response.data);
    return response;
  } catch (error) {
    console.error(
      "Error en loginRequest:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Verifica si el token almacenado es válido
export const verifyTokenRequest = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      return Promise.reject("No token found");
    }

    return await axios.get(`/usuarios/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return Promise.reject(error);
  }
};

// Solicita restablecimiento de contraseña enviando correo
export const forgotPasswordRequest = async (datos) => {
  return axios.post("/usuarios/restablecer-contrasena", datos);
};

// Verifica token y establece nueva contraseña
export const resetPasswordRequest = async (datos) => {
  return axios.post("/usuarios/verificar-token-contrasena", datos);
};
