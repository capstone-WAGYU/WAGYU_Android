import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PhoneEditModalProps {
  visible: boolean;
  onClose: () => void;
  currentPhone: string;
  onSave: (phone: string) => void;
}

export default function PhoneEdit({
  visible,
  onClose,
  currentPhone,
  onSave,
}: PhoneEditModalProps) {
  const [phone, setPhone] = useState(currentPhone);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");

    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  const handleChange = (text: string) => {
    setPhone(formatPhone(text));
  };

  useEffect(() => {
    if (visible) {
      setPhone(currentPhone);
    }
  }, [visible, currentPhone]);

  const handleClose = () => {
    onSave(phone);
    onClose();
  };

  return (
    <Modal visible={visible} transparent onRequestClose={handleClose}>
      <Pressable style={styles.overlay} onPress={handleClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardView}
        >
          <Pressable
            style={styles.bottomSheet}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.header}>
              <Text style={styles.title}>연락처 수정</Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={handleChange}
                keyboardType="number-pad"
                maxLength={13}
                placeholder="연락처를 입력해주세요"
                placeholderTextColor="#aaa"
                autoFocus
              />
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  keyboardView: {
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 2,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  input: {
    fontSize: 15,
    color: "#000",
    padding: 0,
  },
});
