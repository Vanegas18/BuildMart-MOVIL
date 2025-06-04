// Formateo del precio
export const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

// Estados y estilos del badge para ventas
export const getStatusConfig = (status) => {
  switch (status) {
    case "procesando":
      return {
        label: "Procesando",
        bgStyle: "bg-blue-200 border-blue-300",
        textStyle: "text-blue-800",
        icon: "time-outline",
        icon: "refresh-outline",
        iconColor: "blue",
      };
    case "enviado":
      return {
        label: "Enviado",
        bgStyle: "bg-purple-100 border-purple-300",
        textStyle: "text-purple-800",
        icon: "car-outline",
        iconColor: "#6B21A8",
      };
    case "entregado":
      return {
        label: "Entregado",
        bgStyle: "bg-green-100 border-green-300",
        textStyle: "text-green-800",
        icon: "checkmark-done-outline",
        iconColor: "#166534",
      };
    case "completado":
      return {
        label: "Completado",
        bgStyle: "bg-emerald-100 border-emerald-300",
        textStyle: "text-emerald-800",
        icon: "checkmark-circle-outline",
        iconColor: "#065F46",
      };
    case "reembolsado":
      return {
        label: "Reembolsado",
        bgStyle: "bg-orange-100 border-orange-300",
        textStyle: "text-orange-800",
        icon: "return-up-back-outline",
        iconColor: "#C2410C",
      };
    default:
      return {
        label: "Procesando",
        bgStyle: "bg-blue-50 border-blue-200",
        textStyle: "text-blue-800",
        icon: "time-outline",
      };
  }
};

// Obtener nombre del cliente para ventas
export const getNombreCliente = (venta) => {
  return (
    venta.clienteId?.nombre ||
    venta.clienteId?.correo ||
    "Cliente no identificado"
  );
};
