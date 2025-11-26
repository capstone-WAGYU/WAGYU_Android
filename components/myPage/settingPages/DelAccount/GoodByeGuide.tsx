import { colors } from "@/constants";
import React from "react";
import { PressableProps, StyleSheet, Text, View } from "react-native";
interface GoodByeGuideProps extends PressableProps {
  variant?: "filled";
}

function GoodByeGuide({ variant = "filled", ...props }: GoodByeGuideProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>[회원탈퇴 약관]</Text>
      </View>
      <Text style={styles.information}>
        회원탈퇴 신청 전 다음 안내 사항을 확인 해주세요.
      </Text>
      <Text></Text>
      <Text style={styles.information}>
        회원탈퇴를 신청하시면 현재 로그인 된 아이디는 사용하실 수 없습니다.
      </Text>
      <Text style={styles.information}>
        회원탈퇴를 하더라도, 서비스 약관 및 개인정보 취급방침 동의하에 따라
        일정기간 동안 회원 개인정보를 보관합니다.
      </Text>
      <Text style={styles.information}>
        애완동물 정보도 마찬가지로 반려자를 위해 개인정보를 일정기간 동안 보관을
        진행합니다.
      </Text>
      <Text style={styles.information}>
        회원탈퇴를 진행하기 전 병원 예약 된 상태일 시 계정과 금전에 대한
        불이익을 가합니다.
      </Text>

      <Text></Text>
      <Text style={styles.shortInfor}>- 회원정보 일정 시간 보관</Text>
      <Text style={styles.shortInfor}>- 애완동물 정보 일정 시간 보관</Text>
      <Text style={styles.shortInfor}>- 예약 상태 시 불이익</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: colors.GRAY4,
    borderRadius: 3,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    paddingBottom: 18,
    fontWeight: "500",
  },
  shortInfor: {
    fontWeight: "bold",
  },

  information: {
    color: colors.GRAY10,
  },
});

export default GoodByeGuide;
