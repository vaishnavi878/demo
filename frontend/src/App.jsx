import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/transfer"
          element={<Transfer />}
        />

        <Route
          path="/transactions"
        element={<Transactions />}
        />

        <Route
          path="/accounts"
          element={<Accounts />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;