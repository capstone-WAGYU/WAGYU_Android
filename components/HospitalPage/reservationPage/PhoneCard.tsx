import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PhoneCardProps {
  phone: string;
  onPress: () => void;
}

export default function PhoneCard({ phone, onPress }: PhoneCardProps) {
  return (
    <TouchableOpacity style={styles.contactCard} onPress={onPress}>
      <View>
        <Text style={styles.contactLabel}>내 연락처</Text>
        <Text style={styles.contactNumber}>010-1234-5678</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  contactLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});
