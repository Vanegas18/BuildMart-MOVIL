import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const FiltroModal = ({
  visible,
  onClose,
  estadoFiltro,
  onEstadoChange,
  onClearFilters,
}) => {
  const estadosDisponibles = [
    { value: "todos", label: "Todos los estados", icon: "list-outline" },
    { value: "pendiente", label: "Pendiente", icon: "cube-outline" },
    {
      value: "confirmado",
      label: "Confirmado",
      icon: "checkmark-circle-outline",
    },
    { value: "cancelado", label: "Cancelado", icon: "close-circle-outline" },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-900">
              Filtrar pedidos
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full bg-gray-100">
              <Ionicons name="close" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          <Text className="text-sm font-semibold text-gray-700 mb-3">
            Estado del pedido
          </Text>

          {estadosDisponibles.map((estado) => (
            <TouchableOpacity
              key={estado.value}
              onPress={() => {
                onEstadoChange(estado.value);
                onClose();
              }}
              className={`flex-row items-center p-3 mb-2 rounded-lg border ${
                estadoFiltro === estado.value
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
              }`}>
              <Ionicons
                name={estado.icon}
                size={20}
                color={estadoFiltro === estado.value ? "#3B82F6" : "#6B7280"}
              />
              <Text
                className={`ml-3 font-medium ${
                  estadoFiltro === estado.value
                    ? "text-blue-700"
                    : "text-gray-700"
                }`}>
                {estado.label}
              </Text>
              {estadoFiltro === estado.value && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#3B82F6"
                  className="ml-auto"
                />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={() => {
              onClearFilters();
              onClose();
            }}
            className="bg-gray-100 py-3 rounded-lg mt-4">
            <Text className="text-gray-700 font-medium text-center">
              Limpiar filtros
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
