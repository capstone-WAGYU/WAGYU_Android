import { colors } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

interface ImageUploadProps {
  size?: "medium" | "large";
  variant?: "filled";
}

export default function ImageUpload({
  size = "large",
  variant = "filled",
  ...props
}: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("사진 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
      onPress={pickImage}
      {...props}
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.plus}>
          <AntDesign name="plus" size={30} color={colors.GRAY3} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  large: {
    width: 120,
    height: 120,
  },
  medium: {
    width: 80,
    height: 80,
  },
  filled: {
    backgroundColor: colors.GRAY9,
  },
  plus: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  pressed: {
    opacity: 0.8,
  },
});
