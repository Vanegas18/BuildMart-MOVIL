import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const DetallePedidoModal = ({ visible, onClose, pedido }) => {
  if (!pedido) return null;

  const generateCompraId = (pedido) => {
    if (pedido.pedidoId !== undefined && pedido.pedidoId !== null) {
      return `PED-${pedido.pedidoId.toString().padStart(3, "0")}`;
    }
    if (pedido._id) {
      const idStr = pedido._id.toString();
      const lastThree = idStr.slice(-3);
      return `PED-${lastThree}`;
    }
    return "PED-000";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "pendiente":
        return {
          label: "Pendiente",
          bgStyle: "bg-amber-100",
          textStyle: "text-amber-800",
          icon: "time-outline",
          iconColor: "#92400E",
        };
      case "confirmado":
        return {
          label: "Confirmado",
          bgStyle: "bg-emerald-100",
          textStyle: "text-emerald-800",
          icon: "checkmark-circle-outline",
          iconColor: "#065F46",
        };
      case "cancelado":
        return {
          label: "Cancelado",
          bgStyle: "bg-red-100",
          textStyle: "text-red-800",
          icon: "close-circle-outline",
          iconColor: "#991B1B",
        };
      default:
        return {
          label: "Rechazado",
          bgStyle: "bg-red-100",
          textStyle: "text-red-800",
          icon: "close-circle-outline",
          iconColor: "#991B1B",
        };
    }
  };

  const StatusBadge = ({ status }) => {
    const config = getStatusConfig(status);
    return (
      <View
        className={`${config.bgStyle} px-3 py-2 rounded-full flex-row items-center space-x-2`}>
        <Ionicons name={config.icon} size={16} color={config.iconColor} />
        <Text className={`${config.textStyle} font-semibold text-sm`}>
          {config.label}
        </Text>
      </View>
    );
  };

  const fechaFormateada = new Date(pedido.fecha).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

        {/* Header */}
        <View className="bg-white border-b border-gray-200 px-6 py-4">
          <View className="flex-row items-center justify-between mb-2">
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full bg-gray-100 -ml-2">
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
            <StatusBadge status={pedido.estado} />
          </View>

          <View className="flex-row items-center space-x-3 mb-2">
            <Ionicons name="receipt-outline" size={24} color="#3B82F6" />
            <Text className="text-xl font-bold text-gray-900">
              {generateCompraId(pedido)}
            </Text>
          </View>

          <Text className="text-gray-600 text-base">
            Información completa del pedido y productos
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-6 py-4"
          showsVerticalScrollIndicator={false}>
          {/* Información General */}
          <View className="bg-white rounded-xl p-6 mb-4 shadow-sm border border-gray-100">
            <Text className="text-lg font-bold text-gray-900 mb-6">
              Información General
            </Text>

            {/* ID y Fecha */}
            <View className="space-y-6">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <View className="flex-row items-center space-x-2 mb-2">
                    <Ionicons name="id-card" size={20} color="#6B7280" />
                    <Text className="text-gray-700 font-medium">
                      ID del Pedido
                    </Text>
                  </View>
                  <Text className="text-gray-900 font-semibold ml-7">
                    {generateCompraId(pedido)}
                  </Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center space-x-2 mb-2">
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#6B7280"
                    />
                    <Text className="text-gray-700 font-medium">Fecha</Text>
                  </View>
                  <Text className="text-gray-900 font-semibold ml-7">
                    {fechaFormateada}
                  </Text>
                </View>
              </View>

              {/* Cliente */}
              <View>
                <View className="flex-row items-center space-x-2 mb-2">
                  <Ionicons name="person-outline" size={20} color="#6B7280" />
                  <Text className="text-gray-700 font-medium">Cliente</Text>
                </View>
                <Text className="text-gray-900 font-semibold ml-7">
                  {pedido.clienteId?.nombre || "Sin nombre"}
                </Text>
              </View>

              {/* Información de Contacto */}
              <View className="border-t border-gray-100 pt-6">
                <Text className="text-gray-700 font-medium mb-4">
                  Información de Contacto
                </Text>

                <View className="space-y-4">
                  <View>
                    <View className="flex-row items-center space-x-2 mb-1">
                      <Ionicons name="call-outline" size={16} color="#6B7280" />
                      <Text className="text-sm text-gray-600">Teléfono</Text>
                    </View>
                    <Text className="text-gray-900 ml-6">
                      {pedido.clienteId?.telefono || "No disponible"}
                    </Text>
                  </View>

                  <View>
                    <View className="flex-row items-center space-x-2 mb-1">
                      <Ionicons name="mail-outline" size={16} color="#6B7280" />
                      <Text className="text-sm text-gray-600">
                        Correo Electrónico
                      </Text>
                    </View>
                    <Text className="text-gray-900 ml-6">
                      {pedido.clienteId?.correo || "No disponible"}
                    </Text>
                  </View>

                  <View>
                    <View className="flex-row items-center space-x-2 mb-1">
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color="#6B7280"
                      />
                      <Text className="text-sm text-gray-600">
                        Dirección de Entrega
                      </Text>
                    </View>
                    <Text className="text-gray-900 ml-6">
                      {pedido.direccionEntrega || "No especificada"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Productos */}
          <View className="bg-white rounded-xl p-6 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center space-x-2">
                <Ionicons name="cube-outline" size={20} color="#6B7280" />
                <Text className="text-lg font-bold text-gray-900">
                  Productos del Pedido
                </Text>
              </View>
              <View className="bg-blue-100 px-3 py-1 rounded-full">
                <Text className="text-blue-800 font-semibold text-sm">
                  {pedido.productos?.length || 0}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 text-sm mb-4">
              Lista de productos incluidos en este pedido
            </Text>

            {pedido.productos?.length === 0 ? (
              <View className="py-8 items-center">
                <Ionicons name="cube-outline" size={48} color="#D1D5DB" />
                <Text className="text-gray-500 text-center mt-2">
                  No hay productos en este pedido
                </Text>
              </View>
            ) : (
              <View className="space-y-4">
                {pedido.productos?.map((producto, index) => {
                  const precioUnitario = producto.precioUnitario || 0;
                  const precioOriginal =
                    producto.precioOriginal || precioUnitario;
                  const enOferta = producto.enOferta === true;
                  const subtotalProducto =
                    producto.subtotalProducto ||
                    precioUnitario * producto.cantidad;

                  return (
                    <View
                      key={index}
                      className="border border-gray-100 rounded-lg p-4">
                      <View className="flex-row justify-between items-start mb-3">
                        <Text className="text-gray-900 font-semibold flex-1 text-base">
                          {producto.productoId?.nombre || "Producto"}
                        </Text>
                        <View className="bg-gray-100 px-2 py-1 rounded-md ml-2">
                          <Text className="text-gray-700 font-medium text-sm">
                            x{producto.cantidad}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row justify-between items-end">
                        <View>
                          <Text className="text-gray-600 text-sm">
                            Precio unitario
                          </Text>
                          <View>
                            <Text className="text-gray-900 font-semibold">
                              {formatPrice(precioUnitario)}
                            </Text>
                            {enOferta && precioOriginal > precioUnitario && (
                              <Text className="text-gray-500 text-sm line-through">
                                {formatPrice(precioOriginal)}
                              </Text>
                            )}
                          </View>
                        </View>

                        <View className="items-end">
                          <Text className="text-gray-600 text-sm">
                            Subtotal
                          </Text>
                          <Text className="text-blue-600 font-bold text-lg">
                            {formatPrice(subtotalProducto)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {/* Resumen del Pedido */}
          <View className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
            <View className="flex-row items-center space-x-2 mb-4">
              <Ionicons name="calculator-outline" size={20} color="#6B7280" />
              <Text className="text-lg font-bold text-gray-900">
                Resumen del Pedido
              </Text>
            </View>

            <View className="space-y-3">
              {/* Subtotal */}
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600 text-base">Subtotal:</Text>
                <Text className="text-gray-900 font-semibold text-base">
                  {formatPrice(pedido.subtotal || 0)}
                </Text>
              </View>

              {/* IVA */}
              {pedido.iva && pedido.iva > 0 && (
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-600 text-base">IVA:</Text>
                  <Text className="text-gray-900 font-semibold text-base">
                    {formatPrice(Number(pedido.iva) || 0)}
                  </Text>
                </View>
              )}

              {/* Domicilio */}
              {pedido.domicilio && pedido.domicilio > 0 && (
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center space-x-2">
                    <Ionicons name="car-outline" size={16} color="#6B7280" />
                    <Text className="text-gray-600 text-base">Domicilio:</Text>
                  </View>
                  <Text className="text-gray-900 font-semibold text-base">
                    {formatPrice(pedido.domicilio)}
                  </Text>
                </View>
              )}

              {/* Separador */}
              <View className="border-t border-gray-200 my-4"></View>

              {/* Total */}
              <View className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-900 font-bold text-lg">
                    Total:
                  </Text>
                  <Text className="text-blue-600 font-bold text-2xl">
                    {formatPrice(pedido.total)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer con botón de cerrar */}
        <View className="bg-white border-t border-gray-200 px-6 py-4">
          <TouchableOpacity
            onPress={onClose}
            className="bg-blue-500 hover:bg-blue-600 py-4 rounded-xl flex-row justify-center items-center">
            <Text className="text-white font-semibold text-lg">Cerrar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
