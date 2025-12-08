import Header from "@/components/HospitalPage/Header";
import KakaoMap from "@/components/HospitalPage/KakaoMap";
import SelectButton from "@/components/HospitalPage/SelectButton";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HospitalReservation() {
  return (
    <SafeAreaView style={styles.background}>
      <Header label={"동대구 의료센터"} />
      <KakaoMap />
      <SelectButton />
      {/* <View style={styles.infoTextContainer}>
        <Text style={styles.infoText}>
          ※ 예약 신청 후 업체에 예약 승인을 기다리셔야 합니다
        </Text>
        <Text style={styles.infoText}>( 평균 10분 이내 )</Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 5,
    // paddingHorizontal: 15,
    paddingVertical: 15,
  },
  // infoText: {
  //   fontSize: 12,
  // },
  // infoTextContainer: {
  //   paddingVertical: 15,
  //   paddingHorizontal: 25,
  // },
});
