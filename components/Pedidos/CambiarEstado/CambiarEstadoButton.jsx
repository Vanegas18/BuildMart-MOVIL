// components/CambiarEstado/CambiarEstadoButton.jsx
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getButtonConfig } from "./utils/buttonUtils";

export const CambiarEstadoButton = ({
  canChangeState,
  onPress,
  pedido,
  isAdmin,
}) => {
  const { text, icon, styles } = getButtonConfig(
    canChangeState,
    pedido,
    isAdmin
  );

  return (
    <View style={{ marginBottom: 16 }}>
      {canChangeState && (
        <TouchableOpacity
          onPress={onPress}
          disabled={!canChangeState}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
            paddingVertical: 14,
            marginHorizontal: 16,
            borderRadius: 12,
            backgroundColor: canChangeState ? "#dc2626" : "#9ca3af",
            borderWidth: 1,
            borderColor: canChangeState ? "#b91c1c" : "#6b7280",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: canChangeState ? 0.1 : 0.05,
            shadowRadius: 4,
            elevation: canChangeState ? 3 : 1,
          }}>
          <Ionicons
            name="close-circle"
            size={18}
            color={canChangeState ? "#ffffff" : "#d1d5db"}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: "#ffffff",
              textAlign: "center",
            }}>
            {isAdmin ? "Cambiar Estado" : "Cancelar pedido"}
          </Text>
        </TouchableOpacity>
      )}

      {!canChangeState && (
        <Text
          style={{
            color: "#dc2626",
            fontSize: 13,
            textAlign: "center",
            marginTop: 8,
            marginHorizontal: 16,
          }}>
          No puedes {isAdmin ? "cambiar el estado" : "cancelar este pedido"}, se
          encuentra en su estado final.
        </Text>
      )}
    </View>
  );
};
