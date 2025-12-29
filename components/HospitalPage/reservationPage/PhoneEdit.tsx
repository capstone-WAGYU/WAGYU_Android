import { petApi } from "@/api/petApi";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PhoneEditProps {
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
}: PhoneEditProps) {
  const [phone, setPhone] = useState(currentPhone);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPhone(currentPhone);
  }, [currentPhone]);

  const handleSave = async () => {
    try {
      setLoading(true);

      await petApi.updatePhone(phone);
      onSave(phone);

      Alert.alert("완료", "전화번호가 수정되었습니다.");
      onClose();
    } catch {
      Alert.alert("오류", "전화번호 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>전화번호 수정</Text>

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} disabled={loading}>
              <Text style={styles.save}>{loading ? "저장 중..." : "저장"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
  },
  cancel: {
    color: "#999",
    fontSize: 14,
  },
  save: {
    color: "#015DA9",
    fontSize: 14,
    fontWeight: "600",
  },
});
