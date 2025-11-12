import { colors } from "@/constants";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface SmallCustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

function SmallCustomButton({
  label,
  size = "large",
  variant = "filled", // 기본 값 지정
  ...props // 상속 받은 pressable의 이벤트, 스타일 등 추가 props 전달 가능
}: SmallCustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        // pressed 상태(누르고 있는 상태일때) 감지
        styles.container, // 공통 스타일
        styles[size], // 크기 스타일
        styles[variant], // filled 등 변형 스타일
        pressed && styles.pressed, // 눌린 상태에서 스타일 적용
      ]}
      {...props}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    width: 100,
    height: 38,
  },
  medium: {},
  filled: {
    backgroundColor: colors.WHITE,
    fontSize: 14,
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: colors.MainColor,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.8,
  },
});

export default SmallCustomButton;
