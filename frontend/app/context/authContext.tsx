"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthContextType } from "@/types/auth.type";
import { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const refreshUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res || null);
    } catch (error) {
      setUser(null);
    }
  };

  const logIn = () => {
    router.push("/login");
  };

  const logOut = async () => {
    try {
      await API.post("/api/v1/users/logout");
    } catch (error) {
      console.log("Logout failed", error);
    } finally {
      setUser(null);
      router.replace("/login");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await refreshUser();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    logOut,
    logIn,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
