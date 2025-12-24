import { colors } from "@/constants";
import { usePetStore } from "@/store/petStore";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import PetCard from "./PetCard";
import PetCardAdd from "./PetCardAdd";

function PetInfor() {
  // pets와 loading을 store에서 바로 구독
  const pets = usePetStore((state) => state.pets);
  const loading = usePetStore((state) => state.loading);
  const fetchPets = usePetStore((state) => state.fetchPets);

  // 초기 로드
  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>반려동물</Text>

      {loading && pets.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.MainColor} />
        </View>
      ) : (
        <>
          {pets.slice(0, 2).map((pet) => (
            <PetCard
              key={pet.id}
              petId={pet.id}
              name={pet.name}
              breed={pet.breed.name}
              date={new Date()
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\. /g, ".")
                .replace(/\.$/, "")}
            />
          ))}

          {pets.length < 2 && <PetCardAdd />}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
    paddingVertical: 12,
    fontWeight: "bold",
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
});

export default PetInfor;
