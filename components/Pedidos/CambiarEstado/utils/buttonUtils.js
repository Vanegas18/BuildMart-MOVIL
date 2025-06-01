// components/CambiarEstado/utils/buttonUtils.js

export const getButtonConfig = (canChangeState, pedido, isAdmin) => {
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
      text: "Gestionar Pedido",
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

  // Configuración para usuarios normales según el estado del pedido
  switch (pedido.estado) {
    case "pendiente":
      return {
        text: "Cancelar Pedido",
        icon: "close-circle-outline",
        styles: {
          container: "bg-gradient-to-r from-red-500 to-red-600 shadow-red-200",
          iconContainer: "bg-red-400 shadow-inner",
          iconColor: "#FFFFFF",
          textColor: "text-white",
          subtextColor: "text-red-100",
          shadowColor: "#EF4444",
        },
      };

    case "confirmado":
    case "rechazado":
      return {
        text: "Comprar Nuevamente",
        icon: "refresh-outline",
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

export const getEstadoBadgeColor = (estado) => {
  const colorMap = {
    pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmado: "bg-green-100 text-green-800 border-green-200",
    rechazado: "bg-red-100 text-red-800 border-red-200",
  };

  return colorMap[estado] || "bg-gray-100 text-gray-800 border-gray-200";
};
