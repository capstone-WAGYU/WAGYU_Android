import { colors } from "@/constants";
import { breedList } from "@/constants/breedDiseaseMap";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

interface PetTypeProps {
  label?: string;
  size?: "medium" | "large";
  variant?: "filled";
  value: string;
  onChange: (value: string) => void;
  style?: any;
}

const PetType = ({
  size = "large",
  variant = "filled",
  style,
  value,
  onChange,
}: PetTypeProps) => {
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
        <Picker.Item label="품종 선택" value="" />
        {breedList.map((breed) => (
          <Picker.Item key={breed} label={breed} value={breed} />
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

export default PetType;
