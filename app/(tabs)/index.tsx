import AddAnnounceButton from "@/components/AddAnnounceButton";
import ReservateCheckCard from "@/components/ReservateCheckCard";
import SmallCustomButton from "@/components/SmallCustomButton";
import { colors } from "@/constants";
import { useAuth } from "@/context/useAuth";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/auth");
  };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.headerContainer}>
        <Image source={require("../../assets/images/DOGTOR.png")} />
        <Feather
          name="log-out"
          size={22}
          color="black"
          onPress={handleLogout}
        />
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
              onPress={() => router.push("/(tabs)/reservate")}
            />
          </View>
        </View>
      </LinearGradient>
      <ReservateCheckCard
        label={"피부염"}
        time={"2025.09.25 (목) 14:00 예약예정"}
        location={"장소: 동대구 동물병원"}
      />
      <AddAnnounceButton label={"예약 더보기"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
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
    fontWeight: "bold",
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
