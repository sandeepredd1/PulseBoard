const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Project title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [1000, "Project description cannot exceed 1000 characters"],
    },

    status: {
      type: String,
      enum: ["todo", "in_progress", "completed", "overdue"],
      default: "todo",
      required: true,
      index: true,
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Useful indexes for dashboard queries and user-specific project queries
projectSchema.index({ owner: 1, updatedAt: -1 });
projectSchema.index({ owner: 1, status: 1 });
projectSchema.index({ owner: 1, createdAt: 1 });
projectSchema.index({ owner: 1, dueDate: 1 });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;