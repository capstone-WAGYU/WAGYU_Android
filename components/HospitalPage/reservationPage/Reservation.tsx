import { colors } from "@/constants";
import Entypo from "@expo/vector-icons/Entypo";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import AmpmButton from "./AmpmButton";

export default function Reservation() {
  const [selected, setSelected] = useState<string>("");
  const [ampm, setAmpm] = useState<string | null>(null);

  const onDayPress = (day: DateData) => {
    setSelected(day.dateString);
  };
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

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.timeInfoContainer}>
        <Entypo name="calendar" size={20} color="black" />
        <Text style={styles.timeInfo}>날짜와 시간을 선택해주세요</Text>
      </View>

      <Calendar
        style={styles.calenderBox}
        onDayPress={onDayPress}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: colors.MainColor,
          },
        }}
        monthFormat={"yyyy.MM"}
        theme={{
          todayTextColor: colors.MainColor,
          arrowColor: colors.MainColor,
        }}
        renderArrow={(direction) => (
          <Text
            style={{
              paddingHorizontal: 40, // ← 간격 줄어듦
              marginHorizontal: -5, // ← 양쪽 여백 없애기
              fontSize: 18,
            }}
          >
            {direction === "left" ? (
              <SimpleLineIcons
                name="arrow-left"
                size={15}
                color="black"
                style={{ fontWeight: "900" }}
              />
            ) : (
              <SimpleLineIcons
                name="arrow-right"
                size={15}
                color="black"
                style={{ fontWeight: "bold" }}
              />
            )}
          </Text>
        )}
      />

      <View style={styles.grayStick} />
      <View style={styles.amPmContainer}>
        <Text style={styles.amPmText}>오전</Text>
        <View style={styles.amPmButtonContainer}>
          <AmpmButton
            label="10:00"
            selected={ampm === "10:00"}
            onPress={() => setAmpm(ampm === "10:00" ? null : "10:00")}
          />
          <AmpmButton
            label="11:00"
            selected={ampm === "11:00"}
            onPress={() => setAmpm(ampm === "11:00" ? null : "11:00")}
          />
        </View>
      </View>
      <View style={styles.amPmContainer}>
        <Text style={styles.amPmText}>오후</Text>
        <View style={styles.amPmButtonContainer}>
          <AmpmButton
            label="1:00"
            selected={ampm === "1:00"}
            onPress={() => setAmpm(ampm === "1:00" ? null : "1:00")}
          />
          <AmpmButton
            label="2:00"
            selected={ampm === "2:00"}
            onPress={() => setAmpm(ampm === "2:00" ? null : "2:00")}
          />
          <AmpmButton
            label="3:00"
            selected={ampm === "3:00"}
            onPress={() => setAmpm(ampm === "3:00" ? null : "3:00")}
          />
        </View>
      </View>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoText}>
          ※ 예약 신청 후 업체에 예약 승인 대기시간 소요 ( 평균 10분 이내 )
        </Text>
        {/* <Text style={styles.infoText}></Text> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginHorizontal: 20,
    paddingBottom: -40, // expo 억지 ui 조정
    paddingTop: -15, // expo 억지 ui 조정
  },
  infoText: {
    fontSize: 12,
  },
  grayStick: {
    // marginHorizontal: 15,
    marginVertical: 18,
    height: 2,
    backgroundColor: colors.GRAY6,
  },
  timeInfoContainer: {
    flexDirection: "row",
    gap: 5,
    // paddingHorizontal: 18,
  },
  infoTextContainer: {
    alignItems: "center",
    paddingVertical: 25,
  },
  timeInfo: {
    fontSize: 15,
    fontWeight: "600",
  },
  calenderBox: {
    height: 350,
    flex: 1,
    paddingHorizontal: 15,
    // marginHorizontal: 6,
  },
  amPmContainer: {
    //
  },
  amPmText: {
    fontWeight: "600",
    fontSize: 15,
  },
  amPmButtonContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    gap: 10,
  },
  // arrowIcon: {
  //   fontWeight: "bold",
  // },
  hospitalCardContainer: {},
});
