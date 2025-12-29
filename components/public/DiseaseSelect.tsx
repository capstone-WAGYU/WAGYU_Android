import { Disease } from "@/api/petApi";
import { colors } from "@/constants";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DiseaseSelectProps {
  label?: string;
  size?: "medium" | "large";
  variant?: "filled";
  value: number[];
  options: Disease[];
  onChange: (value: number[]) => void;
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
  const [visible, setVisible] = useState(false);
  const [tempValue, setTempValue] = useState<number[]>(value);

  const toggleItem = (diseaseId: number) => {
    setTempValue((prev) =>
      prev.includes(diseaseId)
        ? prev.filter((v) => v !== diseaseId)
        : [...prev, diseaseId]
    );
  };

  const getDisplayText = () => {
    if (value.length === 0) return "유전병 선택";
    const selectedNames = options
      .filter((d) => value.includes(d.id))
      .map((d) => d.name);
    return selectedNames.join(", ");
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setTempValue(value);
          setVisible(true);
          setIsFocused(true);
        }}
        style={[
          styles.wrapper,
          { borderBottomColor: isFocused ? colors.MainColor : colors.GRAY3 },
          styles[size],
          styles[variant],
        ]}
      >
        <Text style={styles.input}>{getDisplayText()}</Text>
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>유전병 선택</Text>
            </View>

            {options.length === 0 ? (
              <View style={styles.item}>
                <Text style={styles.nullInfo}>* 유전병이 존재하지 않음</Text>
              </View>
            ) : (
              <FlatList
                data={options}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  const checked = tempValue.includes(item.id);

                  return (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => toggleItem(item.id)}
                    >
                      <Text>{item.name}</Text>
                      <Checkbox
                        value={checked}
                        onValueChange={() => toggleItem(item.id)}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            )}

            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => {
                  onChange(tempValue);
                  setVisible(false);
                  setIsFocused(false);
                }}
              >
                <Text style={styles.confirm}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    paddingHorizontal: 6,
    width: "100%",
    marginVertical: 20,
    borderBottomWidth: 1,
  },
  large: { height: 38 },
  medium: { height: 32 },
  filled: { backgroundColor: colors.WHITE },

  input: {
    fontSize: 14,
    color: colors.Black,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "70%",
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    padding: 20,
  },
  nullInfo: {
    color: "red",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  titleContainer: {
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginTop: 16,
  },

  confirm: { color: colors.MainColor, fontWeight: "bold" },
});

export default DiseaseSelect;
