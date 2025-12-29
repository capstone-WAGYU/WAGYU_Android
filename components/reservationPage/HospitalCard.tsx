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
  closed: boolean;
  openTime?: string;
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
