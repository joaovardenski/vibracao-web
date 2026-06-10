import { Routes, Route } from "react-router-dom";

import Register from "../pages/Register";
import PaymentReturn from "../pages/PaymentReturn";
import Login from "../pages/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/payment" element={<PaymentReturn />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}