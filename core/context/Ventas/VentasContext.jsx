import {
  getSaleById,
  getSales,
  updateSaleStatus,
} from "../../api/Ventas/ventas";
import { createContext, useCallback, useContext, useState } from "react";

// 1. Crear el contexto
const VentasContext = createContext();

// 2. Hook personalizado para usar el contexto
export const useVentas = () => {
  const context = useContext(VentasContext);

  if (!context) {
    throw new Error("useVentas debe ser usado dentro de un VentasProvider");
  }

  return context;
};

// 3. Proveedor del contexto
export function VentasProvider({ children }) {
  const [ventas, setVentas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetch, setLastFetch] = useState(null);
  const [error, setError] = useState(null);

  // Tiempo de caché en milisegundos (5 minutos)
  const CACHE_TIME = 5 * 60 * 1000;

  // Obtener todos los Ventas
  const obtenerVentas = useCallback(async (forceRefresh = false) => {
    const now = Date.now();

    // Si ya tenemos datos recientes y no es un refresh forzado, no hacer la petición
    if (
      !forceRefresh &&
      ventas.length > 0 &&
      lastFetch &&
      now - lastFetch < CACHE_TIME
    ) {
      return ventas;
    }

    // Establecer estado de loading
    setIsLoading(true);
    setError(null);

    try {
      const res = await getSales();

      // Verificar que la respuesta sea válida
      if (res && res.data) {
        setVentas(res.data);
        setLastFetch(now);
      } else {
        console.warn("Respuesta de API inválida:", res);
        setVentas([]);
      }
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
      setError(error.message || "Error al cargar ventas");
      // No limpiar ventas existentes en caso de error
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Actualizar el estado de un venta
  const actualizarEstadoVenta = useCallback(async (ventaId, nuevoEstado) => {
    try {
      setError(null);
      const res = await updateSaleStatus(ventaId, nuevoEstado);

      // Actualizar el venta específico en el estado local
      setVentas((prevVentas) =>
        prevVentas.map((venta) =>
          venta._id === ventaId ? { ...venta, estado: nuevoEstado } : venta
        )
      );

      return res;
    } catch (error) {
      console.error("Error al actualizar el estado de la venta:", error);
      setError(error.message || "Error al actualizar venta");
      throw error;
    }
  }, []);

  // Obtener un venta por su ventaId (autoincremental)
  const obtenerVentaPorId = useCallback(async (ventaId) => {
    try {
      setError(null);
      const res = await getSaleById(ventaId);
      return res.data;
    } catch (error) {
      console.error("Error al obtener la venta:", error);
      setError(error.message || "Error al obtener venta");
      throw error;
    }
  }, []);

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <VentasContext.Provider
      value={{
        ventas,
        isLoading,
        lastFetch,
        error,
        obtenerVentas,
        actualizarEstadoVenta,
        obtenerVentaPorId,
        clearError,
      }}>
      {children}
    </VentasContext.Provider>
  );
}
