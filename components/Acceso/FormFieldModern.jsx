import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Componente de campo de entrada moderno
export const FormFieldModern = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}>
            <Text style={styles.eyeText}>
              {showPassword ? (
                <Ionicons name="eye-off-outline" size={24} color="#6b7280" />
              ) : (
                <Ionicons name="eye" size={24} color="#6b7280" />
              )}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  headerTitleBlue: {
    color: "#3b82f6",
  },
  headerSpacer: {
    width: 40, // Para balancear el botón de atrás
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 32,
    marginBottom: 24,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    minHeight: 52,
  },
  inputError: {
    borderColor: "#ef4444",
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  eyeText: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 13,
    color: "#ef4444",
    marginTop: 6,
    fontWeight: "500",
  },
  authErrorContainer: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  authErrorText: {
    color: "#dc2626",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 8,
  },
  forgotPasswordButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  forgotPasswordText: {
    fontSize: 15,
    color: "#3b82f6",
    fontWeight: "500",
  },
  registerSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    maxWidth: 480,
    alignSelf: "center",
    width: "100%",
  },
  registerText: {
    fontSize: 15,
    color: "#6b7280",
  },
  registerLink: {
    fontSize: 15,
    color: "#3b82f6",
    fontWeight: "600",
  },
};
