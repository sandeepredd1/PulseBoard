import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";
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
import { canAccessRoute } from "./utils/routeAccess";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-200">
        Checking your session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-200">
        Loading your workspace...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function RedirectHome() {
  const { isAuthenticated } = useAuth();

  return (
    <Navigate
      to={isAuthenticated ? "/dashboard" : "/login"}
      replace
    />
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Authentication */}
      <Route
        path="/login"
        element={<PublicRoute><Login /></PublicRoute>}
      />

      <Route
        path="/register"
        element={<PublicRoute><Signup /></PublicRoute>}
      />

      <Route
        path="/signup"
        element={<PublicRoute><Signup /></PublicRoute>}
      />

      <Route
        path="/forgot-password"
        element={<PublicRoute><ForgotPassword /></PublicRoute>}
      />

      <Route
        path="/verify-otp"
        element={<PublicRoute><VerifyOTP /></PublicRoute>}
      />

      <Route
        path="/reset-password"
        element={<PublicRoute><ResetPassword /></PublicRoute>}
      />

      {/* Main Dashboard */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />

      {/* Projects */}
      <Route
        path="/projects"
        element={<ProtectedRoute><Projects /></ProtectedRoute>}
      />

      {/* Analytics */}
      <Route
        path="/analytics"
        element={<ProtectedRoute><Analytics /></ProtectedRoute>}
      />

      {/* Customers */}
      <Route
        path="/customers"
        element={<ProtectedRoute><Customers /></ProtectedRoute>}
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={<ProtectedRoute><Settings /></ProtectedRoute>}
      />

      {/* Integrations */}
      <Route
        path="/integrations"
        element={<ProtectedRoute><Integrations /></ProtectedRoute>}
      />

      {/* Support */}
      <Route
        path="/support"
        element={<ProtectedRoute><Support /></ProtectedRoute>}
      />

      {/* AI Insights */}
      <Route
        path="/ai-insights"
        element={<ProtectedRoute><AIInsights /></ProtectedRoute>}
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={<ProtectedRoute><Profile /></ProtectedRoute>}
      />

      {/* Default */}
      <Route
        path="/"
        element={<RedirectHome />}
      />

      {/* Unknown routes */}
      <Route
        path="*"
        element={
          <Navigate
            to={canAccessRoute({ isAuthenticated, path: "/dashboard" }) ? "/dashboard" : "/login"}
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