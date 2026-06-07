import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/customer/Dashboard.tsx";
import Orders from "./pages/customer/Orders.tsx";
import PaymentWindow from "./pages/customer/payment-window.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/payment-window" element={<PaymentWindow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;