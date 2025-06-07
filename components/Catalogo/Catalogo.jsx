import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  TextInput,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ProductosContext } from "../../core/context/Productos/ProductosContext";
import styles from "./styles/catalogStyles"; // Ajusta la ruta si es necesario


export default function CatalogoView() {
  const navigation = useNavigation();
  const { productos } = useContext(ProductosContext);
  const [busqueda, setBusqueda] = useState("");
  const [filtroPrecio, setFiltroPrecio] = useState("todos");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const formatPrice = (price) => {
    return price.toLocaleString("es-CO");
  };

  const productosFiltrados = useMemo(() => {
    let productosTemp = [...productos];

    if (busqueda.trim() !== "") {
      productosTemp = productosTemp.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (filtroPrecio === "menor") {
      productosTemp.sort((a, b) => a.precio - b.precio);
    } else if (filtroPrecio === "mayor") {
      productosTemp.sort((a, b) => b.precio - a.precio);
    }

    return productosTemp;
  }, [productos, busqueda, filtroPrecio]);

const handleCotizar = (nombre, stock) => {
  const catalogoURL = `https://build-two-sage.vercel.app/catalogo`;
  Linking.openURL(catalogoURL);
};

const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.img }} style={styles.image} />
    <Text style={styles.title}>{item.nombre}</Text>

    {item.oferta?.activa ? (
      <View>
        <Text style={styles.oldPrice}>
          ${formatPrice(item.precio)}
        </Text>
        <Text style={styles.offerPrice}>
          ${formatPrice(item.oferta.precioOferta)} -{item.oferta.descuento}%
        </Text>
      </View>
    ) : (
      <Text style={styles.price}>${formatPrice(item.precio)}</Text>
    )}

    <Text style={styles.stock}>Stock disponible: {item.stock}</Text>

    {/* Contenedor del botón para que siempre se mantenga abajo */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCotizar(item.nombre, item.stock)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.buttonText}>Comprar ahora</Text>
          {/* <Ionicons name="cart-outline" size={16} color="#fff" style={{ marginRight: 5 }} /> */}
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Encabezado */}
      <View className="bg-white">
        <View className="flex-row items-center px-6 py-4">
          <Pressable
            onPress={() => navigation.goBack()}
            className="mr-4 p-2 rounded-full bg-gray-100"
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">Nuestra Tienda</Text>
            <Text className="text-sm text-gray-500 mt-1">
              {productosFiltrados.length} productos disponibles
            </Text>
          </View>

          {/* Botón de búsqueda y filtro */}
          <TouchableOpacity
            onPress={() => setMostrarFiltros(!mostrarFiltros)}
            className="p-2 rounded-full bg-gray-100"
          >
            <Ionicons name="filter-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Barra de búsqueda */}
        <View className="px-6 pb-4">
          <View className="bg-gray-100 rounded-lg flex-row items-center px-4 py-3">
            <Ionicons name="search-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-900"
              placeholder="Buscar productos..."
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
      </View>

      {/* Pestaña de filtros */}
      {mostrarFiltros && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            onPress={() => {
              setFiltroPrecio("menor");
              setMostrarFiltros(false);
            }}
            style={[styles.dropdownOption, filtroPrecio === "menor" ? styles.activeOption : styles.inactiveOption]}
          >
            <Text style={styles.optionText}>Menor precio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setFiltroPrecio("mayor");
              setMostrarFiltros(false);
            }}
            style={[styles.dropdownOption, filtroPrecio === "mayor" ? styles.activeOption : styles.inactiveOption]}
          >
            <Text style={styles.optionText}>Mayor precio</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={productosFiltrados}
        numColumns={2}
        keyExtractor={(item) => item.productoId.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>¡No se encontraron productos!</Text>

            {/* Botón para limpiar búsqueda */}
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setBusqueda("")}
            >
              <Text style={styles.clearButtonText}>Limpiar filtros</Text>
            </TouchableOpacity>
          </View>
        }
      />
      </View>
    );
  }

// const styles = {
//   card: {
//     flex: 1,
//     margin: 10,
//     padding: 10,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     alignItems: "center",
//     elevation: 3,
//     minHeight: 200,
//     justifyContent: "space-between",
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 5,
//   },
//   price: {
//     fontSize: 14,
//     color: "#888",
//     marginTop: 8, // Separación extra del nombre del producto
//   },
//   oldPrice: {
//     fontSize: 14,
//     color: "#9CA3AF",
//     textDecorationLine: "line-through",
//   },
//   offerPrice: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#D97706",
//   },
//   stock: {
//     fontSize: 14,
//     color: "#4B5563",
//     marginTop: 3,
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     width: "100%",
//   },
//   button: {
//     backgroundColor: "#3B82F6",
//     padding: 8,
//     borderRadius: 6,
//     alignItems: "center",
//     marginTop: 16, // Más espacio debajo del stock
//   },
//   buttonText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   dropdown: {
//     position: "absolute",
//     top: 50,
//     right: 10,
//     backgroundColor: "#fff",
//     padding: 8,
//     borderRadius: 8,
//     elevation: 5,
//     zIndex: 1000,
//   },
//   dropdownOption: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginBottom: 5,
//   },
//   activeOption: {
//     backgroundColor: "#BFDBFE",
//   },
//   inactiveOption: {
//     backgroundColor: "#E5E7EB",
//   },
//   optionText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#1E40AF",
//   },
//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "flex-start",
//     flex: 1,
//     marginTop: 120, // Lo coloca más abajo
//   },
//   emptyText: {
//     fontSize: 16,
//     color: "#9CA3AF",
//     marginTop: 10,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   clearButton: {
//     backgroundColor: "#3B82F6",
//     padding: 10,
//     borderRadius: 6,
//     marginTop: 20, // Espaciado extra debajo del mensaje
//     alignItems: "center",
//   },
//   clearButtonText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#fff",
//   },
// };