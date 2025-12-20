import SocialLoginButton from "@/components/authPage/SocialLoginButton";
import { colors } from "@/constants";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_LOGIN_CLIENTID!,
    scopes: ["openid", "profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { accessToken, idToken } = response.authentication!;

      console.log("Google Login Success");
      console.log("accessToken:", accessToken);
      console.log("idToken:", idToken);

      router.replace("/auth/petInfor");
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.textsContainer}>
        <View>
          <Text style={styles.text}>간단한 로그인 후</Text>
          <Text style={styles.text}>서비스를 이용해보세요!</Text>
        </View>

        <View style={styles.announcesContainer}>
          <Text style={styles.announceText}>원하시는</Text>
          <Text style={styles.loginAnnounceText}> 로그인 </Text>
          <Text style={styles.announceText}>방법을 선택하세요</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <SocialLoginButton
          label="Naver로 시작하기"
          logo={require("../../assets/images/naver_logo.png")}
          backgroundColor={colors.Naver}
          onPress={() => router.push("/auth/petInfor")}
        />

        <SocialLoginButton
          label="Kakao로 시작하기"
          logo={require("../../assets/images/kakao_logo.png")}
          backgroundColor={colors.Kakao}
          textColor={colors.Black}
          onPress={() => router.push("/auth/petInfor")}
        />

        <SocialLoginButton
          label="Google로 시작하기"
          logo={require("../../assets/images/google_logo.png")}
          backgroundColor={colors.WHITE}
          textColor={colors.Black}
          disabled={!request}
          onPress={() => promptAsync()}
        />
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
    paddingBottom: "20%",
    gap: 20,
  },
  buttonsContainer: {
    flex: 2,
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
});
