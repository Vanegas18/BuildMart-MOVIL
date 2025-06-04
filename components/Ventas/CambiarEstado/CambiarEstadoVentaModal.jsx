// components/Ventas/CambiarEstadoVenta/CambiarEstadoVentaModal.jsx
import { View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { VentaModalHeader } from "./VentaModalHeader";
import { VentaInfo } from "./VentaInfo";
import { EstadoSelectorVenta } from "./EstadoSelectorVenta";
import { VentaConfirmationStep } from "./VentaConfirmationStep";
import { VentaModalButtons } from "./VentaModalButtons";

export const CambiarEstadoVentaModal = ({
  step,
  venta,
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
      return "La venta se encuentra en estado final";
    }
    return "No hay acciones disponibles para esta venta";
  };

  const getButtonText = () => {
    if (!canChangeState) return "No disponible";
    if (isAdmin) return "Cambiar estado de venta";

    switch (venta.estado) {
      case "procesando":
        return "Solicitar reembolso";
      case "enviado":
        return "Marcar como recibido";
      case "entregado":
        return "Confirmar recepción";
      case "completado":
        return "Solicitar soporte";
      default:
        return "Gestionar venta";
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
            <VentaModalHeader
              title={isAdmin ? "Gestionar Venta" : getButtonText()}
              onClose={onClose}
            />

            <VentaInfo venta={venta} isAdmin={isAdmin} />

            {!canChangeState ? (
              <View className="items-center py-8">
                <View className="w-20 h-20 bg-gray-50 rounded-full items-center justify-center mb-4">
                  <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                    <Text className="text-gray-500 text-2xl">🔒</Text>
                  </View>
                </View>

                <Text className="text-gray-500 text-center leading-relaxed">
                  {getNoAvailableMessage()}
                </Text>

                <View className="bg-gray-50 rounded-xl p-3 mt-4 w-full">
                  <Text className="text-gray-600 text-center text-sm">
                    Estado actual:{" "}
                    <Text className="font-bold capitalize text-gray-800">
                      {venta.estado}
                    </Text>
                  </Text>
                </View>
              </View>
            ) : (
              <EstadoSelectorVenta
                isAdmin={isAdmin}
                estadosDisponibles={estadosDisponibles}
                selectedEstado={selectedEstado}
                setSelectedEstado={setSelectedEstado}
                isConfirmed={isConfirmed}
                setIsConfirmed={setIsConfirmed}
                venta={venta}
              />
            )}

            <VentaModalButtons
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
          <VentaConfirmationStep
            venta={venta}
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
