const mongoose = require("mongoose");
const Project = require("../models/Project");

// GET /api/projects
const getProjects = async (req, res) => {
  try {
    const page = Math.max(
      parseInt(req.query.page, 10) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        parseInt(req.query.limit, 10) || 10,
        1
      ),
      100
    );

    const skip = (page - 1) * limit;

    const filter = {
      owner: req.user.userId,
    };

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Project.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

// POST /api/projects
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      dueDate,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project description is required",
      });
    }

    if (!dueDate) {
      return res.status(400).json({
        success: false,
        message: "Due date is required",
      });
    }

    const allowedStatuses = [
      "todo",
      "in_progress",
      "completed",
      "overdue",
    ];

    const projectStatus = status || "todo";

    if (!allowedStatuses.includes(projectStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project status",
      });
    }

    const project = await Project.create({
      owner: req.user.userId,
      title: title.trim(),
      description: description.trim(),
      status: projectStatus,
      dueDate,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);

    if (error.name === "ValidationError") {
      const firstError =
        Object.values(error.errors)[0];

      return res.status(400).json({
        success: false,
        message:
          firstError?.message ||
          "Invalid project data",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

// PATCH /api/projects/:id
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "status",
      "dueDate",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (
      updates.title !== undefined &&
      !String(updates.title).trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    if (
      updates.description !== undefined &&
      !String(updates.description).trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Project description is required",
      });
    }

    if (updates.title !== undefined) {
      updates.title = String(
        updates.title
      ).trim();
    }

    if (updates.description !== undefined) {
      updates.description = String(
        updates.description
      ).trim();
    }

    if (updates.status !== undefined) {
      const allowedStatuses = [
        "todo",
        "in_progress",
        "completed",
        "overdue",
      ];

      if (
        !allowedStatuses.includes(
          updates.status
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid project status",
        });
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No project fields provided",
      });
    }

    const project =
      await Project.findOneAndUpdate(
        {
          _id: id,
          owner: req.user.userId,
        },
        updates,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    if (error.name === "ValidationError") {
      const firstError =
        Object.values(error.errors)[0];

      return res.status(400).json({
        success: false,
        message:
          firstError?.message ||
          "Invalid project data",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

// DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project =
      await Project.findOneAndDelete({
        _id: id,
        owner: req.user.userId,
      });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};