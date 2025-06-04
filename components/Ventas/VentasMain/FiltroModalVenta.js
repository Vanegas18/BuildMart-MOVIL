import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const FiltroModalVentas = ({
  visible,
  onClose,
  estadoFiltro,
  onEstadoChange,
  onClearFilters,
}) => {
  const estadosDisponibles = [
    {
      value: "todos",
      label: "Todos los estados",
      icon: "list-outline",
      color: "#6B7280",
    },
    {
      value: "procesando",
      label: "Procesando",
      icon: "time-outline",
      color: "#3B82F6",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      value: "enviado",
      label: "Enviado",
      icon: "car-outline",
      color: "#F59E0B",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
    },
    {
      value: "entregado",
      label: "Entregado",
      icon: "checkmark-done-outline",
      color: "#8B5CF6",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
    },
    {
      value: "completado",
      label: "Completado",
      icon: "checkmark-circle-outline",
      color: "#10B981",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
    },
    {
      value: "reembolsado",
      label: "Reembolsado",
      icon: "return-down-back-outline",
      color: "#EF4444",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
  ];

  const getEstadoStyle = (estado, isSelected) => {
    if (estado.value === "todos") {
      return {
        bgClass: isSelected
          ? "bg-gray-100 border-gray-300"
          : "bg-gray-50 border-gray-200",
        textClass: isSelected ? "text-gray-800" : "text-gray-700",
        iconColor: isSelected ? "#374151" : "#6B7280",
      };
    }

    return {
      bgClass: isSelected
        ? `${estado.bgColor} ${estado.borderColor}`
        : "bg-gray-50 border-gray-200",
      textClass: isSelected ? estado.textColor : "text-gray-700",
      iconColor: isSelected ? estado.color : "#6B7280",
    };
  };

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
              Filtrar ventas
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full bg-gray-100">
              <Ionicons name="close" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          <Text className="text-sm font-semibold text-gray-700 mb-3">
            Estado de la venta
          </Text>

          {estadosDisponibles.map((estado) => {
            const isSelected = estadoFiltro === estado.value;
            const style = getEstadoStyle(estado, isSelected);

            return (
              <TouchableOpacity
                key={estado.value}
                onPress={() => {
                  onEstadoChange(estado.value);
                  onClose();
                }}
                className={`flex-row items-center p-3 mb-2 rounded-lg border ${style.bgClass}`}>
                <Ionicons
                  name={estado.icon}
                  size={20}
                  color={style.iconColor}
                />
                <Text className={`ml-3 font-medium ${style.textClass} flex-1`}>
                  {estado.label}
                </Text>
                {isSelected && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={style.iconColor}
                  />
                )}
              </TouchableOpacity>
            );
          })}

          <View className="flex-row space-x-3 mt-6">
            <TouchableOpacity
              onPress={() => {
                onClearFilters();
                onClose();
              }}
              className="flex-1 bg-gray-100 py-3 rounded-lg">
              <Text className="text-gray-700 font-medium text-center">
                Limpiar filtros
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-green-500 py-3 rounded-lg">
              <Text className="text-white font-medium text-center">
                Aplicar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
