import ChatBot from "@/components/advicePage/ChatBot";
import ChatUser from "@/components/advicePage/ChatUser";
import Header from "@/components/advicePage/Header";
import MessageInput from "@/components/advicePage/MessageInput";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function AdviceScreen() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const baseUrl = process.env.EXPO_PUBLIC_CHATBOT_API_URL;

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const sendMessage = async () => {
    if (!text.trim() || loading) return;

    const userText = text;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setText("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl}/ai/ask`,
        {
          userid: "1",
          species: "",
          name: "",
          age: 1,
          disease: [""],
          text: userText,
        },
        { timeout: 30000 }
      );

      const botAnswer =
        typeof response.data === "string"
          ? response.data
          : response.data?.answer || "답변을 불러오지 못했어요.";

      setMessages((prev) => [...prev, { sender: "bot", text: botAnswer }]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
        },
      ]);

      console.log("ERROR MESSAGE:", error.message);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("FULL ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, loading]);

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.chatContainer}>
        <Header label={"독터봇"} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          contentContainerStyle={{ paddingBottom: 20 }}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
        >
          <ChatBot message={"저에게 개의 질환에 관한 무엇이든 물어보세요!"} />

          {messages.map((msg, index) =>
            msg.sender === "user" ? (
              <ChatUser key={index} message={msg.text} />
            ) : (
              <ChatBot key={index} message={msg.text} />
            )
          )}
          {loading && <ChatBot key="loading" message="입력 중..." />}
        </ScrollView>
      </View>

      <MessageInput
        label="메시지를 입력해주세요"
        value={text}
        onChangeText={setText}
        onSubmit={sendMessage}
        disabled={loading}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    marginBottom: 100,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "flex-start",
  },
});
