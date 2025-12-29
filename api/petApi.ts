import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUrl = process.env.EXPO_PUBLIC_BACKEND_API_URL;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem("accessToken");
  } catch {
    return null;
  }
};

apiClient.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export const petApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await apiClient.post("/auth/login", data);
    const { accessToken, refreshToken } = res.data.data;

    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);

    return res.data.data;
  },

  getBreeds: async (): Promise<Breed[]> => {
    const res = await apiClient.get("/breed");
    return res.data.data.breeds;
  },

  getDiseasesByBreed: async (breedId: number): Promise<Disease[]> => {
    const res = await apiClient.get(`/disease/${breedId}`);
    return res.data.data.diseases;
  },

  createPet: async (data: CreatePetRequest): Promise<void> => {
    await apiClient.post("/pet", data);
  },

  getPets: async (): Promise<Pet[]> => {
    const res = await apiClient.get("/pet");
    return res.data.data.pets;
  },

  updatePet: async (petId: number, data: CreatePetRequest): Promise<void> => {
    await apiClient.put(`/pet/${petId}`, data);
  },

  updatePhone: async (phoneNum: string): Promise<void> => {
    await apiClient.patch("/user/phone", {
      phoneNum,
    });
  },

  deleteMe: async (): Promise<void> => {
    try {
      await apiClient.delete("/user/me");
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      throw error;
    }
  },
};
