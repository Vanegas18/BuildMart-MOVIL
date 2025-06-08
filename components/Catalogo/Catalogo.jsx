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
import styles from "./styles/catalogStyles";

const PRODUCTOS_POR_PAGINA = 10;

export default function CatalogoView() {
  const navigation = useNavigation();
  const { productos } = useContext(ProductosContext);
  const [busqueda, setBusqueda] = useState("");
  const [filtroPrecio, setFiltroPrecio] = useState("todos");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);

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

  const totalPaginas = Math.ceil(
    productosFiltrados.length / PRODUCTOS_POR_PAGINA
  );
  const indiceInicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const indiceFin = indiceInicio + PRODUCTOS_POR_PAGINA;
  const productosActuales = productosFiltrados.slice(indiceInicio, indiceFin);

  const handleBusquedaChange = (texto) => {
    setBusqueda(texto);
    setPaginaActual(1);
  };

  const handleFiltroPrecioChange = (filtro) => {
    setFiltroPrecio(filtro);
    setPaginaActual(1);
    setMostrarFiltros(false);
  };

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const handleCotizar = (nombre, stock) => {
    const catalogoURL = `https://build-two-sage.vercel.app/catalogo`;
    Linking.openURL(catalogoURL);
  };

  const renderItem = ({ item }) => {
    const isOnSale = item.oferta?.activa;

    return (
      <View style={isOnSale ? styles.cardOnSale : styles.card}>
        {/* Badge de descuento para ofertas */}
        {isOnSale && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{item.oferta.descuento}%</Text>
          </View>
        )}

        {/* Contenedor de imagen con mejor proporción */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.img }}
            style={isOnSale ? styles.imageOnSale : styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Contenedor de información del producto */}
        <View style={styles.productInfo}>
          <Text
            style={isOnSale ? styles.titleOnSale : styles.title}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.nombre}
          </Text>

          {/* Contenedor de precios optimizado */}
          <View
            style={
              isOnSale ? styles.priceContainerOnSale : styles.priceContainer
            }>
            <Text style={isOnSale ? styles.stockOnSale : styles.stock}>
              Stock: {item.stock}
            </Text>
            {isOnSale ? (
              <View style={styles.priceRow}>
                <Text style={styles.oldPrice}>${formatPrice(item.precio)}</Text>
                <Text style={styles.offerPrice}>
                  ${formatPrice(item.oferta.precioOferta)}
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.price}>${formatPrice(item.precio)}</Text>
              </>
            )}
          </View>

          {/* Stock y botón en la misma línea */}
          <View style={styles.bottomRow}>
            <TouchableOpacity
              style={isOnSale ? styles.buttonOnSale : styles.button}
              onPress={() => handleCotizar(item.nombre, item.stock)}>
              <Text
                style={isOnSale ? styles.buttonTextOnSale : styles.buttonText}>
                {isOnSale ? "¡Comprar!" : "Comprar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const PaginationComponent = () => {
    if (totalPaginas <= 1) return null;

    const generarBotonesPagina = () => {
      const botones = [];
      const maxBotones = 3;

      if (totalPaginas <= maxBotones) {
        for (let i = 1; i <= totalPaginas; i++) {
          botones.push(i);
        }
      } else {
        if (paginaActual <= 3) {
          botones.push(1, 2, 3, 4, "...", totalPaginas);
        } else if (paginaActual >= totalPaginas - 2) {
          botones.push(
            1,
            "...",
            totalPaginas - 3,
            totalPaginas - 2,
            totalPaginas - 1,
            totalPaginas
          );
        } else {
          botones.push(
            1,
            "...",
            paginaActual - 1,
            paginaActual,
            paginaActual + 1,
            "...",
            totalPaginas
          );
        }
      }

      return botones;
    };

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[
            styles.paginationButton,
            paginaActual === 1 && styles.paginationButtonDisabled,
          ]}
          onPress={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}>
          <Ionicons
            name="chevron-back"
            size={18}
            color={paginaActual === 1 ? "#94A3B8" : "#1E40AF"}
          />
        </TouchableOpacity>

        <View style={styles.paginationNumbers}>
          {generarBotonesPagina().map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationNumber,
                item === paginaActual && styles.paginationNumberActive,
                item === "..." && styles.paginationDots,
              ]}
              onPress={() => typeof item === "number" && cambiarPagina(item)}
              disabled={item === "..."}>
              <Text
                style={[
                  styles.paginationNumberText,
                  item === paginaActual && styles.paginationNumberTextActive,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.paginationButton,
            paginaActual === totalPaginas && styles.paginationButtonDisabled,
          ]}
          onPress={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={paginaActual === totalPaginas ? "#94A3B8" : "#1E40AF"}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Encabezado */}
      <View className="bg-white">
        <View className="flex-row items-center px-6 py-4">
          <Pressable
            onPress={() => navigation.goBack()}
            className="mr-4 p-2 rounded-full bg-gray-100">
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">
              Nuestra Tienda
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              {productosFiltrados.length} productos disponibles
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setMostrarFiltros(!mostrarFiltros)}
            className="p-2 rounded-full bg-gray-100">
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
              onChangeText={handleBusquedaChange}
            />
            {busqueda.trim() !== "" && (
              <TouchableOpacity onPress={() => handleBusquedaChange("")}>
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
            onPress={() => handleFiltroPrecioChange("menor")}
            style={[
              styles.dropdownOption,
              filtroPrecio === "menor"
                ? styles.activeOption
                : styles.inactiveOption,
            ]}>
            <Text style={styles.optionText}>Menor precio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFiltroPrecioChange("mayor")}
            style={[
              styles.dropdownOption,
              filtroPrecio === "mayor"
                ? styles.activeOption
                : styles.inactiveOption,
            ]}>
            <Text style={styles.optionText}>Mayor precio</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Lista de productos */}
      <FlatList
        data={productosActuales}
        numColumns={2}
        keyExtractor={(item) => item.productoId.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>¡No se encontraron productos!</Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                handleBusquedaChange("");
                setFiltroPrecio("todos");
              }}>
              <Text style={styles.clearButtonText}>Limpiar filtros</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <PaginationComponent />
    </View>
  );
}
