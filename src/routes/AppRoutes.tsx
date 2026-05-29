import { Routes, Route } from "react-router-dom";

import Register from "../pages/Register";
import PaymentReturn from "../pages/PaymentReturn";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/payment" element={<PaymentReturn />} />
    </Routes>
  );
}