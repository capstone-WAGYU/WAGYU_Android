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
  Pressable,
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
  const [gender, setGender] = useState<"M" | "F">("M");

  const [disease, setDisease] = useState<number[]>([]);

  const {
    breeds,
    diseases,
    loading,
    petImages,
    fetchBreeds,
    fetchDiseasesByBreed,
    addPet,
    deletePet,
    clearDiseases,
    setPetImage,
  } = usePetStore();

  const [imageUri, setImageUri] = useState<string | null>(
    isEditMode && petId ? petImages[Number(petId)] ?? null : null
  );

  const handleImageChange = (uri: string) => {
    setImageUri(uri);
    if (isEditMode && petId) {
      setPetImage(Number(petId), uri);
    }
  };

  useEffect(() => {
    fetchBreeds();

    if (isEditMode && petId) {
      loadPetDataFromList(Number(petId));
    }
  }, []);

  const loadPetDataFromList = async (id: number) => {
    try {
      const pets = await petApi.getPets();
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
    } catch {
      Alert.alert("오류", "반려동물 정보를 불러오는데 실패했습니다.");
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
        // 등록 모드 — 추가 전 기존 pet ID 목록 스냅샷
        const existingIds = new Set(usePetStore.getState().pets.map((p) => p.id));

        await addPet({
          name: name.trim(),
          age: parseInt(age),
          breedId: breed!,
          gender: gender as "M" | "F",
          diseaseIds: disease,
        });

        // 새로 생긴 pet을 찾아 이미지 연결
        if (imageUri) {
          const newPet = usePetStore.getState().pets.find((p) => !existingIds.has(p.id));
          if (newPet) setPetImage(newPet.id, imageUri);
        }

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
          <ImageUpload value={imageUri} onChange={handleImageChange} />
        </View>

        <PetInforInput
          label={"이름"}
          value={name}
          onChangeText={setName}
          editable={true}
        />

        <AgeInput
          label={"나이"}
          value={age}
          onChangeText={setAge}
          editable={true}
        />

        <PetType
          value={breed}
          onChange={handleBreedChange}
          breeds={breeds}
          disabled={false}
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
          {isEditMode ? (
            <View style={styles.buttonRow}>
              <View style={{ flex: 2 }}>
                <NextButton
                  label={loading ? "수정 중..." : "수정 완료"}
                  onPress={handleSubmit}
                  disabled={loading}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Pressable
                  style={({ pressed }) => [
                    styles.deleteBtn,
                    loading && styles.deleteBtnDisabled,
                    pressed && !loading && styles.pressed,
                  ]}
                  onPress={() => {
                    Alert.alert(
                      "삭제 확인",
                      `${name}을(를) 삭제하시겠습니까?`,
                      [
                        { text: "취소", style: "cancel" },
                        {
                          text: "삭제",
                          style: "destructive",
                          onPress: async () => {
                            try {
                              await deletePet(Number(petId));
                              Alert.alert("완료", "반려동물이 삭제되었습니다.", [
                                { text: "확인", onPress: () => router.replace("/(tabs)/my") },
                              ]);
                            } catch {
                              Alert.alert("오류", "삭제에 실패했습니다.");
                            }
                          },
                        },
                      ]
                    );
                  }}
                  disabled={loading}
                >
                  <Text style={styles.deleteBtnText}>삭제</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <NextButton
              label={loading ? "등록 중..." : "입력 완료"}
              onPress={handleSubmit}
              disabled={loading}
            />
          )}
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
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  deleteBtn: {
    flex: 1,
    height: 45,
    borderRadius: 5,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtnDisabled: {
    backgroundColor: colors.GRAY5,
  },
  deleteBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
