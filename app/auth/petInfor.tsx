import AgeInput from "@/components/authPage/AgeInput";
import AnnouncePetInforText from "@/components/authPage/AnnouncePetInforText";
import DropDown from "@/components/authPage/DropDown";
import NextButton from "@/components/authPage/NextButton";
import PetInforHeader from "@/components/authPage/PetInforHeader";
import PetInforInput from "@/components/authPage/PetInforInput";
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
      <AgeInput label={"나이"} />
      <DropDown label={"성별"} />
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
