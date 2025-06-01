// components/CambiarEstado/components/PedidoInfo.jsx
import { View, Text } from "react-native";
import { getEstadoBadgeColor } from "./utils/buttonUtils";

export const PedidoInfo = ({ pedido, isAdmin }) => (
  <View className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 mb-6 border border-gray-200">
    <View className="flex-row items-center justify-between mb-3">
      <Text className="text-sm font-medium text-gray-600">
        Pedido #{pedido.pedidoId}
      </Text>
      {!isAdmin && (
        <View className="bg-blue-100 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-blue-700">
            Vista Cliente
          </Text>
        </View>
      )}
    </View>

    <View className="flex-row items-center">
      <Text className="text-base text-gray-700 mr-3">Estado actual:</Text>
      <View
        className={`px-3 py-1 rounded-full border ${getEstadoBadgeColor(
          pedido.estado
        )}`}>
        <Text className="text-sm font-bold capitalize">{pedido.estado}</Text>
      </View>
    </View>
  </View>
);
