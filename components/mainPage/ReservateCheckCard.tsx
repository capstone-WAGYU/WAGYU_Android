import { colors } from "@/constants";
import React from "react";
import { Image, PressableProps, StyleSheet, Text, View } from "react-native";

interface ReservateCheckCardProps extends PressableProps {
  label: string;
  time: string;
  location: string;
  size?: "medium" | "large";
  variant?: "filled";
}

function ReservateCheckCard({
  label,
  time,
  location,
  size = "large",
  variant = "filled", // 기본 값 지정
  ...props // 상속 받은 pressable의 이벤트, 스타일 등 추가 props 전달 가능
}: ReservateCheckCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.acheImgContainer}>
        <View style={styles.acheImg}>
          <Image
            source={require("../../assets/images/teethImg.png")}
            style={{ width: 40, height: 40, marginRight: 4 }}
          />
        </View>
        <Text style={styles.text}>{label}</Text>
      </View>
      <View style={styles.reservateAnnounceContainer}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: colors.GRAY4,
    flexDirection: "row",
    height: "15%",
    padding: 20,
    marginVertical: 5,

    justifyContent: "space-between",
  },
  acheImgContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    // flex: 2,
  },
  acheImg: {
    // backgroundColor: colors.GRAY2,
    width: 40,
    height: 40,
    flexDirection: "column",
    borderRadius: 100,
  },
  reservateAnnounceContainer: {
    // flex: 4,
    gap: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
  location: {
    color: colors.GRAY2,
    fontWeight: "500",
  },
  time: {
    fontWeight: "600",
    fontSize: 16,
  },
  text: {
    color: colors.GRAY1,
  },
});

export default ReservateCheckCard;
