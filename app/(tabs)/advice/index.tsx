import ChatBot from "@/components/advicePage/ChatBot";
import ChatUser from "@/components/advicePage/ChatUser";
import Header from "@/components/advicePage/Header";
import MessageInput from "@/components/advicePage/MessageInput";
import { usePetStore } from "@/store/petStore";
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
  const { pets } = usePetStore();

  const baseUrl = process.env.EXPO_PUBLIC_CHATBOT_API_URL;

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const typeText = async (fullText: string, botIndex: number) => {
    for (let i = 0; i < fullText.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 25));

      setMessages((prev) => {
        const updated = [...prev];
        updated[botIndex] = {
          ...updated[botIndex],
          text: updated[botIndex].text + fullText[i],
        };
        return updated;
      });
    }
  };

  const loadingMessages = [
    "생각 하는 중..",
    "진단 결정 중..",
    "질문 읽는 중..",
  ];

  const [loadingText, setLoadingText] = useState("");

  const sendMessage = async () => {
    if (!text.trim() || loading) return;

    const userText = text;
    setText("");
    setLoading(true);

    setLoadingText(
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
    );

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);

    let botIndex = 0;
    setMessages((prev) => {
      botIndex = prev.length;
      return [...prev, { sender: "bot", text: "" }];
    });

    try {
      // 2마리까지 데이터 합치기
      const petInfoText = pets
        .slice(0, 2)
        .map((pet, idx) => {
          const diseases = pet.diseases.map((d) => d.name).join(", ") || "없음";
          return `반려견 ${idx + 1}: 이름 ${pet.name}, 나이 ${pet.age}, 품종 ${pet.breed.name}, 질병 ${diseases}`;
        })
        .join(" / ");

      const res = await fetch(`${baseUrl}/ai/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // userid: "1",
          species: "강아지",
          name: pets[0]?.name || "강아지",
          age: pets[0]?.age || 0,
          disease: pets[0]?.diseases.map((d) => d.name) || [],
          text: `${petInfoText}\n사용자 질문: ${userText}`,
        }),
      });

      if (!res.ok) throw new Error("Server error");

      const fullText = await res.text();
      await typeText(fullText, botIndex);
    } catch (err) {
      console.log("ERROR:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[botIndex] = {
          sender: "bot",
          text: "서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.chatContainer}>
        <Header label="독터봇" />

        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <ChatBot message="저는 개 수의 상담봇 닥터독입니다. 개의 질환에 관련한 무엇이든 물어보세요!" />

          {messages.map((msg, index) => {
            if (msg.sender === "user") {
              return <ChatUser key={index} message={msg.text} />;
            }

            if (msg.sender === "bot" && msg.text === "" && loading) {
              return <ChatBot key={index} message={loadingText} />;
            }

            return <ChatBot key={index} message={msg.text} />;
          })}
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
  },
});
