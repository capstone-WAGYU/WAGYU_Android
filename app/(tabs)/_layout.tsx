import { colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.MainColor,
        headerShown: false,
        tabBarStyle: {
          height: 100,
          paddingTop: 8,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          borderColor: colors.GRAY6,
          backgroundColor: "white",
          position: "absolute",
          padding: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={25}
              color={focused ? colors.MainColor : colors.GRAY7}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="advice"
        options={{
          title: "상담",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              size={25}
              color={focused ? colors.MainColor : colors.GRAY7}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reservate"
        options={{
          title: "예약",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={25}
              color={focused ? colors.MainColor : colors.GRAY7}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "마이",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={25}
              color={focused ? colors.MainColor : colors.GRAY7}
            />
          ),
        }}
      />
    </Tabs>
  );
}
