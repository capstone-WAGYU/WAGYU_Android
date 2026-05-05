import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { triggerSessionExpired } from "@/context/useAuth";

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

// 동시에 여러 401이 오더라도 refresh는 한 번만
let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("no refresh token");

        const res = await axios.post(`${baseUrl}/auth/refresh`, { refreshToken });
        const newToken = res.data.data.accessToken;

        await AsyncStorage.setItem("accessToken", newToken);

        refreshQueue.forEach((cb) => cb(newToken));
        refreshQueue = [];

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch {
        refreshQueue = [];
        triggerSessionExpired();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

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

export interface LocalTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface ReservationSummary {
  id: number;
  hospitalName: string;
  petName: string;
  date: string;
  time: LocalTime | string;
  status: "PENDING" | "ACCEPTED" | "RESOLVED" | "REJECTED";
}

export interface ReservationDetail {
  id: number;
  pet: { id: number; name: string };
  hospital: { id: number; name: string };
  date: string;
  time: LocalTime | string;
  reason: string;
  comment: string;
  status: "PENDING" | "ACCEPTED" | "RESOLVED" | "REJECTED";
  hospitalComment: string;
  createdAt: string;
  updatedAt: string;
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

  deletePet: async (petId: number): Promise<void> => {
    await apiClient.delete(`/pet/${petId}`);
  },

  updatePhone: async (phoneNum: string): Promise<void> => {
    await apiClient.patch("/user/phone", { phoneNum });
  },

  deleteMe: async (): Promise<void> => {
    await apiClient.delete("/user/me");
  },

  createReservation: async (
    hospitalId: number,
    data: {
      petId: number;
      date: string;
      time: string;
      reason: string;
      comment: string;
    }
  ): Promise<void> => {
    await apiClient.post(`/hospital/${hospitalId}/reservation`, data);
  },

  getReservations: async (): Promise<ReservationSummary[]> => {
    const res = await apiClient.get("/reservation");
    return res.data.data.reservations;
  },

  getReservationDetail: async (id: number): Promise<ReservationDetail> => {
    const res = await apiClient.get(`/reservation/${id}`);
    return res.data.data;
  },
};
