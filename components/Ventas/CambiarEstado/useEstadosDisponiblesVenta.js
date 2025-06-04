// components/CambiarEstado/hooks/useEstadosDisponiblesVentas.js
import { useMemo } from "react";

const ESTADOS_CONFIG = {
  PROCESANDO: "procesando",
  ENVIADO: "enviado",
  ENTREGADO: "entregado",
  REEMBOLSADO: "reembolsado",
  COMPLETADO: "completado",
};

const ESTADOS_LABELS = {
  [ESTADOS_CONFIG.PROCESANDO]: "Procesando",
  [ESTADOS_CONFIG.ENVIADO]: "Enviado",
  [ESTADOS_CONFIG.ENTREGADO]: "Entregado",
  [ESTADOS_CONFIG.REEMBOLSADO]: "Reembolsado",
  [ESTADOS_CONFIG.COMPLETADO]: "Completado",
};

export const useEstadosDisponiblesVenta = (venta, isAdmin) => {
  const estadosDisponibles = useMemo(() => {
    if (!venta?.estado) return [];

    if (isAdmin) {
      return getEstadosAdmin(venta.estado);
    } else {
      return getEstadosUsuario(venta.estado);
    }
  }, [venta?.estado, isAdmin]);

  const canChangeState = estadosDisponibles.length > 0;

  return {
    estadosDisponibles,
    canChangeState,
    estadoActual: venta?.estado,
  };
};

const getEstadosAdmin = (estadoActual) => {
  switch (estadoActual) {
    case ESTADOS_CONFIG.PROCESANDO:
      return [
        {
          value: ESTADOS_CONFIG.ENVIADO,
          label: ESTADOS_LABELS[ESTADOS_CONFIG.ENVIADO],
          color: "blue",
          icon: "send-outline",
        },
        {
          value: ESTADOS_CONFIG.REEMBOLSADO,
          label: ESTADOS_LABELS[ESTADOS_CONFIG.REEMBOLSADO],
          color: "orange",
          icon: "return-up-back-outline",
        },
      ];

    case ESTADOS_CONFIG.ENVIADO:
      return [
        {
          value: ESTADOS_CONFIG.ENTREGADO,
          label: ESTADOS_LABELS[ESTADOS_CONFIG.ENTREGADO],
          color: "green",
          icon: "checkmark-circle-outline",
        },
        {
          value: ESTADOS_CONFIG.REEMBOLSADO,
          label: ESTADOS_LABELS[ESTADOS_CONFIG.REEMBOLSADO],
          color: "orange",
          icon: "return-up-back-outline",
        },
      ];

    case ESTADOS_CONFIG.ENTREGADO:
      return [
        {
          value: ESTADOS_CONFIG.COMPLETADO,
          label: ESTADOS_LABELS[ESTADOS_CONFIG.COMPLETADO],
          color: "purple",
          icon: "checkmark-done-outline",
        },
        {
          value: ESTADOS_CONFIG.REEMBOLSADO,
          label: ESTADOS_LABELS[ESTADOS_CONFIG.REEMBOLSADO],
          color: "orange",
          icon: "return-up-back-outline",
        },
      ];

    case ESTADOS_CONFIG.COMPLETADO:
    case ESTADOS_CONFIG.REEMBOLSADO:
      return [];

    default:
      return [];
  }
};

const getEstadosUsuario = (estadoActual) => {
  switch (estadoActual) {
    case ESTADOS_CONFIG.PROCESANDO:
      return [
        {
          value: ESTADOS_CONFIG.REEMBOLSADO,
          label: "Solicitar reembolso",
          color: "orange",
          icon: "return-up-back-outline",
        },
      ];

    case ESTADOS_CONFIG.ENVIADO:
      return [
        {
          value: ESTADOS_CONFIG.ENTREGADO,
          label: "Confirmar entrega",
          color: "green",
          icon: "checkmark-circle-outline",
        },
      ];

    case ESTADOS_CONFIG.ENTREGADO:
      return [
        {
          value: ESTADOS_CONFIG.COMPLETADO,
          label: "Marcar como completado",
          color: "purple",
          icon: "checkmark-done-outline",
        },
      ];

    case ESTADOS_CONFIG.COMPLETADO:
    case ESTADOS_CONFIG.REEMBOLSADO:
      return [];

    default:
      return [];
  }
};
