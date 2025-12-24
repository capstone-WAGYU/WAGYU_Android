// components/PetCard.tsx
import { colors } from "@/constants";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface PetCardProps extends PressableProps {
  petId: number;
  name: string;
  breed: string;
  date: string;
  size?: "medium" | "large";
}

function PetCard({
  petId,
  name,
  breed,
  date,
  size = "large",
  ...props
}: PetCardProps) {
  // 클릭 시 petProfile 페이지로 이동
  const petProfileHandler = () => {
    router.push({
      pathname: "/petProfile",
      params: { petId: petId.toString() },
    });
  };

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      {...props}
      onPress={petProfileHandler}
    >
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.imgContainer}>
            {/* 프론트에서 적용되는 척만 */}
            <Image source={require("../../assets/images/dog_profile.png")} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.breedText}>{breed}</Text>
            <Text style={styles.breedDate}>등록일: {date}</Text>
          </View>
        </View>
        <Text style={styles.arrow}>➔</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 22,
    marginVertical: 4,
    paddingHorizontal: 8,
    borderColor: colors.GRAY3,
    borderWidth: 1,
    height: 110,
  },
  infoContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  imgContainer: {
    paddingHorizontal: 16,
  },
  textContainer: {
    paddingHorizontal: 8,
    gap: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  breedText: {
    fontSize: 12,
    color: colors.GRAY8,
  },
  breedDate: {
    fontSize: 12,
    color: colors.GRAY2,
  },
  arrow: {
    fontSize: 14,
    color: colors.GRAY3,
    paddingHorizontal: 18,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default PetCard;
