const express = require("express");

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

const {
  validateCreateProject,
  validateUpdateProject,
} = require("../validators/projectValidator");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getProjects);

router.post("/", validateCreateProject, createProject);

router.patch("/:id", validateUpdateProject, updateProject);

router.delete("/:id", deleteProject);

module.exports = router;