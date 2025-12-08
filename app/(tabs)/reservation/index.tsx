import Header from "@/components/reservationPage/Header";
import HospitalCard from "@/components/reservationPage/HospitalCard";
import SearchBar from "@/components/reservationPage/SearchBar";
import { router } from "expo-router";

import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReservateScreen() {
  const handleRouter = () => {
    router.push("/hospitalReservation");
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header label="병원예약" />
      <SearchBar label={"찾고 계시는 병원명을 입력해주세요"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HospitalCard
          title={"마음을 읽어주는 마음동물병원"}
          location={"대구광역시 수성구 화랑로 16"}
          open={"진료중"}
          onPress={handleRouter}
        />
        <HospitalCard
          title={"마음을 읽어주는 마음동물병원"}
          location={"대구광역시 수성구 화랑로 16"}
          open={"진료중"}
          onPress={handleRouter}
        />
        <HospitalCard
          title={"마음을 읽어주는 마음동물병원"}
          location={"대구광역시 수성구 화랑로 16"}
          open={"진료중"}
          onPress={handleRouter}
        />
        <HospitalCard
          title={"마음을 읽어주는 마음동물병원"}
          location={"대구광역시 수성구 화랑로 16"}
          open={"진료중"}
          onPress={handleRouter}
        />
        <HospitalCard
          title={"마음을 읽어주는 마음동물병원"}
          location={"대구광역시 수성구 화랑로 16"}
          open={"진료중"}
          onPress={handleRouter}
        />
        <HospitalCard
          title={"마음을 읽어주는 마음동물병원"}
          location={"대구광역시 수성구 화랑로 16"}
          open={"진료중"}
          onPress={handleRouter}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 36,
  },
  searchCard: {},
  searchIcon: {
    color: "#CCCCCC",
    fontSize: 20,
    paddingHorizontal: 2,
  },

  iconAndText: {
    flexDirection: "row",
  },

  hospitalCardContainer: {},
});
