import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useAuth } from "../../core/context/Acceso/AuthContext";
import { useEffect } from "react";
// Para navegación en React Native
import { useNavigation } from "@react-navigation/native";

// Hook personalizado para el formulario de registro
export const useRegisterForm = ({ setIsLoading }) => {
  const {
    control, // Cambio: usar control en lugar de register para React Native
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigation = useNavigation(); // Cambio: useNavigation en lugar de useNavigate
  const { signup, isAuthenticated } = useAuth();

  // Redireccionar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) navigation.navigate("Login"); // Cambio: navigate() -> navigation.navigate()
  }, [isAuthenticated]);

  // Manejador de envío del formulario
  const onFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      await signup(values);
    } catch (error) {
      // Cambio: Toast.show() en lugar de toast.error()
      Toast.show({
        type: "error",
        text1: "Error al registrar",
        text2:
          error.response?.data?.message ||
          "Error al crear la cuenta, Intente nuevamente.",
      });
      handleFormError(error, setError);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return {
    control, // Cambio: devolver control en lugar de register
    handleSubmit,
    errors,
    onFormSubmit,
  };
};

// Hook personalizado para el formulario de inicio de sesión
export const useLoginForm = ({ setIsLoading }) => {
  const {
    control, // Cambio: usar control en lugar de register
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigation = useNavigation(); // Cambio: useNavigation
  const { signin, isAuthenticated } = useAuth();

  // Redireccionar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) navigation.navigate("Home"); // Cambio: navigation.navigate()
  }, [isAuthenticated]);

  // Manejador de envío del formulario
  const onFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      await signin(values);
    } catch (error) {
      console.log(error);
      handleFormError(error, setError);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return {
    control, // Cambio: devolver control
    handleSubmit,
    errors,
    onFormSubmit,
  };
};

// Función auxiliar para manejar errores del formulario
const handleFormError = (error, setError) => {
  console.error("Error al registrar:", error);

  if (error.response && error.response.data) {
    const { error: backendError } = error.response.data;

    // Manejar errores estructurados (tipo Zod/Yup)
    if (backendError?.issues) {
      backendError.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        setError(fieldName, {
          type: "server",
          message: issue.message,
        });
        // Cambio: Toast.show() para cada error
        Toast.show({
          type: "error",
          text1: "Error de validación",
          text2: issue.message,
        });
      });
    } else if (typeof backendError === "string") {
      // Mapa mejorado para detectar campos en mensajes de error
      const errorPatterns = {
        cedula:
          /(cédula|cedula)(?:\s+ya\s+está\s+registrada|\s+duplicada|\s+existe)/i,
        nombre: /(nombre)(?:\s+ya\s+está\s+registrado|\s+duplicado|\s+existe)/i,
        correo: /(correo)(?:\s+ya\s+está\s+registrado|\s+duplicado|\s+existe)/i,
        telefono:
          /(teléfono|telefono)(?:\s+ya\s+está\s+registrado|\s+duplicado|\s+existe)/i,
      };

      // Verificar cada campo contra el mensaje de error
      let errorAssigned = false;
      for (const [fieldName, pattern] of Object.entries(errorPatterns)) {
        if (pattern.test(backendError)) {
          setError(fieldName, {
            type: "server",
            message: backendError,
          });
          errorAssigned = true;
          // Cambio: Toast.show() con mensaje específico
          Toast.show({
            type: "error",
            text1: "Error de registro",
            text2: backendError,
          });
          break;
        }
      }

      // Si no se pudo asignar a un campo específico, mostrar toast
      if (!errorAssigned) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: backendError || "Error al crear la cuenta",
        });
      }
    }
  } else {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Ocurrió un error al crear la cuenta",
    });
  }
};
