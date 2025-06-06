import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useClientes } from "../../core/context/Clientes/ClientesContext";

const Direcciones = ({ cliente, onClienteEditado }) => {
  const { editarCliente } = useClientes();
  const [editandoDireccion, setEditandoDireccion] = useState(null);
  const [agregandoDireccion, setAgregandoDireccion] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados para el formulario
  const [form, setForm] = useState({
    tipo: "",
    calle: "",
    ciudad: "",
    departamento: "",
    codigoPostal: "",
    esPrincipal: false,
  });

  const resetForm = () => setForm({
    tipo: "",
    calle: "",
    ciudad: "",
    departamento: "",
    codigoPostal: "",
    esPrincipal: false,
  });

  const handleEditarDireccion = (direccion) => {
    setForm({
      tipo: direccion.tipo,
      calle: direccion.calle,
      ciudad: direccion.ciudad,
      departamento: direccion.departamento,
      codigoPostal: direccion.codigoPostal || "",
      esPrincipal: direccion.esPrincipal,
    });
    setEditandoDireccion(direccion._id);
    setAgregandoDireccion(false);
  };

  const handleAgregarDireccion = () => {
    resetForm();
    setEditandoDireccion(null);
    setAgregandoDireccion(true);
  };

  const handleCancelar = () => {
    setEditandoDireccion(null);
    setAgregandoDireccion(false);
    resetForm();
  };

  const handleEliminarDireccion = async (direccionId) => {
    Alert.alert(
      "Eliminar dirección",
      "¿Estás seguro de eliminar esta dirección?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              const nuevasDirecciones = cliente.direcciones.filter(
                (d) => d._id !== direccionId
              );
              await editarCliente({
                ...cliente,
                direcciones: nuevasDirecciones,
              });
              onClienteEditado && onClienteEditado();
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la dirección");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleGuardar = async () => {
    setLoading(true);
    try {
      let nuevasDirecciones = [...(cliente.direcciones || [])];

      // Si la nueva dirección se marca como principal, quitar la marca de otras direcciones
      if (form.esPrincipal) {
        nuevasDirecciones = nuevasDirecciones.map((dir) => ({
          ...dir,
          esPrincipal: false,
        }));
      }

      if (editandoDireccion) {
        // Actualizar dirección existente
        nuevasDirecciones = nuevasDirecciones.map((dir) =>
          dir._id === editandoDireccion ? { ...dir, ...form } : dir
        );
      } else if (agregandoDireccion) {
        // Agregar nueva dirección
        nuevasDirecciones.push({
          ...form,
          _id: Date.now().toString(), // Genera un id temporal
        });
      }

      await editarCliente({
        ...cliente,
        direcciones: nuevasDirecciones,
      });
      onClienteEditado && onClienteEditado();
      setEditandoDireccion(null);
      setAgregandoDireccion(false);
      resetForm();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la dirección");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Direcciones</Text>
      <ScrollView style={{ maxHeight: 600 }}>
        {(cliente.direcciones && cliente.direcciones.length > 0) ? (
          cliente.direcciones.map((direccion) => (
            <View key={direccion._id} style={styles.direccionBox}>
              {editandoDireccion === direccion._id ? (
                <DireccionForm
                  form={form}
                  setForm={setForm}
                  onGuardar={handleGuardar}
                  onCancelar={handleCancelar}
                  loading={loading}
                />
              ) : (
                <>
                  <View style={styles.direccionHeader}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      {direccion.esPrincipal && (
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>Principal</Text>
                        </View>
                      )}
                      <Text style={styles.direccionTipo}>{direccion.tipo}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => handleEditarDireccion(direccion)}
                      >
                        <Icon name="edit" size={20} color="#007AFF" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => handleEliminarDireccion(direccion._id)}
                        disabled={loading}
                      >
                        <Icon name="delete" size={20} color="#B91C1C" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.direccionText}>{direccion.calle}</Text>
                  <Text style={styles.direccionText}>
                    {direccion.ciudad}, {direccion.departamento}
                    {direccion.codigoPostal ? ` - ${direccion.codigoPostal}` : ""}
                  </Text>
                </>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noDirecciones}>No hay direcciones registradas</Text>
        )}
        {agregandoDireccion && (
          <View style={styles.direccionBox}>
            <Text style={styles.nuevaDireccionTitle}>Nueva Dirección</Text>
            <DireccionForm
              form={form}
              setForm={setForm}
              onGuardar={handleGuardar}
              onCancelar={handleCancelar}
              loading={loading}
            />
          </View>
        )}
        {!agregandoDireccion && (
          <TouchableOpacity style={styles.addBtn} onPress={handleAgregarDireccion}>
            <Icon name="add-location-alt" size={22} color="#007AFF" />
            <Text style={styles.addBtnText}>Añadir Nueva Dirección</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const DireccionForm = ({ form, setForm, onGuardar, onCancelar, loading }) => (
  <View>
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Tipo</Text>
      <TextInput
        style={styles.input}
        value={form.tipo}
        onChangeText={(v) => setForm((f) => ({ ...f, tipo: v }))}
        placeholder="Casa, Trabajo, Otro"
        placeholderTextColor="#bbb"
      />
    </View>
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Dirección</Text>
      <TextInput
        style={styles.input}
        value={form.calle}
        onChangeText={(v) => setForm((f) => ({ ...f, calle: v }))}
        placeholder="Carrera 97 # 70D-10, Piso 3, Apto 302"
        placeholderTextColor="#bbb"
      />
    </View>
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Ciudad</Text>
      <TextInput
        style={styles.input}
        value={form.ciudad}
        onChangeText={(v) => setForm((f) => ({ ...f, ciudad: v }))}
        placeholder="Medellín"
        placeholderTextColor="#bbb"
      />
    </View>
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Departamento</Text>
      <TextInput
        style={styles.input}
        value={form.departamento}
        onChangeText={(v) => setForm((f) => ({ ...f, departamento: v }))}
        placeholder="Antioquia"
        placeholderTextColor="#bbb"
      />
    </View>
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Código Postal</Text>
      <TextInput
        style={styles.input}
        value={form.codigoPostal}
        onChangeText={(v) => setForm((f) => ({ ...f, codigoPostal: v }))}
        placeholder="Opcional"
        placeholderTextColor="#bbb"
      />
    </View>
    <View style={styles.checkboxRow}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setForm((f) => ({ ...f, esPrincipal: !f.esPrincipal }))}
      >
        <View style={[styles.checkboxBox, form.esPrincipal && styles.checkboxChecked]}>
          {form.esPrincipal && <Icon name="check" size={16} color="#fff" />}
        </View>
        <Text style={styles.checkboxLabel}>Establecer como dirección principal</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.formBtnRow}>
      <TouchableOpacity style={styles.cancelBtn} onPress={onCancelar} disabled={loading}>
        <Text style={styles.cancelBtnText}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveBtn} onPress={onGuardar} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveBtnText}>Guardar</Text>
        )}
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    margin: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 14,
    color: "#222",
    textAlign: "center",
  },
  direccionBox: {
    backgroundColor: "#F7F9FC",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  direccionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  badge: {
    backgroundColor: "#007AFF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  direccionTipo: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#007AFF",
  },
  direccionText: {
    color: "#444",
    fontSize: 15,
    marginTop: 2,
  },
  iconBtn: {
    marginLeft: 8,
    padding: 4,
  },
  noDirecciones: {
    color: "#888",
    textAlign: "center",
    marginVertical: 16,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#F3F6FA",
  },
  addBtnText: {
    color: "#007AFF",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  nuevaDireccionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    color: "#007AFF",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: "#fff",
    color: "#222",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#007AFF",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  checkboxLabel: {
    color: "#222",
    fontSize: 15,
  },
  formBtnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  cancelBtn: {
    backgroundColor: "#e0e7ef",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelBtnText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Direcciones;