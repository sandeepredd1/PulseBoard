const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = require("../models/User");

// ==========================================
// EMAIL TRANSPORTER
// ==========================================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ==========================================
// JWT
// ==========================================

const createToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ==========================================
// REGISTER
// ==========================================

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        className: user.className,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create account",
    });
  }
};

// ==========================================
// LOGIN
// ==========================================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("=================================");
    console.log("LOGIN REQUEST");
    console.log("Email:", email);
    console.log("Password received:", !!password);
    console.log("=================================");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    console.log("Normalized email:", normalizedEmail);

    const user = await User.findOne({
      email: normalizedEmail,
    });

    console.log("User found:", !!user);

    // ==========================================
    // USER NOT FOUND
    // ==========================================

    if (!user) {
      console.log("LOGIN FAILED: USER NOT FOUND");

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("User ID:", user._id);
    console.log("User email:", user.email);
    console.log("Password exists in DB:", !!user.password);

    // ==========================================
    // PASSWORD CHECK
    // ==========================================

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password match:", passwordMatches);

    if (!passwordMatches) {
      console.log("LOGIN FAILED: PASSWORD DOES NOT MATCH");

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ==========================================
    // CREATE JWT
    // ==========================================

    const token = createToken(user._id.toString());

    // ==========================================
    // SET AUTH COOKIE
    // ==========================================

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("AUTH COOKIE SET");
    console.log("LOGIN SUCCESS");
    console.log("=================================");

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        className: user.className,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to login",
    });
  }
};

// ==========================================
// LOGOUT
// ==========================================

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to logout",
    });
  }
};

// ==========================================
// FORGOT PASSWORD
// SEND OTP TO EMAIL
// ==========================================

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email address",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email address",
      });
    }

    // ========================================
    // GENERATE 6-DIGIT OTP
    // ========================================

    const otp = crypto.randomInt(100000, 1000000).toString();

    // OTP expires after 10 minutes
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = otpExpiry;

    await user.save();

    // ========================================
    // SEND EMAIL
    // ========================================

    try {
      const info = await transporter.sendMail({
        from: `"PulseBoard" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "PulseBoard Password Reset OTP",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <title>PulseBoard Password Reset</title>
            </head>

            <body
              style="
                margin:0;
                padding:0;
                background:#f5f3ff;
                font-family:Arial,Helvetica,sans-serif;
              "
            >
              <div
                style="
                  max-width:600px;
                  margin:40px auto;
                  padding:20px;
                "
              >
                <div
                  style="
                    background:#ffffff;
                    border-radius:24px;
                    padding:40px 30px;
                    text-align:center;
                    box-shadow:0 10px 40px rgba(124,58,237,0.12);
                  "
                >
                  <h1
                    style="
                      margin:0 0 10px;
                      color:#111827;
                      font-size:28px;
                    "
                  >
                    PulseBoard
                  </h1>

                  <p
                    style="
                      color:#6b7280;
                      font-size:15px;
                      line-height:1.6;
                    "
                  >
                    We received a request to reset your PulseBoard password.
                  </p>

                  <p
                    style="
                      margin-top:30px;
                      color:#374151;
                      font-size:14px;
                    "
                  >
                    Your verification code is:
                  </p>

                  <div
                    style="
                      display:inline-block;
                      margin:10px 0 20px;
                      padding:16px 28px;
                      border-radius:16px;
                      background:#f5f3ff;
                      color:#7c3aed;
                      font-size:32px;
                      font-weight:bold;
                      letter-spacing:8px;
                    "
                  >
                    ${otp}
                  </div>

                  <p
                    style="
                      color:#6b7280;
                      font-size:13px;
                      line-height:1.6;
                    "
                  >
                    This OTP is valid for 10 minutes.
                  </p>

                  <p
                    style="
                      color:#6b7280;
                      font-size:13px;
                      line-height:1.6;
                    "
                  >
                    If you did not request a password reset, you can safely
                    ignore this email.
                  </p>

                  <div
                    style="
                      margin-top:30px;
                      padding-top:20px;
                      border-top:1px solid #e5e7eb;
                      color:#9ca3af;
                      font-size:12px;
                    "
                  >
                    Secure access to your PulseBoard workspace
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      console.log("=================================");
      console.log("OTP EMAIL SENT SUCCESSFULLY");
      console.log("To:", user.email);
      console.log("Message ID:", info.messageId);
      console.log("=================================");
    } catch (emailError) {
      console.error("=================================");
      console.error("OTP EMAIL ERROR");
      console.error("Code:", emailError.code);
      console.error("Command:", emailError.command);
      console.error("Response:", emailError.response);
      console.error("Message:", emailError.message);
      console.error("=================================");

      return res.status(500).json({
        success: false,
        message: "Unable to send OTP. Please check email configuration.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP has been sent to your email address",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process forgot password request",
    });
  }
};

// ==========================================
// VERIFY OTP
// ==========================================

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.resetPasswordOTP || !user.resetPasswordOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: "No OTP request found. Please request a new OTP.",
      });
    }

    if (Date.now() > user.resetPasswordOTPExpiry) {
      user.resetPasswordOTP = undefined;
      user.resetPasswordOTPExpiry = undefined;

      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    if (user.resetPasswordOTP !== otp.toString().trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please check and try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify OTP",
    });
  }
};

// ==========================================
// RESET PASSWORD
// ==========================================

const resetPassword = async (req, res) => {
  try {
    const {
      email,
      otp,
      password,
      confirmPassword,
    } = req.body;

    if (
      !email ||
      !otp ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      !user.resetPasswordOTP ||
      !user.resetPasswordOTPExpiry
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password reset session is invalid. Please request a new OTP.",
      });
    }

    if (Date.now() > user.resetPasswordOTPExpiry) {
      user.resetPasswordOTP = undefined;
      user.resetPasswordOTPExpiry = undefined;

      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    if (user.resetPasswordOTP !== otp.toString().trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    // Clear OTP after successful reset
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password",
    });
  }
};

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
};