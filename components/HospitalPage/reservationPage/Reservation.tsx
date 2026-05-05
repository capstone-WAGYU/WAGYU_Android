import { colors } from "@/constants";
import Entypo from "@expo/vector-icons/Entypo";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import AmpmButton from "./AmpmButton";

interface ReservationProps {
  hospitalId: number;
  baseUrl: string;
  onClosedChange?: (closed: boolean) => void;
  onDateChange?: (date: string) => void;
  onTimeChange?: (time: string | null) => void;
}

/* 🇰🇷 달력 한글 설정 */
LocaleConfig.locales.kr = {
  monthNames: [
    "01월",
    "02월",
    "03월",
    "04월",
    "05월",
    "06월",
    "07월",
    "08월",
    "09월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "01월",
    "02월",
    "03월",
    "04월",
    "05월",
    "06월",
    "07월",
    "08월",
    "09월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
};
LocaleConfig.defaultLocale = "kr";

export default function Reservation({
  hospitalId,
  baseUrl,
  onClosedChange,
  onDateChange,
  onTimeChange,
}: ReservationProps) {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<{
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSchedule(null);
    setSelectedTime(null);
  }, [selectedDate]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);

        const token = await AsyncStorage.getItem("accessToken");
        if (!token) return;

        const res = await axios.get(
          `${baseUrl}/hospital/${hospitalId}/schedule`,
          {
            params: { date: selectedDate },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success && res.data.data) {
          setSchedule(res.data.data);
          onClosedChange?.(res.data.data.isClosed);
        } else {
          const closed = { openTime: "", closeTime: "", isClosed: true };
          setSchedule(closed);
          onClosedChange?.(true);
        }
      } catch {
        const closed = { openTime: "", closeTime: "", isClosed: true };
        setSchedule(closed);
        onClosedChange?.(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [selectedDate, hospitalId]);

  const timeSlots = useMemo(() => {
    if (!schedule || schedule.isClosed) return [];

    const [oh, om] = schedule.openTime.split(":").map(Number);
    const [ch, cm] = schedule.closeTime.split(":").map(Number);

    let cur = oh * 60 + om;
    const end = ch * 60 + cm;
    const isToday = selectedDate === today;

    const slots: string[] = [];
    while (cur < end) {
      if (!isToday || cur > currentMinutes) {
        const h = Math.floor(cur / 60);
        const m = cur % 60;
        slots.push(
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
        );
      }
      cur += 60;
    }
    return slots;
  }, [schedule, selectedDate, today, currentMinutes]);

  const amSlots = timeSlots.filter((t) => Number(t.split(":")[0]) < 12);
  const pmSlots = timeSlots.filter((t) => Number(t.split(":")[0]) >= 12);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.timeInfoContainer}>
        <Entypo name="calendar" size={20} color="black" />
        <Text style={styles.timeInfo}>
          {loading
            ? "스케줄 로딩 중..."
            : schedule?.isClosed === true
              ? "해당 날짜는 휴무입니다."
              : "날짜와 시간을 선택해주세요"}
        </Text>
      </View>

      <Calendar
        style={styles.calenderBox}
        onDayPress={(day: DateData) => {
          setSelectedDate(day.dateString);
          setSelectedTime(null);
          onDateChange?.(day.dateString);
          onTimeChange?.(null);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: colors.MainColor,
          },
        }}
        minDate={today}
        monthFormat={"yyyy.MM"}
        theme={{
          todayTextColor: colors.MainColor,
          arrowColor: colors.MainColor,
        }}
        renderArrow={(direction) => (
          <Text style={{ paddingHorizontal: 40 }}>
            {direction === "left" ? (
              <SimpleLineIcons name="arrow-left" size={15} />
            ) : (
              <SimpleLineIcons name="arrow-right" size={15} />
            )}
          </Text>
        )}
      />

      <View style={styles.grayStick} />

      {!loading && !schedule?.isClosed && (
        <ScrollView>
          {amSlots.length > 0 && (
            <View style={styles.amPmContainer}>
              <Text style={styles.amPmText}>오전</Text>
              <View style={styles.amPmButtonContainer}>
                {amSlots.map((t) => (
                  <AmpmButton
                    key={t}
                    label={t}
                    selected={selectedTime === t}
                    onPress={() => { setSelectedTime(t); onTimeChange?.(t); }}
                  />
                ))}
              </View>
            </View>
          )}

          {pmSlots.length > 0 && (
            <View style={styles.amPmContainer}>
              <Text style={styles.amPmText}>오후</Text>
              <View style={styles.amPmButtonContainer}>
                {pmSlots.map((t) => (
                  <AmpmButton
                    key={t}
                    label={t}
                    selected={selectedTime === t}
                    onPress={() => { setSelectedTime(t); onTimeChange?.(t); }}
                  />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      )}

      <View style={styles.infoTextContainer}>
        <Text style={styles.infoText}>
          ※ 예약 신청 후 업체 승인까지 평균 10분 소요
        </Text>
      </View>
    </SafeAreaView>
  );
}

/* 🎨 styles */
const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 5,
  },
  timeInfoContainer: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 10,
  },
  timeInfo: {
    fontSize: 15,
    fontWeight: "600",
  },
  calenderBox: {
    height: 350,
    paddingHorizontal: 15,
  },
  grayStick: {
    marginVertical: 18,
    height: 2,
    backgroundColor: colors.GRAY6,
  },
  amPmContainer: {
    marginTop: 15,
  },
  amPmText: {
    fontWeight: "600",
    fontSize: 15,
  },
  amPmButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingVertical: 10,
  },
  infoTextContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  infoText: {
    fontSize: 12,
  },
});
