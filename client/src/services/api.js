const API_URL = import.meta.env.VITE_API_URL || "/api";

/* =========================
   TOKEN HELPERS
========================= */

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("authToken") ||
    null
  );
};

const saveToken = (data) => {
  const token =
    data?.token ||
    data?.accessToken ||
    data?.data?.token ||
    data?.data?.accessToken ||
    null;

  if (token) {
    localStorage.setItem("token", token);
  }

  return token;
};

const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("authToken");
};

/* =========================
   API REQUEST
========================= */

async function request(endpoint, options = {}) {
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  const token = getToken();

  const headers = {
    ...(isFormData
      ? {}
      : {
          "Content-Type": "application/json",
        }),
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers,
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("API Request Error:", {
      endpoint,
      url: `${API_URL}${endpoint}`,
      error,
    });

    if (
      error instanceof TypeError ||
      error?.message === "Failed to fetch"
    ) {
      throw new Error(
        "Unable to connect to the server. Please check that the backend is running."
      );
    }

    throw error;
  }
}

/* =========================
   AUTH
========================= */

export const registerUser = (userData) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const loginUser = async (credentials) => {
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  saveToken(data);

  return data;
};

export const logoutUser = async () => {
  try {
    const data = await request("/auth/logout", {
      method: "POST",
    });

    clearToken();

    return data;
  } catch (error) {
    clearToken();
    throw error;
  }
};

export const forgotPassword = (email) =>
  request("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });

export const verifyOTP = (email, otp) =>
  request("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({
      email,
      otp,
    }),
  });

export const resetPassword = (
  email,
  otp,
  password,
  confirmPassword
) =>
  request("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({
      email,
      otp,
      password,
      confirmPassword,
    }),
  });

/* =========================
   USER / PROFILE
========================= */

export const updateProfileUser = (formData) =>
  request("/user/profile", {
    method: "PUT",
    body: formData,
  });

/* =========================
   DASHBOARD
========================= */

export const getDashboardSummary = (year = null) => {
  const query =
    year !== null && year !== undefined
      ? `?year=${encodeURIComponent(year)}`
      : "";

  return request(`/dashboard/summary${query}`);
};

/* =========================
   PROJECTS
========================= */

export const getProjects = (page = 1, limit = 10) =>
  request(`/projects?page=${page}&limit=${limit}`);

export const getProject = (id) =>
  request(`/projects/${id}`);

export const createProject = (project) =>
  request("/projects", {
    method: "POST",
    body: JSON.stringify(project),
  });

export const updateProject = (id, project) =>
  request(`/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify(project),
  });

export const deleteProject = (id) =>
  request(`/projects/${id}`, {
    method: "DELETE",
  });

/* =========================
   HEALTH CHECK
========================= */

export const healthCheck = () =>
  request("/health");

/* =========================
   DEFAULT EXPORT
========================= */

export default {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
  updateProfileUser,
  getDashboardSummary,
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  healthCheck,
};