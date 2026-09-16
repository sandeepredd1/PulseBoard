import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import VerifyOTP from "./auth/VerifyOTP";
import ResetPassword from "./auth/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import Integrations from "./pages/Integrations";
import Support from "./pages/Support";
import AIInsights from "./pages/AIInsights";
import Profile from "./pages/Profile";

function AppRoutes() {
  return (
    <Routes>

      {/* Authentication */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Signup />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/verify-otp"
        element={<VerifyOTP />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* Main Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* Projects */}
      <Route
        path="/projects"
        element={<Projects />}
      />

      {/* Analytics */}
      <Route
        path="/analytics"
        element={<Analytics />}
      />

      {/* Customers */}
      <Route
        path="/customers"
        element={<Customers />}
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={<Settings />}
      />

      {/* Integrations */}
      <Route
        path="/integrations"
        element={<Integrations />}
      />

      {/* Support */}
      <Route
        path="/support"
        element={<Support />}
      />

      {/* AI Insights */}
      <Route
        path="/ai-insights"
        element={<AIInsights />}
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* Default */}
      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      {/* Unknown routes */}
      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}