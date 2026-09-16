const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    // Check authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Find logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update name
    if (req.body.name !== undefined) {
      user.name = req.body.name.trim();
    }

    // Update email
    if (req.body.email !== undefined) {
      user.email = req.body.email.trim().toLowerCase();
    }

    // Update role
    if (req.body.role !== undefined) {
      user.role = req.body.role;
    }

    // Update class/workspace name
    if (req.body.className !== undefined) {
      user.className = req.body.className;
    }

    // Update profile image
    if (req.file) {
      user.profileImage = `/uploads/profile/${req.file.filename}`;
    }

    // Save changes to MongoDB
    const updatedUser = await user.save();

    // Return updated user
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",

      user: {
        id: updatedUser._id,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        className: updatedUser.className,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    // Duplicate email
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

module.exports = {
  updateProfile,
};