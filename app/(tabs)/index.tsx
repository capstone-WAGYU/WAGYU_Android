import SmallCustomButton from "@/components/SmallCustomButton";
import { colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.iconContainer}>
        <Ionicons name="enter-outline" size={36} color="black" />
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
        <Image source={require("../../assets/images/findImg.png")}></Image>
      </LinearGradient>

      <LinearGradient
        style={styles.reservateContainer}
        colors={["#79A6D2", "#B8D6EB", "#cbe0eeff"]}
      >
        <Image source={require("../../assets/images/pinImg.png")}></Image>
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
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
    marginVertical: 10,
    borderRadius: 5,
    padding: 20,
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  reservateText: {
    fontWeight: "bold",
    color: colors.WHITE,
  },
  reservateChildContainer: {
    justifyContent: "space-around",
  },
  reservateContainer: {
    marginVertical: 10,
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
});
