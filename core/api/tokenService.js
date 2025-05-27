import AsyncStorage from "@react-native-async-storage/async-storage";

export const tokenService = {
  async setToken(token) {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  },

  async getToken() {
    try {
      return await AsyncStorage.getItem("token");
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  async removeToken() {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  },
};
