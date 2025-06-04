// components/CambiarEstado/utils/buttonUtilsVentas.js

export const getVentaButtonConfig = (canChangeState, venta, isAdmin) => {
  if (!canChangeState) {
    return {
      text: "No disponible",
      icon: "lock-closed-outline",
      color: "#9CA3AF",
      bgColor: "#F3F4F6",
    };
  }

  if (isAdmin) {
    return {
      text: "Cambiar estado",
      icon: "settings-outline",
      color: "#3B82F6",
      bgColor: "#3B82F6",
    };
  }

  switch (venta.estado) {
    case "procesando":
      return {
        text: "Solicitar Reembolso",
        icon: "return-up-back-outline",
        color: "#F97316",
        bgColor: "#F97316",
      };
    case "enviado":
      return {
        text: "Confirmar Entrega",
        icon: "checkmark-circle-outline",
        color: "#10B981",
        bgColor: "#10B981",
      };
    case "entregado":
      return {
        text: "Marcar Completado",
        icon: "checkmark-done-outline",
        color: "#8B5CF6",
        bgColor: "#8B5CF6",
      };
    case "completado":
    case "reembolsado":
      return {
        text: "Venta Finalizada",
        icon: "checkmark-done-circle-outline",
        color: "#6B7280",
        bgColor: "#6B7280",
      };
    default:
      return {
        text: "No disponible",
        icon: "help-circle-outline",
        color: "#9CA3AF",
        bgColor: "#F3F4F6",
      };
  }
};

export const getEstadoBadgeColorVenta = (estado) => {
  const colorMap = {
    procesando: "bg-blue-100 text-blue-800 border-blue-200",
    enviado: "bg-indigo-100 text-indigo-800 border-indigo-200",
    entregado: "bg-green-100 text-green-800 border-green-200",
    reembolsado: "bg-orange-100 text-orange-800 border-orange-200",
    completado: "bg-purple-100 text-purple-800 border-purple-200",
  };

  return colorMap[estado] || "bg-gray-100 text-gray-800 border-gray-200";
};

// Función adicional para obtener el ícono según el estado
export const getEstadoIcon = (estado) => {
  const iconMap = {
    procesando: "hourglass-outline",
    enviado: "send-outline",
    entregado: "checkmark-circle-outline",
    reembolsado: "return-up-back-outline",
    completado: "checkmark-done-outline",
  };

  return iconMap[estado] || "help-circle-outline";
};

// Función para obtener el texto descriptivo del estado
export const getEstadoDescription = (estado) => {
  const descriptionMap = {
    procesando: "Tu venta está siendo procesada",
    enviado: "El producto ha sido enviado",
    entregado: "El producto ha sido entregado",
    reembolsado: "Se ha procesado el reembolso",
    completado: "Venta finalizada con éxito",
  };

  return descriptionMap[estado] || "Estado desconocido";
};
