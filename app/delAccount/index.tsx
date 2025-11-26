import AgreeButton from "@/components/myPage/settingPages/DelAccount/AgreeButton";
import AgreeCheck from "@/components/myPage/settingPages/DelAccount/AgreeCheck";
import CancelButton from "@/components/myPage/settingPages/DelAccount/CancelButton";
import GoodByeGuide from "@/components/myPage/settingPages/DelAccount/GoodByeGuide";
import Header from "@/components/public/Header";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DelAccount() {
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
          <AgreeButton label={"탈퇴하기"} />
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
