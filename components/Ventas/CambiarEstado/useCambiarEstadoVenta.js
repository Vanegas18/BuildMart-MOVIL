// components/Ventas/CambiarEstado/useCambiarEstadoVenta.js
import { useState } from "react";
import { useVentas } from "../../../core/context/Ventas/VentasContext";
import Toast from "react-native-toast-message";

export const useCambiarEstadoVenta = (
  venta,
  estadosDisponibles,
  onEstadoCambiado
) => {
  const [selectedEstado, setSelectedEstado] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { actualizarEstadoVenta } = useVentas();

  const handleConfirmChange = async () => {
    if (!selectedEstado) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debe seleccionar un estado válido",
        visibilityTime: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const resultado = await actualizarEstadoVenta(venta._id, selectedEstado);

      // Encontrar la etiqueta del estado para mostrar en el toast
      const estadoLabel =
        estadosDisponibles.find((e) => e.value === selectedEstado)?.label ||
        selectedEstado;

      // Toast de éxito con mejor UX
      Toast.show({
        type: "success",
        text1: "¡Venta actualizada exitosamente!",
        text2: `${estadoLabel}`,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 60,
      });

      // Callback para actualizar la UI padre
      onEstadoCambiado?.();

      // Reset del estado del hook
      resetState();
    } catch (error) {
      console.error("❌ Error al cambiar estado de la venta:", {
        error: error.message,
        ventaId: venta._id,
        estadoDeseado: selectedEstado,
        timestamp: new Date().toISOString(),
      });

      // Toast de error más informativo
      const errorMessage = getErrorMessage(error);

      Toast.show({
        type: "error",
        text1: "Error al actualizar venta",
        text2: errorMessage,
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 60,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setSelectedEstado("");
    setIsConfirmed(false);
    setIsLoading(false);
  };

  const getErrorMessage = (error) => {
    if (error.message?.includes("network")) {
      return "Error de conexión. Verifica tu internet.";
    }

    if (error.message?.includes("unauthorized")) {
      return "No tienes permisos para realizar esta acción.";
    }

    if (error.message?.includes("not found")) {
      return "La venta no fue encontrada.";
    }

    if (error.message?.includes("invalid state")) {
      return "Estado de venta inválido.";
    }

    if (error.message?.includes("already")) {
      return "La venta ya se encuentra en ese estado.";
    }

    return error.message || "Ha ocurrido un error inesperado.";
  };

  return {
    selectedEstado,
    setSelectedEstado,
    isConfirmed,
    setIsConfirmed,
    isLoading,
    handleConfirmChange,
    resetState,
  };
};
