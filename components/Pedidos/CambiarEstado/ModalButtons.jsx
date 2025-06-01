// components/CambiarEstado/components/ModalButtons.jsx
import { View, Text, TouchableOpacity } from "react-native";

export const ModalButtons = ({
  step,
  canChangeState,
  selectedEstado,
  isConfirmed,
  isLoading,
  onClose,
  onContinue,
}) => (
  <View className="flex-row space-x-4 mt-8">
    <TouchableOpacity
      onPress={onClose}
      disabled={isLoading}
      className="flex-1 bg-gray-100 py-4 rounded-2xl border border-gray-200">
      <Text className="text-gray-700 font-bold text-center">Cancelar</Text>
    </TouchableOpacity>

    {canChangeState && step === "initial" && (
      <TouchableOpacity
        onPress={onContinue}
        disabled={!selectedEstado || !isConfirmed || isLoading}
        className={`flex-1 py-4 rounded-2xl ${
          selectedEstado && isConfirmed && !isLoading
            ? "bg-blue-500"
            : "bg-gray-300"
        }`}>
        <Text
          className={`font-bold text-center ${
            selectedEstado && isConfirmed && !isLoading
              ? "text-white"
              : "text-gray-500"
          }`}>
          Continuar
        </Text>
      </TouchableOpacity>
    )}
  </View>
);
