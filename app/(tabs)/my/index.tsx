import Header from "@/components/myPage/Header";
import PetInfor from "@/components/myPage/PetInfor";
import SettingContainer from "@/components/myPage/SettingContainer";
import UserInfo from "@/components/myPage/UserInfo";
import { colors } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  const baseUrl = process.env.EXPO_PUBLIC_BACKEND_API_URL;

  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");

        if (!token) {
          console.log("토큰 없음");
          return;
        }

        const response = await axios.get(`${baseUrl}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = response.data.data;

        setUsername(data.username);
        setNickname(data.nickname);
      } catch (error: any) {
        console.log(
          "내 정보 조회 실패:",
          error.response?.data || error.message
        );
      }
    };

    fetchMyInfo();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <Header label="마이페이지" />
      <ScrollView>
        <UserInfo name={username} nickname={nickname} />
        <View style={styles.grayStick} />
        <PetInfor />
        <View style={styles.grayStick} />
        <SettingContainer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 15,
  },
  grayStick: {
    width: "100%",
    height: 8,
    backgroundColor: colors.GRAY6,
  },
});
