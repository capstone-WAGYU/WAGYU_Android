import ChatBot from "@/components/advicePage/ChatBot";
import ChatUser from "@/components/advicePage/ChatUser";
import DateLine from "@/components/advicePage/DateLine";
import Header from "@/components/advicePage/Header";
import MessageInput from "@/components/advicePage/MessageInput";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdviceScreen() {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.chatContainer}>
        <Header label={"독터봇"} />
        <DateLine date="2025-11-12(수)" />
        <ChatUser message={"뽀삐가 요즘 짖지도 않고 누워만 있어..."} />
        <ChatBot message={"약을 사서 먹이세요"} />
        <ChatUser message={"닥터봇 고마워!!!"} />
        <ChatBot message={"언제든지 상담해 주세요 :)"} />
      </View>

      <MessageInput label={"메시지를 입력해주세요"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 15,
    marginBottom: 40,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "flex-start",
  },
});
