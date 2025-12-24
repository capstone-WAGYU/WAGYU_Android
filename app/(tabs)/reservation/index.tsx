import Header from "@/components/reservationPage/Header";
import HospitalCard from "@/components/reservationPage/HospitalCard";
import SearchBar from "@/components/reservationPage/SearchBar";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReservateScreen() {
  const baseUrl = process.env.EXPO_PUBLIC_BACKEND_API_URL;

  const PAGE_SIZE = 20;

  const [hospitals, setHospitals] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setKeyword("");
      setIsSearching(false);

      await fetchHospitals(0);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchHospitals = async (pageNumber: number) => {
    if (loading) return;

    try {
      setLoading(true);
      setIsSearching(false);

      const res = await axios.get(`${baseUrl}/hospital`, {
        params: { page: pageNumber, size: PAGE_SIZE },
      });

      const data = res.data.data;

      setHospitals(data.content);
      setPage(data.number);

      const totalElements = 2844;
      setTotalPages(Math.ceil(totalElements / PAGE_SIZE));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  /** 🔥 병원 검색 */
  const searchHospitals = async () => {
    if (!keyword.trim()) {
      fetchHospitals(0);
      return;
    }

    try {
      setLoading(true);
      setIsSearching(true);

      const res = await axios.get(`${baseUrl}/hospital/search`, {
        params: { name: keyword },
      });

      setHospitals(res.data.data.hospitals);
      setPage(0);
      setTotalPages(1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals(0);
  }, []);

  const handleRouter = (id: number) => {
    router.push(`/hospitalReservation?id=${id}`);
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header label="병원예약" />

      <SearchBar
        value={keyword}
        onChangeText={setKeyword}
        onSearch={searchHospitals}
        placeholder="찾고 계시는 병원명을 입력해주세요"
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={hospitals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HospitalCard
            title={item.name}
            location={item.address}
            closed={item.closed}
            onPress={() => handleRouter(item.id)}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>검색 결과가 없습니다.</Text>
          ) : null
        }
      />

      {!isSearching && (
        <View style={styles.pagination}>
          <Pressable
            disabled={page === 0}
            onPress={() => fetchHospitals(page - 1)}
          >
            <Text style={page === 0 ? styles.disabled : styles.pageBtn}>◀</Text>
          </Pressable>

          <Text style={styles.pageText}>
            {page + 1} / {totalPages}
          </Text>

          <Pressable
            disabled={page + 1 === totalPages}
            onPress={() => fetchHospitals(page + 1)}
          >
            <Text
              style={page + 1 === totalPages ? styles.disabled : styles.pageBtn}
            >
              ▶
            </Text>
          </Pressable>
        </View>
      )}
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
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  pageBtn: {
    fontSize: 18,
    marginHorizontal: 20,
    color: "black",
  },
  pageText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  disabled: {
    fontSize: 18,
    marginHorizontal: 20,
    color: "#ccc",
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#666",
  },
});
