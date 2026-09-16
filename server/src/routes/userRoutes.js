const express = require("express");

const {
  updateProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const router = express.Router();

// Update user profile
router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);

module.exports = router;