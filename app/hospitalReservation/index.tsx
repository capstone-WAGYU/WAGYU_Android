import NextButton from "@/components/authPage/NextButton";
import Detail from "@/components/HospitalPage/detailPage/Detail";
import Header from "@/components/HospitalPage/Header";
import KakaoMap from "@/components/HospitalPage/KakaoMap";
import Reservation from "@/components/HospitalPage/reservationPage/Reservation";
import Review from "@/components/HospitalPage/reviewPage/Review";
import SelectButton from "@/components/HospitalPage/SelectButton";
import { colors } from "@/constants";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HospitalReservation() {
  const [selected, setSelected] = useState<"reservation" | "detail" | "review">(
    "reservation"
  );

  const reservationDetail = () => {
    router.push("/reservationDetail");
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header label={"동대구 의료센터"} />
      <KakaoMap />

      <SelectButton
        onPressReservation={() => setSelected("reservation")}
        onPressDetail={() => setSelected("detail")}
        onPressReview={() => setSelected("review")}
      />
      <View style={styles.grayStick} />
      <ScrollView>
        {selected === "reservation" && (
          <View>
            <Reservation />
            <View style={styles.nextButtonContainer}>
              <NextButton
                label={"다음 단계로 넘어가기"}
                onPress={reservationDetail}
              />
            </View>
          </View>
        )}
        {selected === "detail" && <Detail />}
        {selected === "review" && <Review />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 5,
    paddingVertical: 15,
  },
  nextButtonContainer: {
    paddingHorizontal: 15,
  },
  grayStick: {
    // marginHorizontal: 15,
    marginTop: 18,
    marginHorizontal: 15,
    height: 2,
    backgroundColor: colors.GRAY6,
  },
});
