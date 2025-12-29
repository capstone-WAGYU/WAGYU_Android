import LoginInput from "@/components/authPage/LoginInput";
import NextButton from "@/components/authPage/NextButton";
import { colors } from "@/constants";
import { useAuth } from "@/context/useAuth";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const baseUrl = process.env.EXPO_PUBLIC_BACKEND_API_URL;
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("로그인 실패", "아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      console.log("Login 요청 URL:", `${baseUrl}/auth/login`);
      console.log("보내는 데이터:", { username, password });

      const response = await axios.post(`${baseUrl}/auth/login`, {
        username,
        password,
      });

      console.log("응답:", response.data);

      const accessToken = response.data.data?.accessToken;

      if (!accessToken) {
        throw new Error("토큰이 없습니다.");
      }

      await login(accessToken);
      router.replace("/(tabs)");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("Axios Error Message:", error.message);
        console.log("Axios Response Data:", error.response?.data);
      } else {
        console.log("Other Error:", error);
      }
      Alert.alert("로그인 실패", "아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.textsContainer}>
        <View>
          <Text style={styles.text}>간단한 로그인 후</Text>
          <Text style={styles.text}>서비스를 이용해보세요!</Text>
        </View>

        <View style={styles.announcesContainer}>
          <Text style={styles.loginAnnounceText}>로그인</Text>
          <Text style={styles.announceText}>
            {" "}
            후 나의 애완동물을 케어해보세요!
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <LoginInput
          label="사용자명을 입력하세요"
          value={username}
          onChangeText={setUsername}
        />
        <LoginInput
          label="비밀번호를 입력하세요"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View>
          <View style={styles.loginInput}>
            <NextButton label="로그인 하기" onPress={handleLogin} />
          </View>

          <View style={styles.registerInfo}>
            <Text style={styles.registerText}>계정이 없으신가요? </Text>
            <Text
              style={styles.register}
              onPress={() => router.push("/auth/register")}
            >
              회원가입{" "}
            </Text>
            <Text style={styles.registerText}>후 이용해주세요</Text>
          </View>
        </View>
      </View>

      <View style={styles.voidContainer} />
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
  voidContainer: {
    flex: 3,
  },
  textContainer: {},
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 10,
  },
  announcesContainer: {
    flexDirection: "row",
  },
  loginAnnounceText: {
    color: colors.MainColor,
  },
  announceText: {
    color: colors.GRAY2,
  },
  registerInfo: {
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "center",
  },
  register: {
    color: colors.MainColor,
    fontSize: 13,
  },
  registerText: {
    fontSize: 13,
  },
  loginInput: {
    marginVertical: 12,
  },
});
