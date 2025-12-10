import NextButton from "@/components/authPage/NextButton";
import ImageUpload from "@/components/myPage/petProfilePage/ImageUpload";
import AgeInput from "@/components/public/AgeInput";
import DiseaseSelect from "@/components/public/DiseaseSelect";
import Header from "@/components/public/Header";
import PetInforInput from "@/components/public/PetInforInput";
import PetSex from "@/components/public/PetSex";
import PetType from "@/components/public/PetType";
import { colors } from "@/constants";
import { breedDiseaseMap } from "@/constants/breedDiseaseMap";
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
      gender: gender || "미선택", // 성별이 선택되지 않았을 경우 기본값
      disease: disease || "없음", // 유전병이 선택되지 않았을 경우 기본값
    });

    router.back();
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

      <AgeInput label={"나이"} value={age} onChangeText={setAge} />

      <PetType label="품종" value={breed} onChange={handleBreedChange} />

      <PetSex label={"성별"} value={gender} onChange={setGender} />

      <DiseaseSelect
        label="유전병"
        value={disease}
        onChange={setDisease}
        options={diseaseOptions}
      />

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
