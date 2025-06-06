import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "../../Pedidos/PedidosMain/Badge";
import { useNavigation } from "@react-navigation/native";
import { CambiarEstadoVenta } from "../CambiarEstado/CambiarEstadoVenta";
import { DetalleVentaModal } from "../DetalleVenta";

export const SalesCard = ({
  ventas, // Cambiado de venta a ventas para consistencia
  isAdmin,
  expandedOrder,
  onToggleExpanded,
  getStatusConfig,
  formatPrice,
  getNombreCliente,
}) => {
  const navigation = useNavigation();

  // ✅ Verificación de seguridad - si no hay datos, no renderizar
  if (!ventas || !ventas._id) {
    return null;
  }

  // ✅ Verificación de seguridad para estado
  const estado = ventas.estado || "pendiente";
  const statusConfig = getStatusConfig(estado);

  const isExpanded = expandedOrder === ventas._id;
  const [modalVisible, setModalVisible] = useState(false);

  const toggleExpanded = () => {
    onToggleExpanded(ventas._id);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View className="bg-white rounded-xl p-6 mb-4 shadow-lg border border-gray-100">
      {/* Header de la venta con gradiente sutil */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <View className="flex-row items-center space-x-2 mb-2">
            <Text className="text-xl font-bold text-gray-900">
              #VEN-{ventas.ventaId || String(ventas._id).slice(-4)}
            </Text>
            <View className="w-2 h-2 bg-green-500 rounded-full"></View>
          </View>
          <View className="flex-row items-center space-x-2">
            <Text className="text-sm text-gray-500 font-medium">
              {new Date(ventas.fecha).toLocaleDateString("es-CO", {
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
                {getNombreCliente(ventas)}
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
              statusConfig.textStyle.includes("blue")
                ? "#1E40AF"
                : statusConfig.textStyle.includes("purple")
                ? "#6B21A8"
                : statusConfig.textStyle.includes("green")
                ? "#166534"
                : statusConfig.textStyle.includes("emerald")
                ? "#065F46"
                : "#C2410C"
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
          Productos ({ventas.productos?.length || 0})
        </Text>
        {ventas.productos
          ?.slice(0, isExpanded ? ventas.productos.length : 2)
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
              <Text className="text-lg font-bold text-green-600">
                {formatPrice(
                  item.subtotalProducto ||
                    (item.productoId?.precio ||
                      item.item?.precio ||
                      item.precioUnitario) * item.cantidad
                )}
              </Text>
            </View>
          ))}

        {ventas.productos?.length > 2 && (
          <TouchableOpacity onPress={toggleExpanded} className="mt-3 py-2">
            <Text className="text-green-600 font-medium text-center">
              {isExpanded
                ? "Ver menos productos"
                : `Ver ${ventas.productos.length - 2} productos más`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Mostrar desglose de precios si está disponible */}
      {(ventas.subtotal || ventas.iva || ventas.descuento) && (
        <View className="mb-4 bg-gray-50 rounded-lg p-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Desglose
          </Text>
          {ventas.subtotal && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">Subtotal:</Text>
              <Text className="text-sm font-medium">
                {formatPrice(ventas.subtotal)}
              </Text>
            </View>
          )}
          {ventas.iva && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">IVA:</Text>
              <Text className="text-sm font-medium">
                {formatPrice(ventas.iva)}
              </Text>
            </View>
          )}
          {ventas.descuento && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">Descuento:</Text>
              <Text className="text-sm font-medium text-red-600">
                -{formatPrice(ventas.descuento)}
              </Text>
            </View>
          )}
          {/* Mostrar domicilio si existe */}
          {ventas.domicilio && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">Domicilio:</Text>
              <Text className="text-sm font-medium">
                {formatPrice(ventas.domicilio)}
              </Text>
            </View>
          )}
          {ventas.metodoPago && (
            <View className="mt-2 pt-2 border-t border-gray-200">
              <Text className="text-xs text-gray-500">
                Método de pago: {ventas.metodoPago}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Mostrar dirección de entrega si existe */}
      {ventas.direccionEntrega && (
        <View className="mb-4 bg-blue-50 rounded-lg p-4">
          <Text className="text-sm font-semibold text-blue-800 mb-1">
            Dirección de entrega
          </Text>
          <Text className="text-sm text-blue-700">
            {ventas.direccionEntrega}
          </Text>
        </View>
      )}

      {/* Total destacado */}
      <View className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-sm font-medium text-gray-600 mb-1">
              Total de la venta
            </Text>
            <Text className="text-2xl font-bold text-gray-900">
              {formatPrice(ventas.total)}
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

      {/* Modal de detalles de la venta */}
      <DetalleVentaModal
        visible={modalVisible}
        onClose={handleCloseModal}
        venta={ventas}
      />

      {/* Acciones específicas para ventas */}
      <View className="flex space-x-3">
        {isAdmin ? (
          // Vista para administradores - Acciones de venta
          <CambiarEstadoVenta venta={ventas} onEstadoCambiado={() => {}} />
        ) : (
          // Vista para clientes - Comprar nuevamente
          <TouchableOpacity
            onPress={() => navigation.navigate("catalogo")}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 14,
              paddingHorizontal: 20,
              borderRadius: 12,
              backgroundColor: "blue",
              borderWidth: 1,
              borderColor: "blue",
              shadowColor: "#16a34a",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 3,
            }}>
            <Ionicons
              name="refresh-outline"
              size={18}
              color="#ffffff"
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#ffffff",
                textAlign: "center",
              }}>
              Comprar Nuevamente
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
