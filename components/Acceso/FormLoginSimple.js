// FormLoginSimple.js - Formulario de login corregido
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormFieldModern } from "./FormFieldModern";
import { PasswordField } from "./PasswordField";
import { useAuth } from "../../core/context/Acceso/AuthContext";
import Toast from "react-native-toast-message";

// Versión SIN react-hook-form para evitar errores
export const FormLoginSimple = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: "",
  });
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const { login, error: authError } = useAuth();

  // Validación simple
  const validateForm = () => {
    const newErrors = {};

    if (!formData.correo) {
      newErrors.correo = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "El correo es inválido";
    }

    if (!formData.contraseña) {
      newErrors.contraseña = "La contraseña es requerida";
    } else if (formData.contraseña.length < 6) {
      newErrors.contraseña = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del envío del formulario - CORREGIDO
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      console.log("Datos del formulario:", formData);

      // Llamar a la función de login
      await login(formData);

      // Si llegamos aquí, el login fue exitoso
      console.log("Login exitoso, redirigiendo...");
      Toast.show({
        type: "success",
        text1: "Inicio de sesión exitoso",
        text2: "Bienvenido de nuevo a BuildMart",
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error en handleSubmit:", error);

      // Mostrar error específico si está disponible
      let errorMessage = "Error al iniciar sesión";

      if (error.response?.status === 400) {
        errorMessage =
          "Datos de login inválidos. Verifica tu correo y contraseña.";
      } else if (error.response?.status === 401) {
        errorMessage = "Correo o contraseña incorrectos.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (authError) {
        errorMessage = authError;
      }

      Alert.alert("Error de autenticación", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

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
            value={formData.correo}
            onChangeText={(value) => handleInputChange("correo", value)}
            error={errors.correo}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <View style={modernStyles.passwordSection}>
            <Text style={modernStyles.label}>Contraseña</Text>
            <PasswordField
              id="contraseña"
              value={formData.contraseña}
              onChangeText={(value) => handleInputChange("contraseña", value)}
              error={errors.contraseña}
              placeholder="••••••••"
              autoCapitalize="none"
            />
          </View>

          {/* Mostrar error de autenticación si existe */}
          {authError && (
            <View style={modernStyles.errorContainer}>
              <Text style={modernStyles.errorText}>{authError}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              modernStyles.submitButton,
              isLoading && modernStyles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
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

        <TouchableOpacity
          onPress={() => navigation.navigate("RecuperarContrasena")}
          activeOpacity={0.7}
          style={modernStyles.forgotPasswordContainer}>
          <Text style={modernStyles.forgotPasswordLink}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
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
    padding: 16,
    alignItems: "center",
    width: "100%",
  },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 32,
    marginBottom: 20,
    width: "100%", // Aumentado de 100%
    maxWidth: 900, // Aumentado de 500
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
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    width: "100%",
    maxWidth: 600,
  },
  forgotPasswordLink: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "500",
  },
  errorContainer: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 14,
    textAlign: "center",
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
    width: "100%",
    maxWidth: 600,
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
