// src/api/petApi.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUrl = process.env.EXPO_PUBLIC_BACKEND_API_URL; // ✅ 실제 서버 주소

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 가져오기 함수
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (error) {
    console.error("토큰 가져오기 실패:", error);
    return null;
  }
};

// 요청 인터셉터: Authorization 헤더 추가
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 타입 정의
export interface Breed {
  id: number;
  name: string;
  size: "TOY" | "SMALL" | "MEDIUM" | "LARGE" | "GIANT";
}

export interface Disease {
  id: number;
  name: string;
}

export interface Pet {
  id: number;
  name: string;
  age: number;
  breed: Breed;
  gender: "M" | "F";
  diseases: Disease[];
}

export interface CreatePetRequest {
  name: string;
  age: number;
  breedId: number;
  gender: "M" | "F";
  diseaseIds: number[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// API 함수들
export const petApi = {
  // 로그인
  login: async (loginData: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post("/auth/login", loginData);
      const { accessToken, refreshToken } = response.data.data;

      // 토큰 저장
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      return response.data.data;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  },

  // 품종 목록 조회
  getBreeds: async (): Promise<Breed[]> => {
    try {
      const response = await apiClient.get("/breed");
      return response.data.data.breeds;
    } catch (error) {
      console.error("품종 목록 조회 실패:", error);
      throw error;
    }
  },

  // 특정 품종의 유전병 목록 조회
  getDiseasesByBreed: async (breedId: number): Promise<Disease[]> => {
    try {
      const response = await apiClient.get(`/disease/${breedId}`);
      return response.data.data.diseases;
    } catch (error) {
      console.error("유전병 목록 조회 실패:", error);
      throw error;
    }
  },

  // 반려동물 등록
  createPet: async (petData: CreatePetRequest): Promise<void> => {
    try {
      const response = await apiClient.post("/pet", petData);
      return response.data;
    } catch (error) {
      console.error("반려동물 등록 실패:", error);
      throw error;
    }
  },

  // 반려동물 목록 조회
  getPets: async (): Promise<Pet[]> => {
    try {
      const response = await apiClient.get("/pet");
      return response.data.data.pets;
    } catch (error) {
      console.error("반려동물 목록 조회 실패:", error);
      throw error;
    }
  },

  updatePet: async (
    petId: number,
    petData: CreatePetRequest
  ): Promise<void> => {
    try {
      const response = await apiClient.put(`/pet/${petId}`, petData);
      return response.data;
    } catch (error) {
      console.error("반려동물 수정 실패:", error);
      throw error;
    }
  },
};
