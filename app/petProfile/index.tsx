// app/petProfile.tsx
import { petApi } from "@/api/petApi";
import NextButton from "@/components/authPage/NextButton";
import ImageUpload from "@/components/myPage/petProfilePage/ImageUpload";
import AgeInput from "@/components/public/AgeInput";
import DiseaseSelect from "@/components/public/DiseaseSelect";
import Header from "@/components/public/Header";
import PetInforInput from "@/components/public/InfoInput";
import PetSex from "@/components/public/PetSex";
import PetType from "@/components/public/PetType";
import { colors } from "@/constants";
import { usePetStore } from "@/store/petStore";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PetProfile() {
  const { petId } = useLocalSearchParams();
  const isEditMode = !!petId;

  const [name, setName] = useState("");
  const [breed, setBreed] = useState<number | null>(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"M" | "F" | "">("");
  const [disease, setDisease] = useState<number[]>([]);

  const {
    breeds,
    diseases,
    loading,
    fetchBreeds,
    fetchDiseasesByBreed,
    addPet,
    clearDiseases,
  } = usePetStore();

  useEffect(() => {
    fetchBreeds();

    if (isEditMode && petId) {
      loadPetDataFromList(Number(petId));
    }
  }, []);

  // 전체 목록에서 petId 찾아서 상태 세팅
  const loadPetDataFromList = async (id: number) => {
    try {
      const pets = await petApi.getPets(); // 전체 목록 조회
      const pet = pets.find((p) => p.id === id);

      if (!pet) {
        Alert.alert("오류", "해당 반려동물을 찾을 수 없습니다.");
        return;
      }

      setName(pet.name);
      setBreed(pet.breed.id);
      setAge(pet.age.toString());
      setGender(pet.gender);
      setDisease(pet.diseases.map((d) => d.id));

      await fetchDiseasesByBreed(pet.breed.id);
    } catch (error) {
      Alert.alert("오류", "반려동물 정보를 불러오는데 실패했습니다.");
      console.error(error);
    }
  };

  const handleBreedChange = async (selectedBreedId: number) => {
    setBreed(selectedBreedId);
    setDisease([]);

    if (selectedBreedId) {
      await fetchDiseasesByBreed(selectedBreedId);
    } else {
      clearDiseases();
    }
  };

  const isAllFilled = Boolean(name.trim() && breed && age && gender);

  const handleSubmit = async () => {
    if (!isAllFilled) {
      Alert.alert("알림", "반려동물 정보를 모두 입력해 주십시오.");
      return;
    }

    try {
      if (isEditMode && petId) {
        // 수정 모드
        await petApi.updatePet(Number(petId), {
          name: name.trim(),
          age: parseInt(age),
          breedId: breed!,
          gender: gender as "M" | "F",
          diseaseIds: disease,
        });

        Alert.alert("성공", "반려동물 정보가 수정되었습니다.", [
          { text: "확인", onPress: () => router.replace("/(tabs)/my") },
        ]);
      } else {
        // 등록 모드
        await addPet({
          name: name.trim(),
          age: parseInt(age),
          breedId: breed!,
          gender: gender as "M" | "F",
          diseaseIds: disease,
        });

        Alert.alert("성공", "반려동물이 등록되었습니다.", [
          { text: "확인", onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      Alert.alert(
        "오류",
        isEditMode
          ? "반려동물 정보 수정에 실패했습니다."
          : "반려동물 등록에 실패했습니다."
      );
    }
  };

  if (loading && breeds.length === 0) {
    return (
      <SafeAreaView style={styles.background}>
        <Header label="" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.MainColor} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
      <Header label="" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {isEditMode ? (
              "반려동물 정보"
            ) : (
              <>
                가이드에 맞춰 <Text style={styles.profile}>프로필</Text>을
                완성해보세요!
              </>
            )}
          </Text>
        </View>
        <View style={styles.imgContainer}>
          <ImageUpload />
        </View>

        <PetInforInput
          label={"이름"}
          value={name}
          onChangeText={setName}
          editable={true} // Edit 모드에서도 수정 가능
        />

        <AgeInput
          label={"나이"}
          value={age}
          onChangeText={setAge}
          editable={true} // Edit 모드에서도 수정 가능
        />

        <PetType
          value={breed}
          onChange={handleBreedChange}
          breeds={breeds}
          disabled={false} // Edit 모드에서도 변경 가능
        />

        <PetSex
          label={"성별"}
          value={gender === "M" ? "male" : gender === "F" ? "female" : ""}
          onChange={(value) => setGender(value === "male" ? "M" : "F")}
        />

        <DiseaseSelect
          value={disease}
          onChange={setDisease}
          options={diseases}
        />

        <View style={styles.goBottom}>
          <NextButton
            label={
              loading
                ? isEditMode
                  ? "수정 중..."
                  : "등록 중..."
                : isEditMode
                  ? "수정 완료"
                  : "입력 완료"
            }
            onPress={handleSubmit}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
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
  imgContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 30,
  },
  goBottom: {
    marginTop: 40,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
