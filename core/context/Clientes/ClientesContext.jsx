import {
  registrerClient,
  getClients,
  editClient,
  changeClientState,
  getClientById,
  getClientProfile,
} from "../../api/Clientes/clientes";
import { createContext, useCallback, useContext, useState, useEffect } from "react";
import { useAuth } from "../Acceso/AuthContext";

const ClientesContext = createContext();

export const useClientes = () => {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error("useClientes debe ser usado dentro de un ClientesProvider");
  }
  return context;
};

export function ClientesProvider({ children }) {
  const { user } = useAuth();
  const [clientes, setClientes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Estado para el perfil del cliente autenticado
  const [perfil, setPerfil] = useState(null);
  const [perfilLoading, setPerfilLoading] = useState(true);
  const [perfilError, setPerfilError] = useState(null);

  // Función para obtener el perfil del cliente autenticado
  const obtenerPerfilCliente = useCallback(async () => {
    setPerfilLoading(true);
    setPerfilError(null);
    try {
      // Usa user.id si tu objeto user tiene "id"
      const res = await getClientById(user.id);
      setPerfil(res.data);
    } catch (error) {
      setPerfil(null);
      setPerfilError(
        error.response?.data?.message ||
        error.message ||
        "No se pudo obtener el perfil"
      );
    } finally {
      setPerfilLoading(false);
    }
  }, [user]);

  useEffect(() => {
    obtenerPerfilCliente();
  }, [obtenerPerfilCliente]);

  // Función para obtener todos los clientes
  const obtenerClientes = useCallback(async () => {
    if (isLoaded) return;
    try {
      const res = await getClients();
      setClientes(res.data);
      setIsLoaded(true);
    } catch (error) {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  const crearCliente = async (cliente) => {
    try {
      const res = await registrerClient(cliente);
      setIsLoaded(false);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const editarCliente = async (cliente) => {
    try {
      if (!cliente._id) throw new Error("ID del cliente es necesario");
      const res = await editClient(cliente);
      setIsLoaded(false);
      // Si el cliente editado es el autenticado, recarga el perfil
      if (perfil && cliente._id === perfil._id) {
        await obtenerPerfilCliente();
      }
      return res;
    } catch (error) {
      throw error;
    }
  };

  const cambiarEstadoCliente = async (clienteId, nuevoEstado) => {
    try {
      const res = await changeClientState(clienteId, nuevoEstado);
      setIsLoaded(false);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const obtenerClientePorId = async (clienteId) => {
    try {
      const res = await getClientById(clienteId);
      return res;
    } catch (error) {
      throw error;
    }
  };

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        crearCliente,
        obtenerClientes,
        editarCliente,
        cambiarEstadoCliente,
        obtenerClientePorId,
        isLoaded,
        perfil,
        perfilLoading,
        perfilError,
        recargarPerfil: obtenerPerfilCliente,
      }}>
      {children}
    </ClientesContext.Provider>
  );
}