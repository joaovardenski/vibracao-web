import { Routes, Route } from "react-router-dom";

import Register from "../features/participants/pages/Register";
import PaymentReturn from "../features/participants/pages/PaymentReturn";

import Login from "../features/auth/pages/Login";

import Dashboard from "../features/admins/pages/Dashboard";
import Participants from "../features/admins/pages/Participants";
import Admins from "../features/admins/pages/Admins";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Register />} />
      <Route path="/payment" element={<PaymentReturn />} />
      <Route path="/login" element={<Login />} />

      {/* Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/participantes" element={<Participants />} />
        <Route path="/admin/administradores" element={<Admins />} />
      </Route>
    </Routes>
  );
}
