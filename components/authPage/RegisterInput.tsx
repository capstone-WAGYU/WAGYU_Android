import { colors } from "@/constants";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface LoginInputProps extends TextInputProps {
  header?: string;
  label?: string;
  size?: "medium" | "large";
  variant?: "filled";
}

const LoginInput = ({
  header,
  label,
  size = "large",
  variant = "filled",
  style,
  ...props
}: LoginInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Text style={styles.header}>{header}</Text>

      <View
        style={[
          styles.wrapper,
          { borderBottomColor: isFocused ? colors.MainColor : colors.GRAY3 },
          styles[size],
          styles[variant],
        ]}
      >
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={label}
          placeholderTextColor={colors.GRAY2}
          style={[styles.input, style]}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    paddingHorizontal: 6,
    width: "100%",
    marginVertical: 3,
  },
  large: {
    height: 38,
  },
  medium: {
    height: 32,
  },
  filled: {
    backgroundColor: colors.WHITE,
    borderBottomWidth: 1,
    // height: 60,
  },
  input: {
    fontSize: 14,
    fontWeight: "bold",
  },
  header: {
    color: colors.GRAY2,
    fontSize: 12,
  },
});

export default LoginInput;
