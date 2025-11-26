import Header from "@/components/public/Header";
import Postcode from "@actbase/react-daum-postcode";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddressManagement() {
  const navigation: any = useNavigation();

  const getAddressData = (data: any) => {
    let defaultAddress = "";

    if (data.buildingName === "") {
      defaultAddress = "";
    } else if (data.buildingName === "N") {
      defaultAddress = "(" + data.apartment + ")";
    } else {
      defaultAddress = "(" + data.buildingName + ")";
    }

    navigation.navigate("Drawers", {
      screen: "Deliver",
      params: {
        zonecode: data.zonecode,
        address: data.address,
        defaultAddress,
      },
    });
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header label="" />
      <View style={styles.textAccount}>
        <Text style={styles.text}>변경을 원하시는</Text>
        <Text style={styles.text}>도로명 주소를 입력하세요.</Text>
      </View>
      <Postcode
        style={{ width: "100%", height: "80%" }}
        jsOptions={{ animation: true }}
        onSelected={(data: any) => getAddressData(data)}
        onError={function (error: unknown): void {
          throw new Error("Function not implemented.");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
  textAccount: {
    paddingVertical: 30,
  },
});
