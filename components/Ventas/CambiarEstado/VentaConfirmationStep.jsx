// components/Ventas/CambiarEstadoVenta/VentaConfirmationStep.jsx
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const VentaConfirmationStep = ({
  venta,
  isAdmin,
  selectedEstado,
  estadosDisponibles,
  isLoading,
  onClose,
  onConfirm,
}) => {
  const estadoLabel = estadosDisponibles.find(
    (e) => e.value === selectedEstado
  )?.label;

  // Determinar el tipo de acción y sus colores
  const getActionConfig = () => {
    switch (selectedEstado) {
      case "reembolsado":
        return {
          isDestructive: true,
          icon: "return-down-back",
          bgColor: "bg-red-100",
          iconColor: "#EF4444",
          confirmBg: "bg-red-500",
          borderColor: "border-red-200",
        };
      case "completado":
        return {
          isDestructive: false,
          icon: "checkmark-circle",
          bgColor: "bg-green-100",
          iconColor: "#10B981",
          confirmBg: "bg-green-500",
          borderColor: "border-green-200",
        };
      case "entregado":
        return {
          isDestructive: false,
          icon: "checkmark-done",
          bgColor: "bg-purple-100",
          iconColor: "#8B5CF6",
          confirmBg: "bg-purple-500",
          borderColor: "border-purple-200",
        };
      case "enviado":
        return {
          isDestructive: false,
          icon: "car",
          bgColor: "bg-amber-100",
          iconColor: "#F59E0B",
          confirmBg: "bg-amber-500",
          borderColor: "border-amber-200",
        };
      default:
        return {
          isDestructive: false,
          icon: "help-circle",
          bgColor: "bg-blue-100",
          iconColor: "#3B82F6",
          confirmBg: "bg-blue-500",
          borderColor: "border-blue-200",
        };
    }
  };

  const actionConfig = getActionConfig();

  return (
    <View className="p-6">
      {/* Header visual */}
      <View className="items-center mb-8">
        <View
          className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${actionConfig.bgColor}`}>
          <Ionicons
            name={actionConfig.icon}
            size={40}
            color={actionConfig.iconColor}
          />
        </View>

        <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
          {actionConfig.isDestructive
            ? "Confirmar Reembolso"
            : "Confirmar Acción"}
        </Text>
      </View>

      {/* Mensaje de confirmación */}
      <View
        className={`border-2 rounded-2xl p-6 mb-8 ${actionConfig.bgColor} ${actionConfig.borderColor}`}>
        <Text className="text-center text-gray-800 leading-relaxed text-base">
          {actionConfig.isDestructive ? (
            <>
              ¿Está seguro de que desea{" "}
              <Text className="font-bold text-red-600">
                procesar el reembolso
              </Text>{" "}
              para la venta{" "}
              <Text className="font-bold">#{venta._id?.slice(-6)}</Text>?
            </>
          ) : (
            <>
              ¿Está seguro de que desea{" "}
              {isAdmin ? "cambiar el estado de la" : "actualizar la"} venta{" "}
              <Text className="font-bold">#{venta._id?.slice(-6)}</Text>
              {isAdmin ? " a " : " - "}
              <Text className="font-bold">{estadoLabel}</Text>?
            </>
          )}
        </Text>

        <View className="bg-white rounded-xl p-4 mt-4 border border-gray-200">
          <Text className="text-orange-600 font-bold text-center text-sm">
            ⚠️ Esta acción
            {actionConfig.isDestructive
              ? " iniciará el proceso de reembolso"
              : " no se puede deshacer"}
          </Text>
        </View>

        {/* Información adicional de la venta */}
        <View className="bg-white rounded-xl p-3 mt-3 border border-gray-200">
          <Text className="text-xs text-gray-600 text-center">
            Cliente:{" "}
            <Text className="font-semibold">
              {venta.clienteId?.nombre || venta.clienteId?.correo}
            </Text>
          </Text>
          <Text className="text-xs text-gray-600 text-center mt-1">
            Total:{" "}
            <Text className="font-semibold">
              ${venta.total?.toLocaleString()}
            </Text>
          </Text>
        </View>
      </View>

      {/* Botones de acción */}
      <View className="flex-row space-x-4">
        <TouchableOpacity
          onPress={onClose}
          disabled={isLoading}
          className="flex-1 bg-gray-100 py-4 rounded-2xl border border-gray-200">
          <Text className="text-gray-700 font-bold text-center text-base">
            Cancelar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onConfirm}
          disabled={isLoading}
          className={`flex-1 py-4 rounded-2xl ${
            isLoading ? "bg-gray-300" : actionConfig.confirmBg
          }`}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text className="text-white font-bold text-center text-base">
              {actionConfig.isDestructive ? "Procesar Reembolso" : "Confirmar"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
