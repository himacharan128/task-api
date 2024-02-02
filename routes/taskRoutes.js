const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authenticationMiddleware.js');

// Create a new task
router.post('/tasks', taskController.createTask);

// Get all tasks
router.get('/tasks', taskController.getAllTasks);

// Get task by ID
router.get('/tasks/:id', taskController.getTaskById);

// Update task by ID
router.put('/tasks/:id', taskController.updateTaskById);

// Delete task by ID (soft deletion)
router.delete('/tasks/:id', taskController.deleteTaskById);

module.exports = router;
