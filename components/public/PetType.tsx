import { colors } from "@/constants";
import { breedList } from "@/constants/breedDiseaseMap";
import Feather from "@expo/vector-icons/Feather";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const PetTypeModal = ({ value, onChange }: Props) => {
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [tempValue, setTempValue] = useState(value || "");

  const filteredList = useMemo(() => {
    return breedList.filter((breed) => breed.includes(keyword));
  }, [keyword]);

  const handleConfirm = () => {
    onChange(tempValue);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setVisible(true)}
      >
        <Text style={value ? styles.text : styles.placeholder}>
          {value || "반려견종 입력"}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Image
                source={require("../../assets/images/findPetType.png")}
                style={styles.icon}
              />
              <Text style={styles.title}>반려견종 입력</Text>
            </View>

            <TextInput
              placeholder="검색"
              value={keyword}
              onChangeText={setKeyword}
              style={styles.search}
            />

            <FlatList
              data={filteredList}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => setTempValue(item)}
                >
                  <Text style={styles.itemText}>{item}</Text>
                  {tempValue === item && (
                    <Feather name="check" size={20} color="black" />
                  )}
                </TouchableOpacity>
              )}
            />

            <View style={styles.footer}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.cancel}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm}>
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
  selectBox: {
    height: 38,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY3,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  placeholder: {
    color: colors.GRAY2,
    fontWeight: "bold",
  },
  text: {},
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    maxHeight: "70%",
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  icon: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    gap: 10,
    paddingVertical: 5,
    alignItems: "center",
  },
  search: {
    borderWidth: 1,
    borderColor: colors.GRAY3,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY4,
  },
  itemText: {
    fontSize: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 20,
    paddingBottom: 10,
    gap: 20,
  },
  cancel: {
    color: colors.GRAY1,
  },
  confirm: {
    color: colors.MainColor,
    fontWeight: "bold",
  },
});

export default PetTypeModal;
