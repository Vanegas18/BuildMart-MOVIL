import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Instancia base de Axios configurada para la API de BuildMart
const instance = axios.create({
  baseURL: "https://buildmart-back-billowing-feather-8375.fly.dev/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token a todas las solicitudes
instance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Limpiar token en caso de no autorizado
      try {
        await AsyncStorage.removeItem("token");
        // Opcional: navegar a login screen
        // NavigationService.navigate('Login');
      } catch (storageError) {
        console.error("Error removing token:", storageError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
