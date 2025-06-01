// Formateo del precio
export const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

// Estados y estilos del badge
export const getStatusConfig = (status) => {
  switch (status) {
    case "pendiente":
      return {
        label: "Pendiente",
        bgStyle: "bg-amber-50 border-amber-200",
        textStyle: "text-amber-800",
        icon: "cube-outline",
      };
    case "confirmado":
      return {
        label: "Confirmado",
        bgStyle: "bg-emerald-50 border-emerald-200",
        textStyle: "text-emerald-800",
        icon: "checkmark-circle-outline",
      };
    case "cancelado":
      return {
        label: "Cancelado",
        bgStyle: "bg-red-50 border-red-200",
        textStyle: "text-red-800",
        icon: "close-circle-outline",
      };
    default:
      return {
        label: "Cancelado",
        bgStyle: "bg-red-50 border-red-200",
        textStyle: "text-red-800",
        icon: "close-circle-outline",
      };
  }
};

// Obtener nombre del cliente
export const getNombreCliente = (pedido) => {
  return (
    pedido.clienteId?.nombre ||
    pedido.clienteId?.correo ||
    "Cliente no identificado"
  );
};
