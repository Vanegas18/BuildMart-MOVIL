import axios from "../axios";

// Obtiene todos los clientes
export const getClients = () => axios.get("clientes");

// Obtiene un cliente específico por ID
export const getClientById = (clienteId) => axios.get(`clientes/${clienteId}`);

// Registra un nuevo cliente
export const registrerClient = (cliente) => axios.post("clientes", cliente);

// Editar un cliente
export const editClient = (cliente) =>
  axios.put(`clientes/${cliente._id}`, cliente);

// Cambiar estado de un cliente
export const changeClientState = async (clienteId, nuevoEstado) => {
  try {
    const response = await axios.put(`clientes/${clienteId}`, {
      estado: nuevoEstado,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al cambiar el estado del cliente:",
      error.response || error
    );
    throw error;
  }
};

// Obtiene el perfil del cliente autenticado
export const getClientProfile = () => axios.get("clientes/perfil");