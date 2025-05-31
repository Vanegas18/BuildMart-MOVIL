import axios from "../axios";

// Obtiene todos los pedidos
export const getOrders = () => axios.get("pedidos");

// Obtiene un pedido específico por su ID
export const getOrderById = (pedidoId) => axios.get(`pedidos/${pedidoId}`);

// Editar el estado de un pedido (actualizar el estado)
export const updateOrderStatus = async (pedidoId, nuevoEstado) => {
  try {
    // PUT a pedidos/_id con el nuevo estado
    const response = await axios.put(`pedidos/${pedidoId}`, {
      estado: nuevoEstado,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al cambiar el estado del pedido:",
      error.response || error
    );
    throw error;
  }
};
