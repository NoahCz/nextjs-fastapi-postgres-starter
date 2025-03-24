"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { IUser } from "../../types/user";
import { useApiBasePath } from "../../hooks/useApiBasePath";
import { UserContextType } from "./UserContext.interface";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBasePath = useApiBasePath();

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      // Update to use v1 path and include credentials and proper headers
      const response = await fetch(`${apiBasePath}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const userData = await response.json();
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Failed to load user data");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [apiBasePath]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, loading, error, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
