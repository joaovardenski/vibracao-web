import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../services/api";
import type { Admin } from "../types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("access_token_vj2026");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/me");
        setAdmin(data.admin);
      } catch {
        localStorage.removeItem("access_token_vj2026");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  function logout() {
    localStorage.removeItem("access_token_vj2026");
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, authenticated: !!admin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}