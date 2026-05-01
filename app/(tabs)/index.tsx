import AddAnnounceButton from "@/components/mainPage/AddAnnounceButton";
import ReservateCheckCard from "@/components/mainPage/ReservateCheckCard";
import SmallCustomButton from "@/components/mainPage/SmallCustomButton";
import { colors } from "@/constants";
import { useReservationStore } from "@/store/reservationStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatReservationTime = (date: string, time: string) => {
  if (!date) return "날짜 미정";
  const d = new Date(date + "T00:00:00");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const day = days[d.getDay()];
  const formatted = date.replace(/-/g, ".");
  return time
    ? `${formatted} (${day}) ${time} 예약예정`
    : `${formatted} (${day}) 예약예정`;
};

export default function HomeScreen() {
  const { reservations } = useReservationStore();
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? reservations : reservations.slice(0, 1);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");

      if (!token) {
        router.replace("/auth");
      }
    };

    checkToken();
  }, []);
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.headerContainer}>
        <Image source={require("../../assets/images/DOGTOR.png")} />
      </View>
      <View style={styles.announceContainer}>
        <View style={styles.announceTexts}>
          <Text style={styles.announceText}>동물을 키우신다면?</Text>
          <Text style={styles.announceText}>
            잊지 말고 이 앱 하나로 챙겨보세요
          </Text>
        </View>
        <Image source={require("../../assets/images/syringeImg.png")}></Image>
      </View>

      <LinearGradient
        style={styles.adviceContainer}
        colors={["#0043B3", "#0043B3", "#79A6D2"]}
        start={{ x: 0, y: 0.5 }} // 왼쪽 중앙
        end={{ x: 1, y: 0.5 }} // 오른쪽 중앙
      >
        <View style={styles.adviceChildContainer}>
          <Text style={styles.adviceText}>이제는 동물병원도 알아보자!</Text>
          <View>
            <SmallCustomButton
              label="상담 하러가기"
              onPress={() => router.push("/(tabs)/advice")}
            />
          </View>
        </View>
        <View style={styles.findImageContainer}>
          <Image source={require("../../assets/images/findImg.png")}></Image>
        </View>
      </LinearGradient>

      <LinearGradient
        style={styles.reservateContainer}
        colors={["#79A6D2", "#B8D6EB", "#cbe0eeff"]}
      >
        <View style={styles.pinImageContainer}>
          <Image source={require("../../assets/images/pinImg.png")}></Image>
        </View>
        <View style={styles.reservateChildContainer}>
          <Text style={styles.reservateText}>내 위치에 가까운 동물병원은?</Text>
          <View style={styles.reservateButtonContainer}>
            <SmallCustomButton
              label="예약 하러가기"
              onPress={() => router.push("/(tabs)/reservation")}
            />
          </View>
        </View>
      </LinearGradient>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {reservations.length === 0 ? (
          <ReservateCheckCard
            label="예약 내역 없음"
            time="아직 예약된 내역이 없습니다"
            location="예약 탭으로 이동하여 예약해 보세요!"
          />
        ) : (
          displayed.map((r) => (
            <ReservateCheckCard
              key={r.id}
              label={r.visitReason}
              time={formatReservationTime(r.date, r.time)}
              location={`장소: ${r.hospitalName}`}
            />
          ))
        )}
        {reservations.length > 1 && (
          <AddAnnounceButton
            label={showAll ? "접기" : "예약 더보기"}
            onPress={() => setShowAll((prev) => !prev)}
          />
        )}
      </ScrollView>
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
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  announceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 25,
  },
  announceTexts: {
    flexDirection: "column",
    justifyContent: "center",
  },
  announceText: {
    lineHeight: 22,
    fontSize: 15,
    fontWeight: "600",
  },
  adviceText: {
    fontWeight: "bold",
    color: colors.WHITE,
  },
  adviceChildContainer: {
    justifyContent: "space-around",
  },
  adviceContainer: {
    marginVertical: 5,
    borderRadius: 5,
    padding: 20,
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  findImageContainer: {
    justifyContent: "center",
  },

  reservateText: {
    fontWeight: "bold",
    color: colors.WHITE,
  },
  reservateChildContainer: {
    justifyContent: "space-around",
  },
  reservateContainer: {
    marginVertical: 5,
    borderRadius: 5,
    padding: 20,
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reservateButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  pinImageContainer: {
    justifyContent: "center",
  },
});
