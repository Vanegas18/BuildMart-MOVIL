// components/Ventas/CambiarEstadoVenta/CambiarEstadoVentaButton.jsx
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getVentaButtonConfig } from "./utils/ButtonUtilsVentas";

export const CambiarEstadoVentaButton = ({
  canChangeState,
  onPress,
  venta,
  isAdmin,
}) => {
  const { text, icon, color, bgColor } = getVentaButtonConfig(
    canChangeState,
    venta,
    isAdmin
  );

  return (
    <View style={{ marginBottom: 12 }}>
      {canChangeState && (
        <TouchableOpacity
          onPress={onPress}
          disabled={!canChangeState}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingVertical: 12,
            marginHorizontal: 12,
            borderRadius: 10,
            backgroundColor: bgColor,
            borderWidth: 1.5,
            borderColor: color,
            shadowColor: color,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
            elevation: 3,
          }}>
          <Ionicons
            name={icon}
            size={18}
            color="#ffffff"
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#ffffff",
              textAlign: "center",
            }}>
            {text}
          </Text>
        </TouchableOpacity>
      )}

      {!canChangeState && (
        <Text
          style={{
            color: "#6b7280",
            fontSize: 12,
            textAlign: "center",
            marginTop: 6,
            marginHorizontal: 16,
            fontStyle: "italic",
          }}>
          {isAdmin
            ? "Esta venta está en estado final"
            : "No hay acciones disponibles"}
        </Text>
      )}
    </View>
  );
};
