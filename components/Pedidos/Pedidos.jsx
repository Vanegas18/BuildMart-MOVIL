import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useAuth } from "../../core/context/Acceso/AuthContext";
import { usePedidos } from "../../core/context/Pedidos/PedidosContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DetallePedidoModal } from "./DetallePedido";

export const Pedidos = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCuentaRol, setIsCuentaRol] = useState(false);
  const { user, isAuthenticated, checkAuthStatus } = useAuth();
  const { pedidos, obtenerPedidos } = usePedidos();
  const navigation = useNavigation();
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Efecto para verificar el rol del usuario
  useEffect(() => {
    const verifyRoles = async () => {
      if (isAuthenticated && (!user || !user.rol)) {
        await checkAuthStatus();
      }

      setIsCuentaRol(user?.rol === "67cb9a96a5866273d8830fb0");
      setIsAdmin(
        user?.rol === "67cb9a4fa5866273d8830fad" &&
          user?.rol !== "67cb9a96a5866273d8830fb0"
      );
    };

    verifyRoles();
  }, [user, isAuthenticated, checkAuthStatus]);

  // Efecto para obtener los pedidos
  useEffect(() => {
    obtenerPedidos();
  }, [obtenerPedidos]);

  // Estados y estilos del badge
  const getStatusConfig = (status) => {
    switch (status) {
      case "pendiente":
        return {
          label: "Pendiente",
          bgStyle: "bg-amber-50 border-amber-200",
          textStyle: "text-amber-800",
          icon: "cube-outline",
        };
      case "confirmado":
        return {
          label: "Confirmado",
          bgStyle: "bg-emerald-50 border-emerald-200",
          textStyle: "text-emerald-800",
          icon: "checkmark-circle-outline",
        };
      case "cancelado":
        return {
          label: "Cancelado",
          bgStyle: "bg-red-50 border-red-200",
          textStyle: "text-red-800",
          icon: "close-circle-outline",
        };
      default:
        return {
          label: "Cancelado",
          bgStyle: "bg-red-50 border-red-200",
          textStyle: "text-red-800",
          icon: "close-circle-outline",
        };
    }
  };

  // Formateo del precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Badge mejorado
  const Badge = ({ children, bgStyle, textStyle }) => (
    <View
      className={`${bgStyle} border px-3 py-1.5 rounded-full flex-row items-center space-x-1`}>
      {children}
    </View>
  );

  // Componente para cada pedido con diseño mejorado
  const OrderCard = ({ pedido }) => {
    const statusConfig = getStatusConfig(pedido.estado);
    const isExpanded = expandedOrder === pedido._id;
    const [modalVisible, setModalVisible] = useState(false);

    const toggleExpanded = () => {
      setExpandedOrder(expandedOrder === pedido._id ? null : pedido._id);
    };

    // Función para abrir el modal
    const handleOpenModal = () => {
      setModalVisible(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
      setModalVisible(false);
    };

    return (
      <View className="bg-white rounded-xl p-6 mb-4 shadow-lg border border-gray-100">
        {/* Header del pedido con gradiente sutil */}
        <View className="flex-row justify-between items-start mb-6">
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
                        item.productoId?.precio || item.item?.precio
                      )}{" "}
                      c/u
                    </Text>
                  </View>
                </View>
                <Text className="text-lg font-bold text-blue-600">
                  {formatPrice(
                    (item.productoId?.precio || item.item?.precio) *
                      item.cantidad
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

        {/* Botones de acción mejorados */}
        <View className="flex space-x-3">
          {pedido.estado === "pendiente" ? (
            <View className="flex-row gap-4">
              <TouchableOpacity className="bg-red-500 hover:bg-red-600 flex-1 py-3 rounded-xl flex-row justify-center items-center space-x-2 shadow-sm ml-3">
                <Ionicons name="close" size={18} color="white" />
                <Text className="text-white font-semibold">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-amber-500 hover:bg-amber-600 flex-1 py-3 rounded-xl flex-row justify-center items-center space-x-2 shadow-sm">
                <Ionicons name="refresh-outline" size={18} color="white" />
                <Text className="text-white font-semibold">Cambiar Estado</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity className="bg-blue-500 hover:bg-blue-600 flex-1 py-3 rounded-xl flex-row justify-center items-center space-x-2 shadow-sm">
              <Ionicons name="refresh-outline" size={18} color="white" />
              <Text className="text-white font-semibold">Pedir Nuevamente</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // Estado vacío mejorado
  const EmptyState = () => (
    <View className="items-center py-16 px-6">
      <View className="bg-gray-100 w-24 h-24 rounded-full items-center justify-center mb-6">
        <Ionicons name="cube-outline" size={40} color="#9CA3AF" />
      </View>
      <Text className="text-xl font-bold text-gray-900 mb-3 text-center">
        {isAdmin ? "No hay pedidos registrados" : "No tienes pedidos aún"}
      </Text>
      <Text className="text-base text-gray-500 text-center leading-relaxed">
        {isAdmin
          ? "Los pedidos aparecerán aquí cuando los usuarios los realicen"
          : "Explora nuestro catálogo y realiza tu primer pedido para comenzar"}
      </Text>
      {!isAdmin && (
        <TouchableOpacity className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl mt-6">
          <Text className="text-white font-semibold">Explorar Catálogo</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header con gradiente */}
      <View className="bg-white shadow-lg border-b border-gray-100">
        <View className="flex-row items-center px-6 py-4">
          <Pressable
            onPress={() => navigation.goBack()}
            className="mr-4 p-2 rounded-full bg-gray-100">
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">
              {isAdmin ? "Pedidos realizados" : "Mis pedidos"}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              {pedidos?.length || 0} pedidos encontrados
            </Text>
          </View>
          <TouchableOpacity className="p-2 rounded-full bg-blue-50">
            <Ionicons name="filter-outline" size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de pedidos con mejor espaciado */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}>
        {pedidos && pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <OrderCard key={pedido._id} pedido={pedido} />
          ))
        ) : (
          <EmptyState />
        )}
      </ScrollView>
    </View>
  );
};
