// components/CambiarEstado/CambiarEstado.jsx
import { useState, useEffect } from "react";
import { TouchableOpacity, Modal } from "react-native";
import { CambiarEstadoButton } from "./CambiarEstadoButton";
import { CambiarEstadoModal } from "./CambiarEstadoModal";
import { useCambiarEstado } from "./useCambiarEstado";
import { useEstadosDisponibles } from "./useEstadosDisponibles";
import { useUserRoles } from "./useUserRoles";

export const CambiarEstado = ({ pedido, onEstadoCambiado }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState("initial");

  const { isAdmin, isCuentaRol } = useUserRoles();
  const { estadosDisponibles, canChangeState } = useEstadosDisponibles(
    pedido,
    isAdmin
  );

  const {
    selectedEstado,
    setSelectedEstado,
    isConfirmed,
    setIsConfirmed,
    isLoading,
    handleConfirmChange,
  } = useCambiarEstado(pedido, estadosDisponibles, onEstadoCambiado);

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
      <CambiarEstadoButton
        canChangeState={canChangeState}
        onPress={handleOpenModal}
        pedido={pedido}
        isAdmin={isAdmin}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}>
        <CambiarEstadoModal
          step={step}
          pedido={pedido}
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
