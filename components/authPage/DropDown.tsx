import { colors } from "@/constants";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, TextInputProps, View } from "react-native";

interface DropDownProps extends TextInputProps {
  label?: string;
  size?: "medium" | "large";
  variant?: "filled";
}

const DropDown = ({
  label,
  size = "large",
  variant = "filled",
  style,
  ...props
}: DropDownProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [gender, setGender] = useState("");

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
        selectedValue={gender}
        onValueChange={(itemValue: React.SetStateAction<string>) =>
          setGender(itemValue)
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={label}
        placeholderTextColor={colors.GRAY2}
        style={[styles.input, style]}
        {...props}
      >
        <Picker.Item label="남성" value="male" />
        <Picker.Item label="여성" value="female" />
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

export default DropDown;
