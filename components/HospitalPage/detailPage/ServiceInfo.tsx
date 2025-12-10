import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface ServiceInfoProps {
  label: string;
  image: any;
}

function ServiceInfo({ label, image }: ServiceInfoProps) {
  return (
    <View style={styles.container}>
      <Image source={image} />
      <View>
        <Text>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 4, gap: 5 },
});

export default ServiceInfo;
