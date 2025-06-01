import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const EmptyState = ({
  estadoFiltro,
  busqueda,
  isAdmin,
  onClearFilters,
  onExploreProducts,
}) => (
  <View className="items-center py-16 px-6">
    <View className="bg-gray-100 w-24 h-24 rounded-full items-center justify-center mb-6">
      <Ionicons name="cube-outline" size={40} color="#9CA3AF" />
    </View>
    <Text className="text-xl font-bold text-gray-900 mb-3 text-center">
      {estadoFiltro !== "todos" || busqueda.trim() !== ""
        ? "No se encontraron pedidos"
        : isAdmin
        ? "No hay pedidos registrados"
        : "No tienes pedidos aún"}
    </Text>
    <Text className="text-base text-gray-500 text-center leading-relaxed">
      {estadoFiltro !== "todos" || busqueda.trim() !== ""
        ? "Intenta cambiar los filtros de búsqueda"
        : isAdmin
        ? "Los pedidos aparecerán aquí cuando los usuarios los realicen"
        : "Explora nuestro catálogo y realiza tu primer pedido para comenzar"}
    </Text>
    {(estadoFiltro !== "todos" || busqueda.trim() !== "") && (
      <TouchableOpacity
        onPress={onClearFilters}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl mt-6">
        <Text className="text-white font-semibold">Limpiar filtros</Text>
      </TouchableOpacity>
    )}
    {!isAdmin && estadoFiltro === "todos" && busqueda.trim() === "" && (
      <TouchableOpacity
        onPress={onExploreProducts}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl mt-6">
        <Text className="text-white font-semibold">Explorar Catálogo</Text>
      </TouchableOpacity>
    )}
  </View>
);
