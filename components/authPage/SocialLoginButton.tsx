import { colors } from "@/constants";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface SocialLoginButtonProps extends PressableProps {
  label: string;
  logo: ImageSourcePropType;
  backgroundColor: string;
  textColor?: string;
  size?: "medium" | "large";
}

function SocialLoginButton({
  label,
  logo,
  backgroundColor,
  textColor,
  size = "large",
  ...props
}: SocialLoginButtonProps) {
  const finalTextColor =
    textColor ??
    (backgroundColor === colors.WHITE ? colors.WHITE : colors.WHITE);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        {
          backgroundColor,
          borderWidth: backgroundColor === colors.WHITE ? 1 : 0,
          borderColor:
            backgroundColor === colors.WHITE ? colors.GRAY2 : "transparent",
        },
        pressed && styles.pressed,
      ]}
      {...props}
    >
      <View style={styles.logoContainer}>
        <Image source={logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: finalTextColor }]}>{label}</Text>
      </View>
      <View style={styles.voidContainer}></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  logoContainer: {
    flex: 1,
  },
  voidContainer: {
    flex: 1,
    alignItems: "center",
  },
  textContainer: {
    flex: 2,
    alignItems: "center",
  },
  large: {
    width: "100%",
    height: 50,
  },
  medium: {
    height: 40,
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default SocialLoginButton;
