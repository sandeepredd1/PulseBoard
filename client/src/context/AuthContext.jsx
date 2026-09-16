import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
  registerUser,
  updateProfileUser,
} from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("pulseboard-user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  // LOGIN
  const login = async (credentials) => {
    setLoading(true);

    try {
      const response = await loginUser(credentials);

      const loggedInUser =
        response.user ||
        response.data?.user ||
        response.data;

      if (loggedInUser) {
        setUser(loggedInUser);

        localStorage.setItem(
          "pulseboard-user",
          JSON.stringify(loggedInUser)
        );
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const register = async (userData) => {
    setLoading(true);

    try {
      const response = await registerUser(userData);

      return response;
    } finally {
      setLoading(false);
    }
  };

  // UPDATE PROFILE
  const updateProfile = async (formData) => {
    setLoading(true);

    try {
      const response = await updateProfileUser(formData);

      const updatedUser =
        response.user ||
        response.data?.user ||
        response.data;

      if (updatedUser) {
        setUser(updatedUser);

        localStorage.setItem(
          "pulseboard-user",
          JSON.stringify(updatedUser)
        );
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Clear client state even if API logout fails.
    }

    setUser(null);
    localStorage.removeItem("pulseboard-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        updateProfile,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}