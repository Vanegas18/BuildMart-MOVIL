import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const EmptyStateVentas = ({
  estadoFiltro,
  busqueda,
  isAdmin,
  onClearFilters,
  onExploreProducts,
}) => {
  // Función para obtener el ícono y color según el contexto
  const getEmptyStateConfig = () => {
    if (estadoFiltro !== "todos" || busqueda.trim() !== "") {
      // Estado de búsqueda/filtro sin resultados
      return {
        icon: "search-outline",
        iconColor: "#9CA3AF",
        bgColor: "bg-gray-100",
        title: "No se encontraron ventas",
        subtitle:
          "Intenta cambiar los filtros de búsqueda o el término de búsqueda",
      };
    }

    if (isAdmin) {
      // Admin sin ventas
      return {
        icon: "receipt-outline",
        iconColor: "#10B981",
        bgColor: "bg-green-100",
        title: "No hay ventas registradas",
        subtitle:
          "Las ventas completadas aparecerán aquí cuando los clientes finalicen sus compras",
      };
    }

    // Cliente sin ventas
    return {
      icon: "bag-outline",
      iconColor: "#3B82F6",
      bgColor: "bg-blue-100",
      title: "No tienes compras aún",
      subtitle:
        "Explora nuestro catálogo y realiza tu primera compra para ver tus ventas aquí",
    };
  };

  const config = getEmptyStateConfig();

  return (
    <View className="items-center py-16 px-6">
      <View
        className={`${config.bgColor} w-24 h-24 rounded-full items-center justify-center mb-6`}>
        <Ionicons name={config.icon} size={40} color={config.iconColor} />
      </View>

      <Text className="text-xl font-bold text-gray-900 mb-3 text-center">
        {config.title}
      </Text>

      <Text className="text-base text-gray-500 text-center leading-relaxed mb-2">
        {config.subtitle}
      </Text>

      {/* Información adicional para admins */}
      {isAdmin && estadoFiltro === "todos" && busqueda.trim() === "" && (
        <View className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4 w-full max-w-sm">
          <View className="flex-row items-center mb-2">
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#059669"
            />
            <Text className="text-sm font-medium text-green-800 ml-2">
              Información de ventas
            </Text>
          </View>
          <Text className="text-xs text-green-700 leading-relaxed">
            • Las ventas se generan automáticamente cuando los pedidos se
            completan{"\n"}• Puedes gestionar el estado de las ventas desde aquí
            {"\n"}• Utiliza los filtros para organizar las ventas por estado
          </Text>
        </View>
      )}

      {/* Botones de acción */}
      <View className="flex-row space-x-3 mt-6">
        {/* Botón limpiar filtros */}
        {(estadoFiltro !== "todos" || busqueda.trim() !== "") && (
          <TouchableOpacity
            onPress={onClearFilters}
            className="bg-gray-500 hover:bg-gray-600 px-6 py-3 rounded-xl flex-row items-center">
            <Ionicons
              name="refresh-outline"
              size={18}
              color="#ffffff"
              style={{ marginRight: 8 }}
            />
            <Text className="text-white font-semibold">Limpiar filtros</Text>
          </TouchableOpacity>
        )}

        {/* Botón explorar catálogo para clientes */}
        {!isAdmin && estadoFiltro === "todos" && busqueda.trim() === "" && (
          <TouchableOpacity
            onPress={onExploreProducts}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl flex-row items-center">
            <Ionicons
              name="storefront-outline"
              size={18}
              color="#ffffff"
              style={{ marginRight: 8 }}
            />
            <Text className="text-white font-semibold">Explorar Catálogo</Text>
          </TouchableOpacity>
        )}

        {/* Botón adicional para admin - Ver reportes */}
        {isAdmin && estadoFiltro === "todos" && busqueda.trim() === "" && (
          <TouchableOpacity className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl flex-row items-center">
            <Ionicons
              name="analytics-outline"
              size={18}
              color="#ffffff"
              style={{ marginRight: 8 }}
            />
            <Text className="text-white font-semibold">Ver Reportes</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Acciones rápidas para admin */}
      {isAdmin && estadoFiltro === "todos" && busqueda.trim() === "" && (
        <View className="mt-8 w-full max-w-sm">
          <Text className="text-sm font-medium text-gray-700 mb-3 text-center">
            Acciones rápidas
          </Text>
          <View className="flex-row justify-center space-x-4">
            <TouchableOpacity className="items-center">
              <View className="bg-amber-100 w-12 h-12 rounded-full items-center justify-center mb-2">
                <Ionicons name="time-outline" size={20} color="#F59E0B" />
              </View>
              <Text className="text-xs text-gray-600 text-center">
                Ver{"\n"}Procesando
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="bg-purple-100 w-12 h-12 rounded-full items-center justify-center mb-2">
                <Ionicons
                  name="checkmark-done-outline"
                  size={20}
                  color="#8B5CF6"
                />
              </View>
              <Text className="text-xs text-gray-600 text-center">
                Ver{"\n"}Entregadas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="bg-green-100 w-12 h-12 rounded-full items-center justify-center mb-2">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="#10B981"
                />
              </View>
              <Text className="text-xs text-gray-600 text-center">
                Ver{"\n"}Completadas
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
