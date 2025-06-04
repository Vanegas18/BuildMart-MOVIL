// components/CambiarEstado/utils/buttonUtilsVentas.js

export const getVentaButtonConfig = (canChangeState, venta, isAdmin) => {
  if (!canChangeState) {
    return {
      text: "No disponible",
      icon: "lock-closed-outline",
      styles: {
        container: "bg-gray-100 opacity-60",
        iconContainer: "bg-gray-200",
        iconColor: "#9CA3AF",
        textColor: "text-gray-500",
        subtextColor: "text-gray-400",
        shadowColor: "#000",
      },
    };
  }

  if (isAdmin) {
    return {
      text: "Gestionar Venta",
      icon: "settings-outline",
      styles: {
        container: "bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-200",
        iconContainer: "bg-blue-400 shadow-inner",
        iconColor: "#FFFFFF",
        textColor: "text-white",
        subtextColor: "text-blue-100",
        shadowColor: "#3B82F6",
      },
    };
  }

  // Configuración para usuarios normales según el estado de la venta
  switch (venta.estado) {
    case "procesando":
      return {
        text: "Solicitar Reembolso",
        icon: "return-up-back-outline",
        styles: {
          container:
            "bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-200",
          iconContainer: "bg-orange-400 shadow-inner",
          iconColor: "#FFFFFF",
          textColor: "text-white",
          subtextColor: "text-orange-100",
          shadowColor: "#F97316",
        },
      };

    case "enviado":
      return {
        text: "Confirmar Entrega",
        icon: "checkmark-circle-outline",
        styles: {
          container:
            "bg-gradient-to-r from-green-500 to-green-600 shadow-green-200",
          iconContainer: "bg-green-400 shadow-inner",
          iconColor: "#FFFFFF",
          textColor: "text-white",
          subtextColor: "text-green-100",
          shadowColor: "#10B981",
        },
      };

    case "entregado":
      return {
        text: "Marcar Completado",
        icon: "checkmark-done-outline",
        styles: {
          container:
            "bg-gradient-to-r from-purple-500 to-purple-600 shadow-purple-200",
          iconContainer: "bg-purple-400 shadow-inner",
          iconColor: "#FFFFFF",
          textColor: "text-white",
          subtextColor: "text-purple-100",
          shadowColor: "#8B5CF6",
        },
      };

    case "completado":
    case "reembolsado":
      return {
        text: "Venta Finalizada",
        icon: "checkmark-done-circle-outline",
        styles: {
          container:
            "bg-gradient-to-r from-gray-400 to-gray-500 shadow-gray-200",
          iconContainer: "bg-gray-300 shadow-inner",
          iconColor: "#FFFFFF",
          textColor: "text-white",
          subtextColor: "text-gray-100",
          shadowColor: "#6B7280",
        },
      };

    default:
      return {
        text: "No disponible",
        icon: "help-circle-outline",
        styles: {
          container: "bg-gray-100",
          iconContainer: "bg-gray-200",
          iconColor: "#9CA3AF",
          textColor: "text-gray-500",
          subtextColor: "text-gray-400",
          shadowColor: "#000",
        },
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
