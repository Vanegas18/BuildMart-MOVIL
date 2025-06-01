import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import { useAuth } from "../../../core/context/Acceso/AuthContext";
import { usePedidos } from "../../../core/context/Pedidos/PedidosContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

// Importar componentes separados
import { OrderCard } from "./OrderCard";
import { EmptyState } from "./EmptyState";
import { FiltroModal } from "./FiltroModal";
import { LoadingState } from "../../LoadingState";

// Importar funciones helper
import {
  formatPrice,
  getStatusConfig,
  getNombreCliente,
} from "../Utils/Helper";

export const Pedidos = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const { user, isAuthenticated, checkAuthStatus } = useAuth();
  const { pedidos, isLoading, obtenerPedidos, lastFetch, error } = usePedidos();
  const navigation = useNavigation();

  // Estados para filtros y búsqueda
  const [filtroModal, setFiltroModal] = useState(false);
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  // Verificar roles del usuario (memoizado)
  const userRoles = useMemo(() => {
    if (!user?.rol) return { isAdmin: false, isCuentaRol: false };

    const isCuentaRol = user.rol === "67cb9a96a5866273d8830fb0";
    const isAdmin = user.rol === "67cb9a4fa5866273d8830fad" && !isCuentaRol;

    return { isAdmin, isCuentaRol };
  }, [user?.rol]);

  // Filtrar pedidos base según el rol (memoizado)
  const pedidosBase = useMemo(() => {
    if (!pedidos || !user) return [];

    if (userRoles.isAdmin) {
      return pedidos;
    } else {
      return pedidos.filter((pedido) => {
        const clienteId = pedido.clienteId?._id || pedido.clienteId;
        const userId = user._id || user.id;

        return (
          clienteId === userId ||
          String(clienteId) === String(userId) ||
          pedido.clienteId?.correo === user.correo
        );
      });
    }
  }, [pedidos, user, userRoles.isAdmin]);

  // Aplicar filtros y búsqueda (memoizado)
  const pedidosFiltrados = useMemo(() => {
    let pedidosFiltradosTemp = [...pedidosBase];

    // Filtrar por estado
    if (estadoFiltro !== "todos") {
      pedidosFiltradosTemp = pedidosFiltradosTemp.filter(
        (pedido) => pedido.estado === estadoFiltro
      );
    }

    // Filtrar por búsqueda (nombre del cliente)
    if (busqueda.trim() !== "") {
      pedidosFiltradosTemp = pedidosFiltradosTemp.filter((pedido) => {
        const nombreCliente =
          pedido.clienteId?.nombre || pedido.clienteId?.correo || "";
        return nombreCliente.toLowerCase().includes(busqueda.toLowerCase());
      });
    }

    return pedidosFiltradosTemp;
  }, [pedidosBase, estadoFiltro, busqueda]);

  // ✅ Cargar pedidos inmediatamente cuando el componente se monta
  useEffect(() => {
    const loadInitialData = async () => {
      if (isAuthenticated && user) {
        try {
          await obtenerPedidos();
        } catch (error) {
          console.error("Error al cargar pedidos iniciales:", error);
        }
      }
    };

    loadInitialData();
  }, [isAuthenticated, user, obtenerPedidos]);

  // ✅ Refrescar cuando la pantalla está enfocada (pero solo si es necesario)
  useFocusEffect(
    useCallback(() => {
      // Solo refrescar si no hay datos o si han pasado más de 2 minutos
      const shouldRefresh =
        !lastFetch || Date.now() - lastFetch > 2 * 60 * 1000;

      if (shouldRefresh && isAuthenticated && user) {
        obtenerPedidos();
      }
    }, [obtenerPedidos, lastFetch, isAuthenticated, user])
  );

  // Handlers
  const handleToggleExpanded = useCallback((pedidoId) => {
    setExpandedOrder((prev) => (prev === pedidoId ? null : pedidoId));
  }, []);

  const handleClearFilters = useCallback(() => {
    setEstadoFiltro("todos");
    setBusqueda("");
  }, []);

  const handleExploreProducts = useCallback(() => {
    navigation.navigate("Catalogo");
  }, [navigation]);

  const handleRefresh = useCallback(async () => {
    try {
      await obtenerPedidos(true); // Forzar refresh
    } catch (error) {
      console.error("Error al refrescar pedidos:", error);
    }
  }, [obtenerPedidos]);

  // Determinar qué mostrar basado en el estado
  const renderContent = () => {
    // Mostrar loading solo al inicio o cuando no hay datos
    if (isLoading && pedidos.length === 0) {
      return <LoadingState isAdmin={userRoles.isAdmin} />;
    }

    // Mostrar error si existe
    if (error && pedidos.length === 0) {
      return (
        <View className="items-center py-16 px-6">
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text className="text-xl font-bold text-gray-900 mb-3 text-center mt-4">
            Error al cargar pedidos
          </Text>
          <Text className="text-base text-gray-500 text-center mb-6">
            {error}
          </Text>
          <TouchableOpacity
            onPress={handleRefresh}
            className="bg-blue-500 px-6 py-3 rounded-xl">
            <Text className="text-white font-semibold">Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Si hay pedidos filtrados, mostrarlos
    if (pedidosFiltrados.length > 0) {
      return pedidosFiltrados.map((pedido) => (
        <OrderCard
          key={pedido._id}
          pedido={pedido}
          isAdmin={userRoles.isAdmin}
          expandedOrder={expandedOrder}
          onToggleExpanded={handleToggleExpanded}
          getStatusConfig={getStatusConfig}
          formatPrice={formatPrice}
          getNombreCliente={getNombreCliente}
        />
      ));
    }

    // Si no hay pedidos, mostrar estado vacío
    return (
      <EmptyState
        estadoFiltro={estadoFiltro}
        busqueda={busqueda}
        isAdmin={userRoles.isAdmin}
        onClearFilters={handleClearFilters}
        onExploreProducts={handleExploreProducts}
      />
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header con gradiente */}
      <View className="bg-white">
        <View className="flex-row items-center px-6 py-4">
          <Pressable
            onPress={() => navigation.goBack()}
            className="mr-4 p-2 rounded-full bg-gray-100">
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">
              {userRoles.isAdmin ? "Pedidos realizados" : "Mis pedidos"}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              {isLoading && pedidos.length === 0
                ? "Cargando pedidos..."
                : `${pedidosFiltrados?.length || 0} pedidos encontrados${
                    estadoFiltro !== "todos" ? ` • ${estadoFiltro}` : ""
                  }`}
            </Text>
          </View>

          {/* Botón de refresh */}
          <TouchableOpacity
            onPress={handleRefresh}
            disabled={isLoading}
            className="mr-2 p-2 rounded-full bg-gray-100">
            <Ionicons
              name="refresh-outline"
              size={20}
              color={isLoading ? "#9CA3AF" : "#111827"}
            />
          </TouchableOpacity>

          {/* Botón de filtros */}
          <TouchableOpacity
            onPress={() => setFiltroModal(true)}
            className={`p-2 rounded-full ${
              estadoFiltro !== "todos" ? "bg-blue-100" : "bg-blue-50"
            }`}>
            <Ionicons
              name="filter-outline"
              size={20}
              color={estadoFiltro !== "todos" ? "#1D4ED8" : "#3B82F6"}
            />
          </TouchableOpacity>
        </View>

        {/* Barra de búsqueda (solo para admins) */}
        {userRoles.isAdmin && (
          <View className="px-6 pb-4">
            <View className="bg-gray-100 rounded-lg flex-row items-center px-4 py-3">
              <Ionicons name="search-outline" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-gray-900"
                placeholder="Buscar por nombre del cliente..."
                placeholderTextColor="#9CA3AF"
                value={busqueda}
                onChangeText={setBusqueda}
              />
              {busqueda.trim() !== "" && (
                <TouchableOpacity onPress={() => setBusqueda("")}>
                  <Ionicons name="close-circle" size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Indicador de caché */}
        {/* {lastFetch && !isLoading && (
          <View className="px-6 pb-2">
            <Text className="text-xs text-gray-400 text-center">
              Última actualización: {new Date(lastFetch).toLocaleTimeString()}
            </Text>
          </View>
        )} */}
      </View>

      {/* Lista de pedidos */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>

      {/* Modal de filtros */}
      <FiltroModal
        visible={filtroModal}
        onClose={() => setFiltroModal(false)}
        estadoFiltro={estadoFiltro}
        onEstadoChange={setEstadoFiltro}
        onClearFilters={handleClearFilters}
      />
    </View>
  );
};
