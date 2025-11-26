import { usePetStore } from "@/store/petStore";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PetCard from "./PetCard";
import PetCardAdd from "./PetCardAdd";

function PetInfor() {
  const pets = usePetStore((state) => state.pets);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>반려동물</Text>

      {pets.map((pet, index) => (
        <PetCard
          key={index}
          name={pet.name}
          breed={pet.breed}
          date={"2025.11.26"}
          // date={`${pet.age} 살`}
        />
      ))}

      <PetCardAdd />
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
});

export default PetInfor;
