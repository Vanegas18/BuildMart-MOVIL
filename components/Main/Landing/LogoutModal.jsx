import { Modal, Pressable, Text, View } from "react-native";

export default function LogoutModal({ isVisible, onClose, onConfirm }) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-lg p-6 mx-4 w-80">
          {/* Header */}
          <Text className="text-lg font-semibold text-center text-gray-900 mb-2">
            ¿Cerrar sesión?
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            ¿Estás seguro de que deseas cerrar tu sesión?
          </Text>

          {/* Footer */}
          <View className="flex-row justify-end space-x-2">
            <Pressable onPress={onClose} className="px-4 py-2 rounded-md">
              <Text className="text-gray-600">Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="px-4 py-2 bg-red-600 rounded-md active:bg-red-700">
              <Text className="text-white font-medium">Cerrar Sesión</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
