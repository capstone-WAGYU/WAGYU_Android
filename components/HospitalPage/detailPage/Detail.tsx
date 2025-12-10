import { colors } from "@/constants";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ServiceInfo from "./ServiceInfo";

export default function Detail() {
  const hospitalInfo = {
    name: "최인규",
    title: "24시에피소드동물메디컬센터",
    road: "대구 동구 동대구로 425 B1 ~ 2층",
    time: "오전 10:00 ~ 오후 06:00",
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.detailInfoContainer}>
        <Text>병원장</Text>
        <Text style={styles.content}>{hospitalInfo.name}</Text>
      </View>
      <View style={styles.detailInfoContainer}>
        <Text>병원명</Text>
        <Text style={styles.content}>{hospitalInfo.title}</Text>
      </View>
      <View style={styles.detailInfoContainer}>
        <Text>오시는 길</Text>
        <Text style={styles.content}>{hospitalInfo.road}</Text>
      </View>
      <View style={styles.detailInfoContainer}>
        <Text>진료시간</Text>
        <Text style={styles.content}>{hospitalInfo.title}</Text>
      </View>
      <View style={styles.grayStick} />
      <View style={styles.detailInfoContainer}>
        <Text>편의시설 및 서비스</Text>
      </View>
      <View style={styles.serviceContainer}>
        <ServiceInfo
          label="주차"
          image={require("../../../assets/images/parking.png")}
        />
        <ServiceInfo
          label="무선 인터넷"
          image={require("../../../assets/images/free_wifi.png")}
        />
        <ServiceInfo
          label="간편결제"
          image={require("../../../assets/images/easy_payment.png")}
        />
        <ServiceInfo
          label="대기공간"
          image={require("../../../assets/images/rest_place.png")}
        />
        <ServiceInfo
          label="화장실"
          image={require("../../../assets/images/bathroom.png")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    marginHorizontal: 20,
    marginVertical: -22, // expo 억지 ui
    flex: 1,
  },
  grayStick: {
    height: 2,
    marginVertical: 12,

    backgroundColor: colors.GRAY6,
  },
  detailInfoContainer: {
    marginVertical: 10,
    gap: 8,
    flex: 1,
  },
  content: {
    color: colors.GRAY0,
  },
  serviceContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // ← 가로 공간 부족하면 자동 줄바꿈
    gap: 18, // 아이템 간 간격
    paddingHorizontal: 10,
  },
});
