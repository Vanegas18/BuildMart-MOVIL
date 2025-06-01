import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../core/context/Acceso/AuthContext";
import Toast from "react-native-toast-message";
import { FormFieldModern } from "./FormFieldModern";

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

  // Manejo del envío del formulario
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(formData);
      Toast.show({
        type: "success",
        text1: "¡Bienvenido!",
        text2: "Inicio de sesión exitoso",
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error en login:", error);

      let errorMessage = "Error al iniciar sesión";
      if (error.response?.status === 401) {
        errorMessage = "Correo o contraseña incorrectos";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Toast.show({
        type: "error",
        text1: "¡Error al iniciar!",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Manejo de cambios en los inputs
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      {/* Header con botón de volver */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Ionicons name="home" size={24} color="#3b82f6" />
          <Text style={styles.headerTitle}>
            BUILD <Text style={styles.headerTitleBlue}>MART</Text>
          </Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Título y descripción */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>
            Ingresa tus credenciales para acceder a tu cuenta
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <FormFieldModern
            label="Correo electrónico"
            value={formData.correo}
            onChangeText={(value) => handleInputChange("correo", value)}
            error={errors.correo}
            placeholder="tu@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormFieldModern
            label="Contraseña"
            value={formData.contraseña}
            onChangeText={(value) => handleInputChange("contraseña", value)}
            error={errors.contraseña}
            placeholder="••••••••"
            secureTextEntry={true}
            autoCapitalize="none"
          />

          {/* Error de autenticación */}
          {authError && (
            <View style={styles.authErrorContainer}>
              <Text style={styles.authErrorText}>{authError}</Text>
            </View>
          )}

          {/* Botón de submit */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isLoading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isLoading}
            activeOpacity={0.9}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                <Text style={styles.loadingText}>Ingresando...</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          {/* Link de contraseña olvidada */}
          <TouchableOpacity
            onPress={() => navigation.navigate("RecuperarContrasena")}
            style={styles.forgotPasswordButton}
            activeOpacity={0.7}>
            <Text style={styles.forgotPasswordText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sección de registro */}
        <View style={styles.registerSection}>
          <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            activeOpacity={0.7}>
            <Text style={styles.registerLink}>Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
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
