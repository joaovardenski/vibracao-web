import { Routes, Route } from "react-router-dom";

import Register from "../pages/Register";
import PaymentReturn from "../pages/PaymentReturn";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "../components/ProtectedRoute";
import Participants from "../pages/Participants";

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
      </Route>
    </Routes>
  );
}
