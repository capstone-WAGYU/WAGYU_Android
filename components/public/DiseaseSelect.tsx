import { colors } from "@/constants";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

interface DiseaseSelectProps {
  label?: string;
  size?: "medium" | "large";
  variant?: "filled";
  value: string;
  options: string[];
  onChange: (value: string) => void;
  style?: any;
}

const DiseaseSelect = ({
  size = "large",
  variant = "filled",
  style,
  value,
  onChange,
  options,
}: DiseaseSelectProps) => {
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
        {/* 기본값 */}
        <Picker.Item label="없음" value="" />

        {options.map((item, idx) => (
          <Picker.Item key={idx} label={item} value={item} />
        ))}
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

export default DiseaseSelect;
