import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "./Badge";
import { DetallePedidoModal } from "../DetallePedido";

export const OrderCard = ({
  pedido,
  isAdmin,
  expandedOrder,
  onToggleExpanded,
  getStatusConfig,
  formatPrice,
  getNombreCliente,
}) => {
  const statusConfig = getStatusConfig(pedido.estado);
  const isExpanded = expandedOrder === pedido._id;
  const [modalVisible, setModalVisible] = useState(false);

  const toggleExpanded = () => {
    onToggleExpanded(pedido._id);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View className="bg-white rounded-xl p-6 mb-4 shadow-lg border border-gray-100">
      {/* Header del pedido con gradiente sutil */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <View className="flex-row items-center space-x-2 mb-2">
            <Text className="text-xl font-bold text-gray-900">
              #PED-{pedido.pedidoId || String(pedido._id).slice(-4)}
            </Text>
            <View className="w-2 h-2 bg-blue-500 rounded-full"></View>
          </View>
          <View className="flex-row items-center space-x-2">
            <Text className="text-sm text-gray-500 font-medium">
              {new Date(pedido.fecha).toLocaleDateString("es-CO", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          {/* Mostrar nombre del cliente solo para admins */}
          {isAdmin && (
            <View className="flex-row items-center mt-1">
              <Ionicons name="person-outline" size={12} color="#9CA3AF" />
              <Text className="text-xs text-gray-400 ml-1">
                {getNombreCliente(pedido)}
              </Text>
            </View>
          )}
        </View>
        <Badge
          bgStyle={statusConfig.bgStyle}
          textStyle={statusConfig.textStyle}>
          <Ionicons
            name={statusConfig.icon}
            size={14}
            color={
              statusConfig.textStyle.includes("amber")
                ? "#92400E"
                : statusConfig.textStyle.includes("emerald")
                ? "#065F46"
                : "#991B1B"
            }
          />
          <Text className={`text-sm font-semibold ${statusConfig.textStyle}`}>
            {statusConfig.label}
          </Text>
        </Badge>
      </View>

      {/* Productos con mejor presentación */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Productos ({pedido.productos?.length || 0})
        </Text>
        {pedido.productos
          ?.slice(0, isExpanded ? pedido.productos.length : 2)
          .map((item, i) => (
            <View
              key={i}
              className="flex-row justify-between items-center py-3 border-b border-gray-50 last:border-b-0">
              <View className="flex-1 mr-4">
                <Text className="text-base font-medium text-gray-900 mb-1">
                  {item.productoId?.nombre || item.item?.nombre}
                </Text>
                <View className="flex-row items-center space-x-3">
                  <View className="bg-gray-100 px-2 py-1 rounded-lg">
                    <Text className="text-xs font-medium text-gray-600">
                      Cantidad: {item.cantidad}
                    </Text>
                  </View>
                  <Text className="text-sm text-gray-500">
                    {formatPrice(
                      item.productoId?.precio ||
                        item.item?.precio ||
                        item.precioUnitario
                    )}{" "}
                    c/u
                  </Text>
                </View>
              </View>
              <Text className="text-lg font-bold text-blue-600">
                {formatPrice(
                  item.subtotalProducto ||
                    (item.productoId?.precio ||
                      item.item?.precio ||
                      item.precioUnitario) * item.cantidad
                )}
              </Text>
            </View>
          ))}

        {pedido.productos?.length > 2 && (
          <TouchableOpacity onPress={toggleExpanded} className="mt-3 py-2">
            <Text className="text-blue-600 font-medium text-center">
              {isExpanded
                ? "Ver menos productos"
                : `Ver ${pedido.productos.length - 2} productos más`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Mostrar desglose de precios si está disponible */}
      {(pedido.subtotal || pedido.iva || pedido.domicilio) && (
        <View className="mb-4 bg-gray-50 rounded-lg p-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Desglose
          </Text>
          {pedido.subtotal && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">Subtotal:</Text>
              <Text className="text-sm font-medium">
                {formatPrice(pedido.subtotal)}
              </Text>
            </View>
          )}
          {pedido.iva && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">IVA:</Text>
              <Text className="text-sm font-medium">
                {formatPrice(pedido.iva)}
              </Text>
            </View>
          )}
          {pedido.domicilio && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">Domicilio:</Text>
              <Text className="text-sm font-medium">
                {formatPrice(pedido.domicilio)}
              </Text>
            </View>
          )}
          {pedido.direccionEntrega && (
            <View className="mt-2 pt-2 border-t border-gray-200">
              <Text className="text-xs text-gray-500">
                Dirección: {pedido.direccionEntrega}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Total destacado */}
      <View className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-sm font-medium text-gray-600 mb-1">
              Total del pedido
            </Text>
            <Text className="text-2xl font-bold text-gray-900">
              {formatPrice(pedido.total)}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex-row items-center space-x-2 shadow-sm"
            onPress={handleOpenModal}>
            <Ionicons name="eye-outline" size={18} color="#374151" />
            <Text className="text-gray-700 font-medium">Ver Detalles</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de detalles del pedido */}
      <DetallePedidoModal
        visible={modalVisible}
        onClose={handleCloseModal}
        pedido={pedido}
      />

      <View className="flex space-x-3">
        {isAdmin ? (
          // Vista para administradores - Solo cambiar estado
          <TouchableOpacity className="bg-amber-500 hover:bg-amber-600 flex-1 py-3 rounded-xl flex-row justify-center items-center space-x-2 shadow-sm">
            <Ionicons name="refresh-outline" size={18} color="white" />
            <Text className="text-white font-semibold">Cambiar Estado</Text>
          </TouchableOpacity>
        ) : // Vista para clientes
        pedido.estado === "pendiente" ? (
          // Pedido pendiente - mostrar cancelar
          <TouchableOpacity className="bg-red-500 hover:bg-red-600 flex-1 py-3 rounded-xl flex-row justify-center items-center space-x-2 shadow-sm">
            <Ionicons name="close" size={18} color="white" />
            <Text className="text-white font-semibold">Cancelar Pedido</Text>
          </TouchableOpacity>
        ) : (
          // Pedido confirmado/cancelado - mostrar comprar nuevamente
          <TouchableOpacity className="bg-blue-500 hover:bg-blue-600 flex-1 py-3 rounded-xl flex-row justify-center items-center space-x-2 shadow-sm">
            <Ionicons name="refresh-outline" size={18} color="white" />
            <Text className="text-white font-semibold">Comprar Nuevamente</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
