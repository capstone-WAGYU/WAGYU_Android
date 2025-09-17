import HospitalCard from "@/components/HospitalCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ReservateScreen() {
  const username = "황성재";

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>동물병원 예약</Text>
      </View>

      <Pressable
        style={styles.searchCard}
        onPress={() => router.push("/(tabs)/reservate")}
      >
        <View style={styles.iconAndText}>
          <Ionicons
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
          <Text style={styles.searchText}>검색</Text>
        </View>
      </Pressable>
      <View>
        <Text style={styles.announceText}>
          {username}님 근처의 동물병원이예요!
        </Text>
      </View>
      <View style={styles.hospitalCardContainer}>
        <HospitalCard
          title="동대구동물의료센터"
          onPress={() => router.push("/(tabs)/reservate")}
        />
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
  titleContainer: {
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchCard: {
    backgroundColor: "#EFEFEF",
    width: "100%",
    height: "6%",
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  searchIcon: {
    color: "#CCCCCC",
    fontSize: 20,
    paddingHorizontal: 2,
  },
  iconAndText: {
    flexDirection: "row",
  },
  searchText: {
    color: "#CCCCCC",
    paddingHorizontal: 2,
  },
  announceText: {
    // fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  hospitalCardContainer: {},
});
