import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLoginForm } from "./useRegisterForm";
import { FormFieldModern } from "./FormFieldModern";
import { PasswordField } from "./PasswordField";

// Versión alternativa con diseño más moderno
export const FormLoginModern = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const { control, onFormSubmit, errors, handleSubmit } = useLoginForm({
    setIsLoading,
  });

  return (
    <ScrollView
      style={modernStyles.container}
      showsVerticalScrollIndicator={false}>
      <View style={modernStyles.content}>
        <View style={modernStyles.form}>
          <FormFieldModern
            id="correo"
            label="Correo electrónico"
            type="email"
            placeholder="tu@ejemplo.com"
            control={control}
            errors={errors}
            rules={{
              required: "El correo es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "El correo es inválido",
              },
            }}
          />

          <View style={modernStyles.passwordSection}>
            <View style={modernStyles.passwordHeader}>
              <Text style={modernStyles.label}>Contraseña</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("RecuperarContrasena")}
                activeOpacity={0.7}>
                <Text style={modernStyles.forgotPasswordLink}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>

            <PasswordField
              id="contraseña"
              control={control}
              errors={errors}
              placeholder="••••••••"
            />
          </View>

          <TouchableOpacity
            style={[
              modernStyles.submitButton,
              isLoading && modernStyles.submitButtonDisabled,
            ]}
            onPress={handleSubmit(onFormSubmit)}
            disabled={isLoading}
            activeOpacity={0.9}>
            {isLoading ? (
              <View style={modernStyles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                <Text style={modernStyles.loadingText}>Conectando...</Text>
              </View>
            ) : (
              <Text style={modernStyles.submitButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={modernStyles.registerSection}>
          <Text style={modernStyles.registerText}>¿No tienes una cuenta? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            activeOpacity={0.7}>
            <Text style={modernStyles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const modernStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    padding: 24,
  },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  passwordSection: {
    marginBottom: 24,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  forgotPasswordLink: {
    fontSize: 12,
    color: "#3b82f6",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  registerSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
  },
  registerText: {
    fontSize: 14,
    color: "#6b7280",
  },
  registerLink: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "600",
  },
});
