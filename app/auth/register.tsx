import NextButton from "@/components/authPage/NextButton";
import RegisterInput from "@/components/authPage/RegisterInput";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const baseUrl = process.env.EXPO_PUBLIC_BACKEND_API_URL;

  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async () => {
    if (!validatePassword(password)) {
      Alert.alert(
        "비밀번호 형식 오류",
        "비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다."
      );
      return;
    }

    if (password !== passwordCheck) {
      Alert.alert("비밀번호가 일치하지 않음", "다시 입력해 주세요");
      return;
    }

    try {
      await axios.post(`${baseUrl}/auth/register`, {
        username,
        password,
        nickname,
      });

      Alert.alert("회원가입 성공", "로그인해 주세요");
      router.push("/auth");
    } catch (error) {
      Alert.alert("회원가입 실패", "모든 정보를 기입해 주세요");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{ flex: 1, paddingBottom: 305 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <View style={styles.textsContainer}>
          <View>
            <Text style={styles.text}>간단한 정보 입력 후</Text>
            <Text style={styles.text}>회원가입을 해주세요!</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <RegisterInput
            header="사용자명"
            label="사용자명을 입력해주세요"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <RegisterInput
            header="닉네임"
            label="닉네임을 입력해주세요"
            value={nickname}
            onChangeText={setNickname}
          />

          <RegisterInput
            header="비밀번호"
            label="비밀번호를 입력해주세요"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="oneTimeCode"
            value={password}
            onChangeText={setPassword}
          />

          {password.length > 0 && !validatePassword(password) && (
            <Text style={styles.passwordWarning}>
              비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다
            </Text>
          )}

          <RegisterInput
            header="비밀번호 확인"
            label="비밀번호를 다시 입력해주세요"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="oneTimeCode"
            value={passwordCheck}
            onChangeText={setPasswordCheck}
          />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.fixedButton}>
        <NextButton label="회원가입 하기" onPress={handleRegister} />
      </View>
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
  fixedButton: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    marginBottom: 43,
  },
  textsContainer: {
    flex: 3,
    justifyContent: "flex-end",
    paddingBottom: "12%",
    gap: 20,
  },
  buttonsContainer: {
    flex: 3,
    gap: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  passwordWarning: {
    fontSize: 12,
    color: "red",
    marginLeft: 4,
  },
});
