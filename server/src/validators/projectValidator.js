const allowedStatuses = ["todo", "in_progress", "completed", "overdue"];

const validateCreateProject = (req, res, next) => {
  const { title, description, status, dueDate } = req.body;

  if (!title || !String(title).trim()) {
    return res.status(400).json({
      success: false,
      message: "Project title is required",
    });
  }

  if (String(title).trim().length > 100) {
    return res.status(400).json({
      success: false,
      message: "Project title cannot exceed 100 characters",
    });
  }

  if (!description || !String(description).trim()) {
    return res.status(400).json({
      success: false,
      message: "Project description is required",
    });
  }

  if (String(description).trim().length > 1000) {
    return res.status(400).json({
      success: false,
      message: "Project description cannot exceed 1000 characters",
    });
  }

  if (status !== undefined && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project status",
    });
  }

  if (!dueDate) {
    return res.status(400).json({
      success: false,
      message: "Due date is required",
    });
  }

  if (Number.isNaN(new Date(dueDate).getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid due date",
    });
  }

  next();
};

const validateUpdateProject = (req, res, next) => {
  const { title, description, status, dueDate } = req.body;

  if (title !== undefined) {
    if (!String(title).trim()) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    if (String(title).trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "Project title cannot exceed 100 characters",
      });
    }
  }

  if (description !== undefined) {
    if (!String(description).trim()) {
      return res.status(400).json({
        success: false,
        message: "Project description is required",
      });
    }

    if (String(description).trim().length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Project description cannot exceed 1000 characters",
      });
    }
  }

  if (status !== undefined && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project status",
    });
  }

  if (dueDate !== undefined && Number.isNaN(new Date(dueDate).getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid due date",
    });
  }

  next();
};

module.exports = {
  validateCreateProject,
  validateUpdateProject,
};