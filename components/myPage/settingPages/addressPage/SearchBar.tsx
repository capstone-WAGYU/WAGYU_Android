import { colors } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import {
  PressableProps,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface SearchBarButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

function SearchBarButton({ label }: SearchBarButtonProps) {
  return (
    <View>
      <View style={styles.container}>
        <TextInput placeholder={label} style={styles.barContainer} />
        <View style={styles.iconContainer}>
          <Feather name="search" size={21} color={colors.GRAY7} />
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={styles.tip}>Tip</Text>
        <Text style={styles.grayText}>
          아래와 같은 조합으로 검색을 하시면 더욱 정확한 결과가 검색됩니다
        </Text>
        <View>
          <Text style={styles.grayText}>도로명 + 건물번호</Text>
          <Text style={styles.skyText}>예) 판교역로 166, 제주 첨단로 242</Text>
        </View>

        <View>
          <Text style={styles.grayText}>지역명(동/리) + 번지</Text>
          <Text style={styles.skyText}>예) 백현동 532, 제주 영평동 2181</Text>
        </View>

        <View>
          <Text style={styles.grayText}>지역명(동/리) + 건물명(아파트명)</Text>
          <Text style={styles.skyText}>예) 분당 주공, 연수동 주공3차</Text>
        </View>

        <View>
          <Text style={styles.grayText}>서서함명 + 번호</Text>
          <Text style={styles.skyText}>예) 분당우체국사서함 1 ~ 100</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    color: "black",

    borderTopWidth: 1,
    borderTopColor: colors.GRAY3,
    borderLeftWidth: 1,
    borderLeftColor: colors.GRAY3,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY3,

    // borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
  },
  iconContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    paddingRight: 10,

    borderTopWidth: 1,
    borderTopColor: colors.GRAY3,
    borderRightWidth: 1,
    borderRightColor: colors.GRAY3,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY3,
    // borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
  },
  container: {
    flexDirection: "row",
  },
  container2: {
    borderWidth: 1,
    borderColor: colors.GRAY3,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  tip: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.GRAY0,
  },
  grayText: {
    color: colors.GRAY0,
  },
  skyText: {
    color: "skyblue",
  },
});

export default SearchBarButton;
