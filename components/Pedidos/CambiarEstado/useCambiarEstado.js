// components/CambiarEstado/hooks/useCambiarEstado.js
import { useState } from "react";
import { usePedidos } from "../../../core/context/Pedidos/PedidosContext";
import Toast from "react-native-toast-message";

export const useCambiarEstado = (
  pedido,
  estadosDisponibles,
  onEstadoCambiado
) => {
  const [selectedEstado, setSelectedEstado] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { actualizarEstadoPedido } = usePedidos();

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
      const resultado = await actualizarEstadoPedido(
        pedido._id,
        selectedEstado
      );

      // Encontrar la etiqueta del estado para mostrar en el toast
      const estadoLabel =
        estadosDisponibles.find((e) => e.value === selectedEstado)?.label ||
        selectedEstado;

      // Toast de éxito con mejor UX
      Toast.show({
        type: "success",
        text1: "¡Pedido actualizado exitosamente!",
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
      console.error("❌ Error al cambiar estado del pedido:", {
        error: error.message,
        pedidoId: pedido._id,
        estadoDeseado: selectedEstado,
        timestamp: new Date().toISOString(),
      });

      // Toast de error más informativo
      const errorMessage = getErrorMessage(error);

      Toast.show({
        type: "error",
        text1: "Error al actualizar pedido",
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
      return "El pedido no fue encontrado.";
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
