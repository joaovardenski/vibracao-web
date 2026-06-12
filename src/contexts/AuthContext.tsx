import { createContext } from "react";

interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextData {
  admin: Admin | null;
  authenticated: boolean;
  loading: boolean;
  logout(): void;
  loadUser(): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);
