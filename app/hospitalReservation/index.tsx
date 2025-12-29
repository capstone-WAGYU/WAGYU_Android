import Header from "@/components/HospitalPage/Header";
import KakaoMap from "@/components/HospitalPage/KakaoMap";
import SelectButton from "@/components/HospitalPage/SelectButton";
import Detail from "@/components/HospitalPage/detailPage/Detail";
import Reservation from "@/components/HospitalPage/reservationPage/Reservation";
import Review from "@/components/HospitalPage/reviewPage/Review";
import NextButton from "@/components/authPage/NextButton";
import { colors } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HospitalReservation() {
  const baseUrl = process.env.EXPO_PUBLIC_BACKEND_API_URL!;
  const [hospital, setHospital] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<
    "reservation" | "detail" | "review"
  >("reservation");

  const [isClosed, setIsClosed] = useState(false);

  const params = useLocalSearchParams();
  const hospitalId = params.id ? Number(params.id) : null;

  useEffect(() => {
    if (!hospitalId) {
      setLoading(false);
      return;
    }

    const fetchHospital = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          router.push("/auth");
          return;
        }

        const res = await axios.get(`${baseUrl}/hospital/${hospitalId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setHospital(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [hospitalId]);

  const goReservationDetail = () => {
    if (isClosed) return;
    router.push("/reservationDetail");
  };

  if (loading)
    return (
      <SafeAreaView style={styles.background}>
        <Header label="로딩 중..." />
      </SafeAreaView>
    );

  if (!hospital)
    return (
      <SafeAreaView style={styles.background}>
        <Header label="병원 정보를 불러올 수 없습니다" />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.background}>
      <Header label={hospital.name} />
      <KakaoMap address={hospital.address} hospitalName={hospital.name} />

      <SelectButton
        onPressReservation={() => setSelectedTab("reservation")}
        onPressDetail={() => setSelectedTab("detail")}
        onPressReview={() => setSelectedTab("review")}
      />

      <View style={styles.grayStick} />

      <ScrollView>
        {selectedTab === "reservation" && (
          <View>
            <Reservation
              hospitalId={hospitalId!}
              baseUrl={baseUrl}
              onClosedChange={setIsClosed}
            />

            <View style={styles.nextButtonContainer}>
              <NextButton
                label={
                  isClosed
                    ? "휴무일에는 예약할 수 없습니다"
                    : "다음 단계로 넘어가기"
                }
                disabled={isClosed}
                onPress={goReservationDetail}
              />
            </View>
          </View>
        )}

        {selectedTab === "detail" && (
          <Detail hospitalId={hospitalId!} baseUrl={baseUrl} />
        )}

        {selectedTab === "review" && <Review />}
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
    marginTop: 18,
    marginHorizontal: 15,
    height: 2,
    backgroundColor: colors.GRAY6,
  },
});
