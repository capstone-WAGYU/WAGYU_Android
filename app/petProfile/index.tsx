import NextButton from "@/components/authPage/NextButton";
import ImageUpload from "@/components/myPage/petProfilePage/ImageUpload";
import AgeInput from "@/components/public/AgeInput";
import DropDown from "@/components/public/DropDown";
import Header from "@/components/public/Header";
import PetInforInput from "@/components/public/PetInforInput";
import { colors } from "@/constants";
import { usePetStore } from "@/store/petStore";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function PetProfile() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const isAllFilled = name && breed && age;

  const addPet = usePetStore((state) => state.addPet);

  const handleRouter = () => {
    if (!isAllFilled) {
      Alert.alert("알림", "반려동물 정보를 모두 입력해 주십시오.");
      return;
    }

    addPet({
      name,
      breed,
      age,
      gender,
    });

    router.push("/(tabs)/my");
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header label="" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          가이드에 맞춰 <Text style={styles.profile}>프로필</Text>을
          완성해보세요!
        </Text>
      </View>
      <View style={styles.imgContainer}>
        <ImageUpload />
      </View>

      <PetInforInput label={"이름"} value={name} onChangeText={setName} />
      <PetInforInput label={"품종"} value={breed} onChangeText={setBreed} />
      <AgeInput label={"나이"} value={age} onChangeText={setAge} />
      <DropDown label={"성별"} value={gender} onChange={setGender} />

      <View style={styles.goBottom}>
        <NextButton label={"입력 완료"} onPress={handleRouter} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  },
  textContainer: {
    alignItems: "center",
  },
  profile: {
    color: colors.MainColor,
  },
  img: {
    width: 120,
    height: 120,
    objectFit: "cover",
  },
  imgContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 30,
  },
  goBottom: {
    marginTop: "auto",
  },
});
