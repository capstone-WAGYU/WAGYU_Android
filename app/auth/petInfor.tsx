import AnnouncePetInforText from "@/components/AnnouncePetInforText";
import NextButton from "@/components/NextButton";
import PetInforHeader from "@/components/PetInforHeader";
import PetInforInput from "@/components/PetInforInput";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function petInfor() {
  const handleRouter = () => {
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.background}>
      <PetInforHeader />
      <AnnouncePetInforText Label={"반려동물 정보를 입력해주세요"} />
      <PetInforInput label={"이름"} />
      <PetInforInput label={"품종"} />
      <PetInforInput label={"나이"} />
      <PetInforInput label={"성별"} />
      <View style={styles.voidContainer}>
        <NextButton label={"입력 완료"} onPress={handleRouter} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  voidContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
