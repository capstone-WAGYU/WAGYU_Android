import Header from "@/components/myPage/Header";
import PetInfor from "@/components/myPage/PetInfor";
import SettingContainer from "@/components/myPage/SettingContainer";
import UserEmail from "@/components/myPage/UserEmail";
import { colors } from "@/constants";
import { ScrollView, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function MyScreen() {
  return (
    <SafeAreaView style={styles.background}>
      <Header label={"마이페이지"} />
      <ScrollView>
        <UserEmail name={"황성재"} email={"test@email.com"} />
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
