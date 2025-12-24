import { colors } from "@/constants";
import React from "react";
import {
  Image,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface HospitalCardProps extends PressableProps {
  title: string;
  location: string;
  closed: boolean; // 백엔드 closed 값
  openTime?: string; // 선택적으로 시간 표시 가능
  closeTime?: string;
  variant?: "filled";
}

function HospitalCard({
  title,
  location,
  closed,
  openTime,
  closeTime,
  variant = "filled",
  ...props
}: HospitalCardProps) {
  // closed 상태에 따라 진료중 / 휴업중 표시
  const displayStatus = closed ? "휴업중" : "진료중";

  return (
    <Pressable
      style={({ pressed }) => [styles[variant], pressed && styles.pressed]}
      {...props}
    >
      <View style={styles.childContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.TLContainer}>
            <Text
              style={styles.titleText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text
              style={styles.locationText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {location}
            </Text>
          </View>

          <View
            style={[
              styles.openContainer,
              { backgroundColor: closed ? colors.GRAY3 : colors.MainColor },
            ]}
          >
            <Text style={styles.openText}>{displayStatus}</Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Image source={require("../../assets/images/hospital_Img.png")} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  childContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomColor: colors.GRAY6,
    borderBottomWidth: 1,
  },
  medium: {},
  filled: {},
  leftContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  TLContainer: {
    gap: 10,
  },
  rightContainer: {
    height: 75,
    width: 75,
    paddingHorizontal: 10,
  },
  titleText: {
    color: colors.Black,
    fontWeight: "bold",
    flexShrink: 1,
  },
  locationText: {
    color: colors.GRAY2,
    flexShrink: 1,
  },
  openText: {
    color: colors.WHITE,
    fontSize: 10,
  },
  openContainer: {
    width: 60,
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 2,
    marginTop: 12,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default HospitalCard;
