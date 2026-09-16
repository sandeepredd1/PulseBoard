const mongoose = require("mongoose");

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        default: "Project Manager",
        trim: true,
      },

      className: {
        type: String,
        default:
          "PulseBoard Workspace",
        trim: true,
      },

      profileImage: {
        type: String,
        default: "",
      },

      resetPasswordOTP: {
        type: String,
        default: undefined,
      },

      resetPasswordOTPExpiry: {
        type: Number,
        default: undefined,
      },
    },
    {
      timestamps: true,
    }
  );

const User =
  mongoose.model(
    "User",
    userSchema
  );

module.exports = User;