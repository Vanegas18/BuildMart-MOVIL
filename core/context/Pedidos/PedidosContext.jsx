import {
  getOrders,
  updateOrderStatus,
  getOrderById,
} from "../../api/Pedidos/pedidos";
import { createContext, useCallback, useContext, useState } from "react";

// 1. Crear el contexto
const PedidosContext = createContext();

// 2. Hook personalizado para usar el contexto
export const usePedidos = () => {
  const context = useContext(PedidosContext);

  if (!context) {
    throw new Error("usePedidos debe ser usado dentro de un PedidosProvider");
  }

  return context;
};

// 3. Proveedor del contexto
export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetch, setLastFetch] = useState(null);
  const [error, setError] = useState(null);

  // Tiempo de caché en milisegundos (5 minutos)
  const CACHE_TIME = 5 * 60 * 1000;

  // Obtener todos los pedidos
  const obtenerPedidos = useCallback(async (forceRefresh = false) => {
    const now = Date.now();

    // Si ya tenemos datos recientes y no es un refresh forzado, no hacer la petición
    if (
      !forceRefresh &&
      pedidos.length > 0 &&
      lastFetch &&
      now - lastFetch < CACHE_TIME
    ) {
      return pedidos;
    }

    // Establecer estado de loading
    setIsLoading(true);
    setError(null);

    try {
      const res = await getOrders();

      // Verificar que la respuesta sea válida
      if (res && res.data) {
        setPedidos(res.data);
        setLastFetch(now);
      } else {
        console.warn("Respuesta de API inválida:", res);
        setPedidos([]);
      }
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
      setError(error.message || "Error al cargar pedidos");
      // No limpiar pedidos existentes en caso de error
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Actualizar el estado de un pedido
  const actualizarEstadoPedido = useCallback(async (pedidoId, nuevoEstado) => {
    try {
      setError(null);
      const res = await updateOrderStatus(pedidoId, nuevoEstado);

      // Actualizar el pedido específico en el estado local
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido._id === pedidoId ? { ...pedido, estado: nuevoEstado } : pedido
        )
      );

      return res;
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
      setError(error.message || "Error al actualizar pedido");
      throw error;
    }
  }, []);

  // Obtener un pedido por su pedidoId (autoincremental)
  const obtenerPedidoPorId = useCallback(async (pedidoId) => {
    try {
      setError(null);
      const res = await getOrderById(pedidoId);
      return res.data;
    } catch (error) {
      console.error("Error al obtener el pedido:", error);
      setError(error.message || "Error al obtener pedido");
      throw error;
    }
  }, []);

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        isLoading,
        lastFetch,
        error,
        obtenerPedidos,
        actualizarEstadoPedido,
        obtenerPedidoPorId,
        clearError,
      }}>
      {children}
    </PedidosContext.Provider>
  );
}
