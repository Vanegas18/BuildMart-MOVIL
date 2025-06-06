import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useClientes } from "../../core/context/Clientes/ClientesContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const EditarPerfil = () => {
  const router = useRouter();
  const { perfil, editarCliente, recargarPerfil } = useClientes();
  const [nombre, setNombre] = useState(perfil?.nombre || "");
  const [correo, setCorreo] = useState(perfil?.correo || perfil?.email || "");
  const [telefono, setTelefono] = useState(
    perfil?.telefono || perfil?.phone || perfil?.celular || ""
  );
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    setLoading(true);
    try {
      // Solo envía los campos que queremos actualizar
      const datosActualizados = {
        _id: perfil._id, // Necesario para identificar el registro
        nombre,
        correo,
        telefono,
      };

      await editarCliente(datosActualizados);
      await recargarPerfil();
      Toast.show({
        type: "success",
        text1: "Éxito!",
        text2: "Perfil actualizado correctamente",
      });

      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "No se pudo actualizar el perfil",
        text2: error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Icon name="person" size={60} color="#fff" />
        </View>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>
      <View style={styles.formCard}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre completo"
            placeholderTextColor="#bbb"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#bbb"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
            placeholder="Teléfono"
            keyboardType="phone-pad"
            placeholderTextColor="#bbb"
          />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleGuardar}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.saveButtonContent}>
              <Icon name="save" size={22} color="#fff" />
              <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
          disabled={loading}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F3F6FA",
    padding: 0,
    justifyContent: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: "#007AFF",
    borderRadius: 50,
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
    textAlign: "center",
  },
  formCard: {
    backgroundColor: "#fff",
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F7F9FC",
    color: "#222",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  saveButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 8,
  },
  cancelButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#e0e7ef",
  },
  cancelButtonText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditarPerfil;
