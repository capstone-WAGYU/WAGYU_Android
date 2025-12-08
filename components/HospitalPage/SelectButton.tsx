import { colors } from "@/constants";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
interface SelectButtonProps extends PressableProps {
  variant?: "filled";
}

function SelectButton({ variant = "filled", ...props }: SelectButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [pressed && styles.pressed]}
        {...props}
      >
        <Text>예약하기</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [pressed && styles.pressed]}
        {...props}
      >
        <Text>상세정보</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [pressed && styles.pressed]}
        {...props}
      >
        <Text>리뷰보기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.GRAY4,
    justifyContent: "space-around",
    flexDirection: "row",
    paddingVertical: 16,
    marginHorizontal: 25,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.3,
  },
});

export default SelectButton;
