// components/CambiarEstado/components/EstadoSelector.jsx
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export const EstadoSelector = ({
  isAdmin,
  estadosDisponibles,
  selectedEstado,
  setSelectedEstado,
  isConfirmed,
  setIsConfirmed,
}) => (
  <View className="space-y-6">
    {/* Selector de estado */}
    <View>
      <Text className="text-lg font-bold text-gray-900 mb-4">
        {isAdmin ? "Seleccionar nuevo estado:" : "Acción disponible:"}
      </Text>

      <View className="border-2 border-gray-200 rounded-2xl bg-gray-50 overflow-hidden">
        <Picker
          selectedValue={selectedEstado}
          onValueChange={setSelectedEstado}
          style={{ height: 60 }}>
          <Picker.Item
            label={
              isAdmin ? "Selecciona un estado..." : "Selecciona una acción..."
            }
            value=""
            color="#9CA3AF"
          />
          {estadosDisponibles.map((estado) => (
            <Picker.Item
              key={estado.value}
              label={estado.label}
              value={estado.value}
              color="#374151"
            />
          ))}
        </Picker>
      </View>
    </View>

    {/* Checkbox de confirmación */}
    <TouchableOpacity
      onPress={() => setIsConfirmed(!isConfirmed)}
      className="flex-row items-center p-4 bg-blue-50 rounded-2xl border border-blue-200">
      <View
        className={`w-6 h-6 rounded-lg border-2 items-center justify-center mr-4 ${
          isConfirmed
            ? "bg-blue-500 border-blue-500"
            : "border-gray-300 bg-white"
        }`}>
        {isConfirmed && <Ionicons name="checkmark" size={16} color="white" />}
      </View>

      <Text className="text-sm text-gray-700 flex-1 leading-relaxed font-medium">
        Confirmo que deseo realizar esta acción y entiendo que puede ser
        irreversible.
      </Text>
    </TouchableOpacity>
  </View>
);