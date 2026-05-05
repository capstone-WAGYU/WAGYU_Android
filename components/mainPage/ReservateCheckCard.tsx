import { colors } from "@/constants";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";

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
  variant = "filled",
  onPress,
  ...props
}: ReservateCheckCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && onPress && styles.pressed]}
      onPress={onPress}
      {...props}
    >
      <View style={styles.reservateAnnounceContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
      {onPress && <Text style={styles.arrow}>➔</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: colors.GRAY4,
    flexDirection: "row",
    minHeight: 90,
    padding: 20,
    marginVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  reservateAnnounceContainer: {
    gap: 4,
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontWeight: "700",
    fontSize: 15,
    color: colors.Black,
  },
  time: {
    fontWeight: "500",
    fontSize: 13,
    color: colors.GRAY1,
  },
  location: {
    color: colors.GRAY2,
    fontSize: 12,
    fontWeight: "500",
  },
  arrow: {
    fontSize: 14,
    color: colors.GRAY3,
    paddingLeft: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default ReservateCheckCard;
