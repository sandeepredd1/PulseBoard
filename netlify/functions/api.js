const serverless = require("serverless-http");
const mongoose = require("mongoose");
const app = require("../../server/src/app");

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;

  console.log("MongoDB connected");
}

const handler = async (event, context) => {
  try {
    await connectDB();
    return serverless(app)(event, context);
  } catch (error) {
    console.error("Database connection error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Database connection failed",
      }),
    };
  }
};

module.exports.handler = handler;