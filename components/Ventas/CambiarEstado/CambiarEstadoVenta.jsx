// components/Ventas/CambiarEstadoVenta/CambiarEstadoVenta.jsx
import { useState, useEffect } from "react";
import { TouchableOpacity, Modal } from "react-native";
import { CambiarEstadoVentaButton } from "./CambiarEstadoVentaButton";
import { CambiarEstadoVentaModal } from "./CambiarEstadoVentaModal";
import { useCambiarEstadoVenta } from "./useCambiarEstadoVenta";
import { useEstadosDisponiblesVenta } from "./useEstadosDisponiblesVenta";
import { useUserRoles } from "../../Pedidos/CambiarEstado/useUserRoles";

export const CambiarEstadoVenta = ({ venta, onEstadoCambiado }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState("initial");

  const { isAdmin, isCuentaRol } = useUserRoles();
  const { estadosDisponibles, canChangeState } = useEstadosDisponiblesVenta(
    venta,
    isAdmin
  );

  const {
    selectedEstado,
    setSelectedEstado,
    isConfirmed,
    setIsConfirmed,
    isLoading,
    handleConfirmChange,
  } = useCambiarEstadoVenta(venta, estadosDisponibles, onEstadoCambiado);

  const shouldShowDirectConfirmation = () => {
    return !isAdmin && estadosDisponibles.length === 1;
  };

  const handleOpenModal = () => {
    if (!canChangeState) return;

    setModalVisible(true);

    if (shouldShowDirectConfirmation()) {
      setSelectedEstado(estadosDisponibles[0].value);
      setStep("confirmation");
    } else {
      setStep("initial");
      setSelectedEstado("");
    }

    setIsConfirmed(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setStep("initial");
    setSelectedEstado("");
    setIsConfirmed(false);
  };

  const handleContinue = () => {
    if (!selectedEstado || !isConfirmed) return;
    setStep("confirmation");
  };

  const handleConfirm = async () => {
    await handleConfirmChange();
    handleCloseModal();
  };

  return (
    <>
      <CambiarEstadoVentaButton
        canChangeState={canChangeState}
        onPress={handleOpenModal}
        venta={venta}
        isAdmin={isAdmin}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}>
        <CambiarEstadoVentaModal
          step={step}
          venta={venta}
          isAdmin={isAdmin}
          canChangeState={canChangeState}
          estadosDisponibles={estadosDisponibles}
          selectedEstado={selectedEstado}
          setSelectedEstado={setSelectedEstado}
          isConfirmed={isConfirmed}
          setIsConfirmed={setIsConfirmed}
          isLoading={isLoading}
          onClose={handleCloseModal}
          onContinue={handleContinue}
          onConfirm={handleConfirm}
        />
      </Modal>
    </>
  );
};
