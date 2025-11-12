import { colors } from "@/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
  name: string;
  breed: string;
  date: string;
  size?: "medium" | "large";
}

function PetCard({
  name,
  breed,
  date,
  size = "large",
  ...props
}: PetCardProps) {
  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed} {...props}>
      <View style={styles.container}>
        <View style={styles.InforContainer}>
          <View style={styles.imgContainer}>
            <Image source={require("../../assets/images/dog_profile.png")} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.breedText}>{breed}</Text>
            <Text style={styles.breedDate}>등록일: {date}</Text>
          </View>
        </View>
        <MaterialIcons
          name="arrow-forward-ios"
          size={14}
          color={colors.GRAY3}
          style={styles.icon}
        />
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
    paddingHorizontal: 8,
    borderColor: colors.GRAY3,
    borderWidth: 1,
    height: 110,
  },
  InforContainer: {
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
  icon: {
    paddingHorizontal: 18,
  },

  pressed: {
    opacity: 0.8,
  },
});

export default PetCard;
