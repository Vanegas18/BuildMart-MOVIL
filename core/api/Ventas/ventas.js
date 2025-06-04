import axios from "../axios";

// Obtiene todos los ventas
export const getSales = () => axios.get("ventas");

// Obtiene un venta específico por su ID
export const getSaleById = (ventaId) => axios.get(`ventas/${ventaId}`);

// Editar el estado de un venta (actualizar el estado)
export const updateSaleStatus = async (ventaId, nuevoEstado) => {
  try {
    // PUT a ventas/_id con el nuevo estado
    const response = await axios.put(`ventas/${ventaId}`, {
      estado: nuevoEstado,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al cambiar el estado de la venta:",
      error.response || error
    );
    throw error;
  }
};
