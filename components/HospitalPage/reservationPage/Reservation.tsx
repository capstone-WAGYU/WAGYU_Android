import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Reservation() {
  return (
    <SafeAreaView style={styles.background}>
      <Text>예약스크린</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 36,
  },
  searchCard: {},
  searchIcon: {
    color: "#CCCCCC",
    fontSize: 20,
    paddingHorizontal: 2,
  },

  iconAndText: {
    flexDirection: "row",
  },

  hospitalCardContainer: {},
});
