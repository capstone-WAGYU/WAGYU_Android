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

interface PetCardAddProps extends PressableProps {
  size?: "medium" | "large";
}

function PetCardAdd({ size = "large", ...props }: PetCardAddProps) {
  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed} {...props}>
      <View style={styles.container}>
        <View style={styles.InforContainer}>
          <View style={styles.imgContainer}>
            <Image source={require("../../assets/images/pet_add.png")} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>반려동물 추가하기</Text>
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
    marginVertical: 12,
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
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.GRAY0,
  },
  icon: {
    paddingHorizontal: 18,
  },

  pressed: {
    opacity: 0.8,
  },
});

export default PetCardAdd;
