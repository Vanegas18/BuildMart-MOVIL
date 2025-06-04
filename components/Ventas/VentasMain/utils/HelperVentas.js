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
        bgStyle: "bg-blue-50 border-blue-200",
        textStyle: "text-blue-800",
        icon: "time-outline",
      };
    case "enviado":
      return {
        label: "Enviado",
        bgStyle: "bg-amber-50 border-amber-200",
        textStyle: "text-amber-800",
        icon: "car-outline",
      };
    case "entregado":
      return {
        label: "Entregado",
        bgStyle: "bg-purple-50 border-purple-200",
        textStyle: "text-purple-800",
        icon: "checkmark-done-outline",
      };
    case "completado":
      return {
        label: "Completado",
        bgStyle: "bg-emerald-50 border-emerald-200",
        textStyle: "text-emerald-800",
        icon: "checkmark-circle-outline",
      };
    case "reembolsado":
      return {
        label: "Reembolsado",
        bgStyle: "bg-red-50 border-red-200",
        textStyle: "text-red-800",
        icon: "return-down-back-outline",
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
