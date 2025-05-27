import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/AntDesign";
// Cambia esta importación según tu configuración:
// Para Expo Router:
// import { Link } from "expo-router";
// Para React Navigation:
// import { useNavigation } from "@react-navigation/native";

// Para los iconos, ajusta según tu configuración:
// import Ionicons from "@expo/vector-icons/Ionicons";
// o
// import Icon from 'react-native-vector-icons/Ionicons';

import { FormLoginSimple } from "./FormLoginSimple";

export default function LogueoView() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons
            name="home"
            size={24}
            color="#2563eb"
            style={styles.iconText}
          />
          <Text style={styles.headerTitle}>
            BUILD <Text style={styles.headerTitleBlue}>MART</Text>
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Iniciar Sesión</Text>
          <Text style={styles.cardDescription}>
            Ingresa tus credenciales para acceder a tu cuenta
          </Text>
        </View>

        <FormLoginSimple />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#ffffff",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  iconText: {
    fontSize: 24,
    color: "#2563eb",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  headerTitleBlue: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  cardHeader: {
    marginBottom: 24,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    textAlign: "center",
  },
});
