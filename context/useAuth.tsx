import { usePetStore } from "@/store/petStore";
import { useReservationStore } from "@/store/reservationStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

let _sessionExpiredHandler: (() => void) | null = null;
let _expiryTriggered = false;

export const registerSessionExpiredHandler = (handler: () => void) => {
  _sessionExpiredHandler = handler;
};

export const triggerSessionExpired = () => {
  if (_expiryTriggered) return;
  _expiryTriggered = true;
  _sessionExpiredHandler?.();
};

const clearAllStores = () => {
  usePetStore.getState().clearAll();
  useReservationStore.getState().clearReservations();
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    registerSessionExpiredHandler(async () => {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      clearAllStores();
      setIsLoggedIn(false);
    });
  }, []);

  const login = async (token: string) => {
    _expiryTriggered = false;
    await AsyncStorage.setItem("accessToken", token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    clearAllStores();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
