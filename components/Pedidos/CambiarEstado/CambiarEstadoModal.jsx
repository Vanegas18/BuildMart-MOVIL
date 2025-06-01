// components/CambiarEstado/CambiarEstadoModal.jsx
import { View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { ModalHeader } from "./ModalHeader";
import { PedidoInfo } from "./PedidoInfo";
import { EstadoSelector } from "./EstadoSelector";
import { ConfirmationStep } from "./ConfirmationStep";
import { ModalButtons } from "./ModalButtons";

export const CambiarEstadoModal = ({
  step,
  pedido,
  isAdmin,
  canChangeState,
  estadosDisponibles,
  selectedEstado,
  setSelectedEstado,
  isConfirmed,
  setIsConfirmed,
  isLoading,
  onClose,
  onContinue,
  onConfirm,
}) => {
  const getNoAvailableMessage = () => {
    if (isAdmin) {
      return "El pedido se encuentra en estado final";
    }
    return "No hay acciones disponibles para este pedido";
  };

  const getButtonText = () => {
    if (!canChangeState) return "No disponible";
    if (isAdmin) return "Cambiar estado";

    switch (pedido.estado) {
      case "pendiente":
        return "Cancelar pedido";
      case "confirmado":
      case "rechazado":
        return "Comprar nuevamente";
      default:
        return "No disponible";
    }
  };

  return (
    <BlurView
      intensity={80}
      tint="dark"
      className="flex-1 justify-center items-center px-4">
      <View
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 20,
          elevation: 20,
        }}>
        {step === "initial" ? (
          <View className="p-6">
            <ModalHeader
              title={isAdmin ? "Cambiar Estado" : getButtonText()}
              onClose={onClose}
            />

            <PedidoInfo pedido={pedido} isAdmin={isAdmin} />

            {!canChangeState ? (
              <View className="items-center py-8">
                <View className="w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-4">
                  <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center">
                    <Text className="text-red-500 text-2xl">🔒</Text>
                  </View>
                </View>

                <Text className="text-gray-500 text-center leading-relaxed">
                  {getNoAvailableMessage()}
                </Text>

                <View className="bg-gray-50 rounded-xl p-3 mt-4 w-full">
                  <Text className="text-gray-600 text-center text-sm">
                    Estado actual:{" "}
                    <Text className="font-bold capitalize text-gray-800">
                      {pedido.estado}
                    </Text>
                  </Text>
                </View>
              </View>
            ) : (
              <EstadoSelector
                isAdmin={isAdmin}
                estadosDisponibles={estadosDisponibles}
                selectedEstado={selectedEstado}
                setSelectedEstado={setSelectedEstado}
                isConfirmed={isConfirmed}
                setIsConfirmed={setIsConfirmed}
              />
            )}

            <ModalButtons
              step="initial"
              canChangeState={canChangeState}
              selectedEstado={selectedEstado}
              isConfirmed={isConfirmed}
              isLoading={isLoading}
              onClose={onClose}
              onContinue={onContinue}
            />
          </View>
        ) : (
          <ConfirmationStep
            pedido={pedido}
            isAdmin={isAdmin}
            selectedEstado={selectedEstado}
            estadosDisponibles={estadosDisponibles}
            isLoading={isLoading}
            onClose={onClose}
            onConfirm={onConfirm}
          />
        )}
      </View>
    </BlurView>
  );
};
