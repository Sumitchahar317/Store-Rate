import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ChangePass from "./pages/ChangePass";
import UserStoreList from "./pages/UserStoreList";
import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Normal User Stores Explorer */}
          <Route
            path="/stores"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <UserStoreList />
              </ProtectedRoute>
            }
          />

          {/* Store Owner Dashboard */}
          <Route
            path="/owner"
            element={
              <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Console */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Change Password (accessible to all authenticated users) */}
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePass />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
