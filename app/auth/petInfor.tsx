import AnnouncePetInforText from "@/components/authPage/AnnouncePetInforText";
import NextButton from "@/components/authPage/NextButton";
import PetInforHeader from "@/components/authPage/PetInforHeader";
import ImageUpload from "@/components/myPage/petProfilePage/ImageUpload";
import AgeInput from "@/components/public/AgeInput";
import DiseaseSelect from "@/components/public/DiseaseSelect";
import PetInforInput from "@/components/public/PetInforInput";
import PetSex from "@/components/public/PetSex";
import PetType from "@/components/public/PetType";
import { breedDiseaseMap } from "@/constants/breedDiseaseMap";
import { usePetStore } from "@/store/petStore";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PetInfor() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [disease, setDisease] = useState("");

  const [diseaseOptions, setDiseaseOptions] = useState<string[]>([]);

  const addPet = usePetStore((state) => state.addPet);

  const handleBreedChange = (value: string) => {
    setBreed(value);

    // 품종에 맞는 유전병 리스트 가져오기
    const diseases = breedDiseaseMap[value] ?? [];
    setDiseaseOptions(diseases);

    // 품종이 변경되면 유전병 선택 초기화
    setDisease("");
  };

  // 필수 필드: 이름, 품종, 나이
  const isAllFilled = name.trim() && breed && age;

  const handleRouter = () => {
    if (!isAllFilled) {
      Alert.alert("알림", "반려동물 정보를 모두 입력해 주십시오.");
      return;
    }

    addPet({
      name: name.trim(),
      breed,
      age,
      gender: gender || "미선택",
      disease: disease || "없음",
    });

    router.push("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.background}>
      <PetInforHeader />
      <AnnouncePetInforText Label={"반려동물 정보를 입력해주세요"} />

      <View style={styles.imgContainer}>
        <ImageUpload />
      </View>

      <PetInforInput label={"이름"} value={name} onChangeText={setName} />

      <AgeInput label={"나이"} value={age} onChangeText={setAge} />

      <PetType label="품종" value={breed} onChange={handleBreedChange} />

      <PetSex label={"성별"} value={gender} onChange={setGender} />

      <DiseaseSelect
        label="유전병"
        value={disease}
        onChange={setDisease}
        options={diseaseOptions}
      />

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
  imgContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
});
