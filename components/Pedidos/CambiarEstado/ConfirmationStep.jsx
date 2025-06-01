import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ConfirmationStep = ({
  pedido,
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
  const isCancelacion = selectedEstado === "rechazado" && !isAdmin;

  return (
    <View className="p-6">
      {/* Header visual */}
      <View className="items-center mb-8">
        <View
          className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${
            isCancelacion ? "bg-red-100" : "bg-yellow-100"
          }`}>
          <Ionicons
            name={isCancelacion ? "warning" : "help-circle"}
            size={40}
            color={isCancelacion ? "#EF4444" : "#F59E0B"}
          />
        </View>

        <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
          {isCancelacion ? "Cancelar Pedido" : "Confirmar Acción"}
        </Text>
      </View>

      {/* Mensaje de confirmación */}
      <View
        className={`border-2 rounded-2xl p-6 mb-8 ${
          isCancelacion
            ? "bg-red-50 border-red-200"
            : "bg-yellow-50 border-yellow-200"
        }`}>
        <Text className="text-center text-gray-800 leading-relaxed text-base">
          {isCancelacion ? (
            <>
              ¿Está seguro de que desea{" "}
              <Text className="font-bold text-red-600">cancelar</Text> el pedido{" "}
              <Text className="font-bold">#{pedido.pedidoId}</Text>?
            </>
          ) : (
            <>
              ¿Está seguro de que desea{" "}
              {isAdmin ? "cambiar el estado del" : "realizar esta acción en el"}{" "}
              pedido <Text className="font-bold">#{pedido.pedidoId}</Text>
              {isAdmin ? " a " : " - "}
              <Text className="font-bold">{estadoLabel}</Text>?
            </>
          )}
        </Text>

        <View className="bg-white rounded-xl p-4 mt-4 border border-gray-200">
          <Text className="text-red-600 font-bold text-center text-sm">
            ⚠️ Esta acción no se puede deshacer
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
            isLoading
              ? "bg-gray-300"
              : isCancelacion
              ? "bg-red-500"
              : "bg-blue-500"
          }`}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text className="text-white font-bold text-center text-base">
              {isCancelacion ? "Cancelar Pedido" : "Confirmar"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
