import { colors } from "@/constants";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface SelectButtonProps {
  onPressReservation: () => void;
  onPressDetail: () => void;
  onPressReview: () => void;
}

function SelectButton({
  onPressReservation,
  onPressDetail,
  onPressReview,
}: SelectButtonProps) {
  const [selected, setSelected] = useState<"reservation" | "detail" | "review">(
    "reservation"
  );

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setSelected("reservation");
          onPressReservation();
        }}
        style={[styles.tab, selected === "reservation" && styles.selectedTab]}
      >
        <Text
          style={[
            styles.text,
            selected === "reservation" && styles.selectedText,
          ]}
        >
          예약하기
        </Text>
      </Pressable>

      {/* 상세정보 */}
      <Pressable
        onPress={() => {
          setSelected("detail");
          onPressDetail();
        }}
        style={[styles.tab, selected === "detail" && styles.selectedTab]}
      >
        <Text
          style={[styles.text, selected === "detail" && styles.selectedText]}
        >
          상세정보
        </Text>
      </Pressable>

      {/* 리뷰 */}
      <Pressable
        onPress={() => {
          setSelected("review");
          onPressReview();
        }}
        style={[styles.tab, selected === "review" && styles.selectedTab]}
      >
        <Text
          style={[styles.text, selected === "review" && styles.selectedText]}
        >
          리뷰보기
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.GRAY4,
    flexDirection: "row",
    marginHorizontal: 25,
    borderRadius: 12,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },

  selectedTab: {
    backgroundColor: "#4D4D4D",
  },

  text: {
    color: "#666",
    fontSize: 15,
  },

  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default SelectButton;
