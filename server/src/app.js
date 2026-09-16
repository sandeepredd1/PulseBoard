const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

/* =========================
   SECURITY
========================= */

app.use(helmet());

/* =========================
   CORS
========================= */

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/* =========================
   BODY PARSER
========================= */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* =========================
   COOKIE PARSER
========================= */

app.use(cookieParser());

/* =========================
   STATIC PROFILE IMAGES
========================= */

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

/* =========================
   AUTH ROUTES
========================= */

app.use(
  "/api/auth",
  authRoutes
);

/* =========================
   USER ROUTES
========================= */

app.use(
  "/api/user",
  userRoutes
);

/* =========================
   PROJECT ROUTES
========================= */

app.use(
  "/api/projects",
  projectRoutes
);

/* =========================
   DASHBOARD ROUTES
========================= */

app.use(
  "/api/dashboard",
  dashboardRoutes
);

/* =========================
   HEALTH CHECK
========================= */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PulseBoard API is running",
  });
});

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use(
  (err, req, res, next) => {
    console.error(
      "Server Error:",
      err
    );

    res.status(
      err.status || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Internal server error",
    });
  }
);

module.exports = app;