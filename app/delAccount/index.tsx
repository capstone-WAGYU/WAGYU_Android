import { petApi } from "@/api/petApi";
import AgreeButton from "@/components/myPage/settingPages/DelAccount/AgreeButton";
import AgreeCheck from "@/components/myPage/settingPages/DelAccount/AgreeCheck";
import CancelButton from "@/components/myPage/settingPages/DelAccount/CancelButton";
import GoodByeGuide from "@/components/myPage/settingPages/DelAccount/GoodByeGuide";
import Header from "@/components/public/Header";
import { useAuth } from "@/context/useAuth";
import { router } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DelAccount() {
  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      await petApi.deleteMe();

      logout();

      Alert.alert("탈퇴 완료", "그동안 이용해주셔서 감사합니다.");
      router.replace("/auth");
    } catch (error) {
      Alert.alert("오류", "회원 탈퇴에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header label={"회원탈퇴"} />
      <GoodByeGuide />

      <View style={styles.goBottom}>
        <AgreeCheck
          label={"안내사항을 확인했으며 이에 탈퇴하는 것에 동의하십니까?"}
        />

        <View style={styles.buttonContainer}>
          <CancelButton label={"취소"} />
          <AgreeButton label={"탈퇴하기"} onPress={handleDeleteAccount} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: "2%",
  },
  goBottom: {
    marginTop: "auto",
  },
});
