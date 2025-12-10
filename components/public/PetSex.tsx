import { colors } from "@/constants";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

interface PetSexProps {
  label?: string;
  size?: "medium" | "large";
  variant?: "filled";
  value: string;
  onChange: (value: string) => void;
  style?: any;
}

const PetSex = ({
  // label,
  size = "large",
  variant = "filled",
  style,
  value,
  onChange,
}: PetSexProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.wrapper,
        { borderBottomColor: isFocused ? colors.MainColor : colors.GRAY3 },
        styles[size],
        styles[variant],
      ]}
    >
      <Picker
        selectedValue={value}
        onValueChange={(itemValue: string) => onChange(itemValue)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, style]}
      >
        {/* <Picker.Item label={label ?? "성별"} value="" /> */}
        <Picker.Item label="수컷" value="male" />
        <Picker.Item label="암컷" value="female" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    paddingHorizontal: 6,
    width: "100%",
    marginVertical: 20,
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
  },
  input: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PetSex;
