// components/Ventas/CambiarEstadoVenta/EstadoSelectorVenta.jsx
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export const EstadoSelectorVenta = ({
  isAdmin,
  estadosDisponibles,
  selectedEstado,
  setSelectedEstado,
  isConfirmed,
  setIsConfirmed,
  venta,
}) => {
  // Mensaje de confirmación personalizado según el contexto
  const getConfirmationMessage = () => {
    if (isAdmin) {
      return "Confirmo que deseo cambiar el estado de esta venta y entiendo las implicaciones de esta acción.";
    }

    switch (venta.estado) {
      case "procesando":
        return "Confirmo que deseo solicitar el reembolso de esta venta y entiendo que este proceso puede tomar varios días.";
      case "enviado":
        return "Confirmo que he recibido mi pedido y deseo actualizar el estado de la venta.";
      case "entregado":
        return "Confirmo la recepción completa de mi pedido y estoy satisfecho con la entrega.";
      default:
        return "Confirmo que deseo realizar esta acción y entiendo que puede ser irreversible.";
    }
  };

  return (
    <View className="space-y-6">
      {/* Selector de estado */}
      <View>
        <Text className="text-lg font-bold text-gray-900 mb-4">
          {isAdmin ? "Seleccionar nuevo estado:" : "Acción disponible:"}
        </Text>

        <View className="border-2 border-gray-200 rounded-2xl bg-gray-50 overflow-hidden">
          <Picker
            selectedValue={selectedEstado}
            onValueChange={setSelectedEstado}
            style={{ height: 60 }}>
            <Picker.Item
              label={
                isAdmin ? "Selecciona un estado..." : "Selecciona una acción..."
              }
              value=""
              color="#9CA3AF"
            />
            {estadosDisponibles.map((estado) => (
              <Picker.Item
                key={estado.value}
                label={estado.label}
                value={estado.value}
                color="#374151"
              />
            ))}
          </Picker>
        </View>

        {/* Información adicional según el estado seleccionado */}
        {selectedEstado && (
          <View className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
            <Text className="text-sm text-blue-800 text-center">
              {selectedEstado === "reembolsado" &&
                "💰 El reembolso será procesado en 3-5 días hábiles"}
              {selectedEstado === "completado" &&
                "✅ La venta será marcada como completada exitosamente"}
              {selectedEstado === "entregado" &&
                "📦 El pedido será marcado como entregado al cliente"}
              {selectedEstado === "enviado" &&
                "🚚 El pedido será marcado como enviado"}
            </Text>
          </View>
        )}
      </View>

      {/* Checkbox de confirmación */}
      <TouchableOpacity
        onPress={() => setIsConfirmed(!isConfirmed)}
        className="flex-row items-start p-4 bg-orange-50 rounded-2xl border border-orange-200">
        <View
          className={`w-6 h-6 rounded-lg border-2 items-center justify-center mr-4 mt-0.5 ${
            isConfirmed
              ? "bg-orange-500 border-orange-500"
              : "border-gray-300 bg-white"
          }`}>
          {isConfirmed && <Ionicons name="checkmark" size={16} color="white" />}
        </View>

        <Text className="text-sm text-gray-700 flex-1 leading-relaxed font-medium">
          {getConfirmationMessage()}
        </Text>
      </TouchableOpacity>

      {/* Información de la venta */}
      <View className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Detalles de la venta:
        </Text>
        <View className="space-y-1">
          <Text className="text-xs text-gray-600">
            ID: <Text className="font-mono">{venta._id?.slice(-8)}</Text>
          </Text>
          <Text className="text-xs text-gray-600">
            Estado actual:{" "}
            <Text className="font-semibold capitalize">{venta.estado}</Text>
          </Text>
          <Text className="text-xs text-gray-600">
            Total:{" "}
            <Text className="font-semibold">
              ${venta.total?.toLocaleString()}
            </Text>
          </Text>
          {!isAdmin && (
            <Text className="text-xs text-gray-600">
              Cliente:{" "}
              <Text className="font-semibold">
                {venta.clienteId?.nombre || venta.clienteId?.correo}
              </Text>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
