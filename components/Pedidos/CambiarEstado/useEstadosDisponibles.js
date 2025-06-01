// components/CambiarEstado/hooks/useEstadosDisponibles.js
import { useMemo } from "react";

const ESTADOS_CONFIG = {
  PENDIENTE: "pendiente",
  CONFIRMADO: "confirmado",
  RECHAZADO: "rechazado",
};

const ESTADOS_LABELS = {
  [ESTADOS_CONFIG.PENDIENTE]: "Pendiente",
  [ESTADOS_CONFIG.CONFIRMADO]: "Confirmado",
  [ESTADOS_CONFIG.RECHAZADO]: "Rechazado",
};

export const useEstadosDisponibles = (pedido, isAdmin) => {
  const estadosDisponibles = useMemo(() => {
    if (!pedido?.estado) return [];

    if (isAdmin) {
      return getEstadosAdmin(pedido.estado);
    } else {
      return getEstadosUsuario(pedido.estado);
    }
  }, [pedido?.estado, isAdmin]);

  const canChangeState = estadosDisponibles.length > 0;

  return {
    estadosDisponibles,
    canChangeState,
    estadoActual: pedido?.estado,
  };
};

const getEstadosAdmin = (estadoActual) => {
  switch (estadoActual) {
    case ESTADOS_CONFIG.PENDIENTE:
      return [
        {
          value: ESTADOS_CONFIG.CONFIRMADO,
          label: ESTADOS_LABELS[ESTADOS_CONFIG.CONFIRMADO],
          color: "green",
        },
        {
          value: ESTADOS_CONFIG.RECHAZADO,
          label: ESTADOS_LABELS[ESTADOS_CONFIG.RECHAZADO],
          color: "red",
        },
      ];
    default:
      return [];
  }
};

const getEstadosUsuario = (estadoActual) => {
  switch (estadoActual) {
    case ESTADOS_CONFIG.PENDIENTE:
      return [
        {
          value: ESTADOS_CONFIG.RECHAZADO,
          label: "Cancelar pedido",
          color: "red",
          icon: "close-circle-outline",
        },
      ];
    case ESTADOS_CONFIG.CONFIRMADO:
    case ESTADOS_CONFIG.RECHAZADO:
      return [
        {
          value: ESTADOS_CONFIG.PENDIENTE,
          label: "Comprar nuevamente",
          color: "blue",
          icon: "refresh-outline",
        },
      ];
    default:
      return [];
  }
};
