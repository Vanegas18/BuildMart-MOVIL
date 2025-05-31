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
  const [isLoaded, setIsLoaded] = useState(false);

  // Obtener todos los pedidos
  const obtenerPedidos = useCallback(async () => {
    if (isLoaded) return;

    try {
      const res = await getOrders();
      setPedidos(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
      setIsLoaded(false);
    }
  }, [isLoaded]);

  // Actualizar el estado de un pedido
  const actualizarEstadoPedido = async (pedidoId, nuevoEstado) => {
    try {
      const res = await updateOrderStatus(pedidoId, nuevoEstado);
      setIsLoaded(false); // Para que se recargue la lista
      return res;
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
      throw error;
    }
  };

  // Obtener un pedido por su pedidoId (autoincremental)
  const obtenerPedidoPorId = async (pedidoId) => {
    try {
      const res = await getOrderById(pedidoId);
      return res.data;
    } catch (error) {
      console.error("Error al obtener el pedido:", error);
      throw error;
    }
  };

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        obtenerPedidos,
        actualizarEstadoPedido,
        obtenerPedidoPorId,
        isLoaded,
      }}>
      {children}
    </PedidosContext.Provider>
  );
}
