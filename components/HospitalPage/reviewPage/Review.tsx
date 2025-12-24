import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ServiceInfo from "./ReviewCard";

export default function Review() {
  return (
    <SafeAreaView style={styles.background}>
      <ServiceInfo
        title={"황성재"}
        content={"정말 친절하고 진료도 잘하셔요"}
        star={"5.0"}
        userInfo={"9.3.수 / 예약자"}
      />
      <ServiceInfo
        title={"최인규"}
        content={"강아지를 잘 보살펴 줘서 고마워요!!"}
        star={"5.0"}
        userInfo={"9.3.수 / 예약자"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginVertical: -22, // expo 억지 ui
    marginHorizontal: 20,
  },
});
