import { useAuth } from "@/context/useAuth";
import { router } from "expo-router";

import React from "react";
import { PressableProps, StyleSheet, Text, View } from "react-native";
import Setting from "./Setting";

interface SettingContainerProps extends PressableProps {
  size?: "medium" | "large";
}

function SettingContainer({ size = "large", ...props }: SettingContainerProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/auth");
  };
  const handleDelAccount = () => {
    router.push("/delAccount");
  };

  const handleAddress = () => {
    router.push("/address");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>설정</Text>
      </View>

      {/* <Setting onPress={handleAddress} label={"주소관리"} /> */}
      <Setting onPress={handleDelAccount} label={"탈퇴하기"} />
      <Setting onPress={handleLogout} label={"로그아웃"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 35,
  },
  title: {
    fontWeight: "bold",
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default SettingContainer;
