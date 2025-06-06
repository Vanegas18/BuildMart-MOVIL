import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../core/context/Acceso/AuthContext";
import { useClientes } from "../../core/context/Clientes/ClientesContext";
import { useRouter } from "expo-router";
import Direcciones from "./Direcciones";

const PerfilCliente = () => {
  const router = useRouter();
  const { user, loading: loadingUser } = useAuth();
  const { perfil, perfilLoading, perfilError, recargarPerfil } = useClientes();

  // Prioriza mostrar el perfil extendido si existe, si no, muestra el user básico
  const datos = perfil || user;
  const cargando = perfilLoading || loadingUser;

  // Función para obtener las iniciales del nombre
  const obtenerIniciales = (nombre) => {
    if (!nombre) return "??";

    const palabras = nombre.trim().split(" ");
    let iniciales = "";

    // Tomar máximo 2 iniciales (primer nombre y segundo nombre/apellido)
    for (let i = 0; i < Math.min(2, palabras.length); i++) {
      if (palabras[i] && palabras[i].length > 0) {
        iniciales += palabras[i][0].toUpperCase();
      }
    }

    return iniciales || "??";
  };

  if (cargando) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>
          Cargando información de tu perfil...
        </Text>
      </View>
    );
  }

  if (perfilError) {
    return (
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>{perfilError}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={recargarPerfil}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!datos) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          No se encontró información del usuario.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Avatar y Bienvenida */}
        <View style={styles.headerCentered}>
          <View style={styles.avatarLarge}>
            <Text style={styles.inicialesText}>
              {obtenerIniciales(datos?.nombre)}
            </Text>
          </View>
          <Text style={styles.titleCentered}>Bienvenido</Text>
          <Text style={styles.nameCentered}>{datos?.nombre}</Text>
        </View>

        {/* Información del perfil */}
        <View style={styles.profileInfoSectionCentered}>
          <Text style={styles.sectionTitleCentered}>Información básica</Text>
          <View style={styles.infoRowCentered}>
            <Ionicons name="person-outline" size={20} color="#007AFF" />
            <Text style={styles.infoLabelCentered}>Nombre:</Text>
            <Text style={styles.infoValueCentered}>{datos?.nombre}</Text>
          </View>
          <View style={styles.infoRowCentered}>
            <Ionicons name="mail-outline" size={20} color="#007AFF" />
            <Text style={styles.infoLabelCentered}>Correo:</Text>
            <Text style={styles.infoValueCentered}>
              {datos?.correo || datos?.email}
            </Text>
          </View>
          <View style={styles.infoRowCentered}>
            <Ionicons name="call-outline" size={20} color="#007AFF" />
            <Text style={styles.infoLabelCentered}>Teléfono:</Text>
            <Text style={styles.infoValueCentered}>
              {datos?.telefono ||
                datos?.phone ||
                datos?.celular ||
                "No registrado"}
            </Text>
          </View>
        </View>

        {/* Botón para editar perfil */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/editar")}>
          <Ionicons name="pencil" size={20} color="#fff" />
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>

        {/* Direcciones del cliente */}
        <Direcciones cliente={datos} onClienteEditado={recargarPerfil} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingBottom: 30,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerCentered: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  avatarLarge: {
    backgroundColor: "#007AFF",
    borderRadius: 60,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  inicialesText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleCentered: {
    fontSize: 20,
    color: "#888",
    fontWeight: "600",
    marginBottom: 2,
    textAlign: "center",
  },
  nameCentered: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
    textAlign: "center",
  },
  emailCentered: {
    color: "#666",
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
  },
  profileInfoSectionCentered: {
    marginHorizontal: 30,
    marginBottom: 30,
    padding: 18,
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    alignItems: "center",
  },
  sectionTitleCentered: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  infoRowCentered: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
  },
  infoLabelCentered: {
    marginLeft: 8,
    fontWeight: "bold",
    color: "#333",
    fontSize: 16,
  },
  infoValueCentered: {
    marginLeft: 4,
    color: "#555",
    fontSize: 16,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 60,
    marginTop: 10,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    padding: 20,
    borderRadius: 8,
    margin: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#B91C1C",
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
  },
  retryButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5 },
  retryButtonText: { color: "#fff", fontWeight: "bold" },
});

export default PerfilCliente;
