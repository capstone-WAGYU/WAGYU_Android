import NextButton from "@/components/authPage/NextButton";
import Header from "@/components/HospitalPage/Header";
import PhoneCard from "@/components/HospitalPage/reservationPage/PhoneCard";
import PhoneEdit from "@/components/HospitalPage/reservationPage/PhoneEdit";
import PetCard from "@/components/myPage/PetCard";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReservationScreen() {
  const [visitReason, setVisitReason] = useState("");
  const [request, setRequest] = useState("");
  const [phone, setPhone] = useState("010-1234-5678");
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header label={"예약 하기"} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>추가정보</Text>

        <PetCard name="최인규" breed="불독" date="2025.09.05" />

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>
            진료 받을 내용 <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="내용을 입력해주세요"
              placeholderTextColor="#aaa"
              multiline
              maxLength={80}
              value={visitReason}
              onChangeText={setVisitReason}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{visitReason.length}/80</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <PhoneCard phone={phone} onPress={() => setPhoneModalVisible(true)} />

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>요청사항</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="내용을 입력해주세요"
              placeholderTextColor="#aaa"
              multiline
              maxLength={30}
              value={request}
              onChangeText={setRequest}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{request.length}/30</Text>
          </View>
        </View>
        <NextButton label={"예약 완료"} />
      </ScrollView>

      <PhoneEdit
        visible={phoneModalVisible}
        onClose={() => setPhoneModalVisible(false)}
        currentPhone={phone}
        onSave={setPhone}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    paddingVertical: 18,
  },
  inputSection: {
    marginVertical: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 12,
  },
  required: {
    color: "#015DA9",
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 12,
    minHeight: 120,
  },
  textArea: {
    fontSize: 14,
    color: "#000",
    minHeight: 60,
    padding: 0,
  },
  charCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 17.5,
  },
  divider: {
    height: 8,
    backgroundColor: "#f5f5f5",
    marginHorizontal: -20,
    marginTop: 25,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 22,
    backgroundColor: "#fff",
  },
  reserveButton: {
    backgroundColor: "#015DA9",
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: "center",
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
