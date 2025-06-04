// components/Ventas/CambiarEstado/VentaInfo.jsx
import { View, Text } from "react-native";
import { getEstadoBadgeColorVenta } from "./utils/ButtonUtilsVentas";

export const VentaInfo = ({ venta, isAdmin }) => (
  <View className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 mb-6 border border-gray-200">
    <View className="flex-row items-center justify-between mb-3">
      <Text className="text-sm font-medium text-gray-600">
        Venta #{venta._id?.slice(-8) || "N/A"}
      </Text>
      {!isAdmin && (
        <View className="bg-blue-100 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-blue-700">
            Vista Cliente
          </Text>
        </View>
      )}
    </View>

    <View className="flex-row items-center justify-between mb-2">
      <Text className="text-base text-gray-700 mr-3">Estado actual:</Text>
      <View
        className={`px-3 py-1 rounded-full border ${getEstadoBadgeColorVenta(
          venta.estado
        )}`}>
        <Text className="text-sm font-bold capitalize">{venta.estado}</Text>
      </View>
    </View>

    {/* Información adicional de la venta */}
    <View className="mt-3 pt-3 border-t border-gray-200">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-sm text-gray-600">Total:</Text>
        <Text className="text-sm font-semibold text-gray-800">
          ${venta.total?.toLocaleString() || "0"}
        </Text>
      </View>

      {venta.clienteId && (
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-sm text-gray-600">Cliente:</Text>
          <Text className="text-sm font-medium text-gray-800">
            {venta.clienteId.nombre || venta.clienteId.correo || "Sin nombre"}
          </Text>
        </View>
      )}

      {venta.fecha && (
        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-gray-600">Fecha:</Text>
          <Text className="text-sm text-gray-800">
            {new Date(venta.fecha).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </View>
      )}
    </View>
  </View>
);
