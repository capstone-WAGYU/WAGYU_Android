import { petApi, ReservationDetail } from "@/api/petApi";
import Header from "@/components/HospitalPage/Header";
import { colors } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STATUS_LABEL: Record<string, { text: string; color: string }> = {
  PENDING:  { text: "예약 대기 중", color: "#F5A623" },
  ACCEPTED: { text: "예약 확정",    color: colors.MainColor },
  RESOLVED: { text: "진료 완료",    color: "#4CAF50" },
  REJECTED: { text: "예약 거절",    color: "#E53935" },
};

const formatTime = (t: ReservationDetail["time"]): string => {
  if (typeof t === "string") return t.slice(0, 5);
  return `${String(t.hour).padStart(2, "0")}:${String(t.minute).padStart(2, "0")}`;
};

export default function ReservationInfoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [detail, setDetail] = useState<ReservationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) { router.back(); return; }
    petApi.getReservationDetail(Number(id))
      .then(setDetail)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.bg}>
        <Header label="예약 상세" />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.MainColor} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !detail) {
    return (
      <SafeAreaView style={styles.bg}>
        <Header label="예약 상세" />
        <View style={styles.center}>
          <Text style={styles.errorText}>예약 정보를 불러올 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const status = STATUS_LABEL[detail.status] ?? { text: detail.status, color: colors.GRAY1 };

  return (
    <SafeAreaView style={styles.bg}>
      <Header label="예약 상세" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* 상태 배지 */}
        <View style={[styles.badge, { backgroundColor: status.color + "20" }]}>
          <Text style={[styles.badgeText, { color: status.color }]}>{status.text}</Text>
        </View>

        <View style={styles.card}>
          <Row label="병원" value={detail.hospital.name} />
          <Row label="반려동물" value={detail.pet.name} />
          <Row label="날짜" value={detail.date} />
          <Row label="시간" value={formatTime(detail.time)} />
          <Row label="진료 내용" value={detail.reason} />
          {detail.comment ? <Row label="요청사항" value={detail.comment} /> : null}
        </View>

        {detail.hospitalComment ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>병원 코멘트</Text>
            <Text style={styles.commentText}>{detail.hospitalComment}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badgeText: {
    fontWeight: "700",
    fontSize: 14,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.GRAY6,
    padding: 16,
    gap: 14,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 14,
    color: colors.GRAY1,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: colors.Black,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  rowLabel: {
    fontSize: 13,
    color: colors.GRAY2,
    fontWeight: "500",
    width: 80,
  },
  rowValue: {
    fontSize: 14,
    color: colors.Black,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  errorText: {
    color: colors.GRAY2,
    fontSize: 14,
  },
});
