import { colors } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ServiceInfo from "./ServiceInfo";

interface DetailProps {
  hospitalId: number;
  baseUrl: string;
}

interface HospitalDetail {
  name: string;
  address: string;
  openTime: string;
  closeTime: string;
  services?: string[];
}

export default function Detail({ hospitalId, baseUrl }: DetailProps) {
  const [hospital, setHospital] = useState<HospitalDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalDetail = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        const hospitalRes = await axios.get(
          `${baseUrl}/hospital/${hospitalId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const today = new Date().toISOString().split("T")[0];
        const scheduleRes = await axios.get(
          `${baseUrl}/hospital/${hospitalId}/schedule`,
          {
            params: { date: today },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (hospitalRes.data.success && scheduleRes.data.success) {
          setHospital({
            name: hospitalRes.data.data.name,
            address: hospitalRes.data.data.address,
            openTime: scheduleRes.data.data.openTime,
            closeTime: scheduleRes.data.data.closeTime,
            services: hospitalRes.data.data.services,
          });
        }
      } catch (error) {
        console.error("병원 상세 정보 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetail();
  }, [hospitalId, baseUrl]);

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const period = h < 12 ? "오전" : "오후";
    const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${period} ${displayHour.toString().padStart(2, "0")}:${minute}`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.MainColor} />
          <Text style={styles.loadingText}>정보를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!hospital) {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>병원 정보를 불러올 수 없습니다</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.detailInfoContainer}>
        <Text style={styles.label}>병원명</Text>
        <Text style={styles.content}>{hospital.name}</Text>
      </View>

      <View style={styles.detailInfoContainer}>
        <Text style={styles.label}>오시는 길</Text>
        <Text style={styles.content}>{hospital.address}</Text>
      </View>

      <View style={styles.detailInfoContainer}>
        <Text style={styles.label}>진료시간</Text>
        <Text style={styles.content}>
          {formatTime(hospital.openTime)} ~ {formatTime(hospital.closeTime)}
        </Text>
      </View>

      <View style={styles.grayStick} />

      <View style={styles.detailInfoContainer}>
        <Text style={styles.label}>편의시설 및 서비스</Text>
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
    marginVertical: -22,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  loadingText: {
    fontSize: 14,
    color: colors.GRAY0,
  },
  errorText: {
    fontSize: 14,
    color: colors.GRAY0,
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    fontSize: 14,
    color: colors.GRAY0,
    lineHeight: 20,
  },
  serviceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
    paddingHorizontal: 10,
  },
});
