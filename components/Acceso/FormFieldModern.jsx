// FormFieldModern.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

// Versión SIN react-hook-form para evitar errores
export const FormFieldModern = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChangeText,
  error,
  maxLength,
  secureTextEntry = false,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
}) => {
  const getKeyboardType = () => {
    switch (type) {
      case "email":
        return "email-address";
      case "tel":
      case "phone":
        return "phone-pad";
      case "number":
        return "numeric";
      default:
        return keyboardType;
    }
  };

  const getSecureTextEntry = () => {
    return type === "password" || secureTextEntry;
  };

  return (
    <View style={modernStyles.fieldContainer}>
      <Text style={modernStyles.label}>{label}</Text>

      <TextInput
        style={[
          modernStyles.input,
          error && modernStyles.inputError,
          multiline && modernStyles.multilineInput,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        secureTextEntry={getSecureTextEntry()}
        keyboardType={getKeyboardType()}
        multiline={multiline}
        numberOfLines={numberOfLines}
        autoCapitalize={type === "email" ? "none" : "sentences"}
        autoCorrect={type === "email" || type === "password" ? false : true}
      />

      {error && <Text style={modernStyles.errorText}>{error}</Text>}
    </View>
  );
};

const modernStyles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
    minHeight: 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: "#f87171",
    borderWidth: 1.5,
  },
  multilineInput: {
    minHeight: 96,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  errorText: {
    fontSize: 12,
    color: "#f87171",
    marginTop: 6,
    fontWeight: "400",
  },
});
