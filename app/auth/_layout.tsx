import { colors } from "@/constants";
import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.MainColor,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "로그인",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "회원가입",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="petInfor"
        options={{
          title: "동물정보",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
