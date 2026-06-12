// components/ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../shared/hooks/useAuth";

export default function ProtectedRoute() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
