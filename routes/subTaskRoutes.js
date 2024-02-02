const express = require('express');
const router = express.Router();
const subTaskController = require('../controllers/subTaskController');
const authMiddleware = require('../middleware/authenticationMiddleware.js');

// Create a new subtask
router.post('/subtasks', subTaskController.createSubTask);

// Get all subtasks
router.get('/subtasks', subTaskController.getAllSubTasks);

// Get subtask by ID
router.get('/subtasks/:id', subTaskController.getSubTaskById);

// Update subtask by ID
router.put('/subtasks/:id', subTaskController.updateSubTaskById);

// Delete subtask by ID (soft deletion)
router.delete('/subtasks/:id', subTaskController.deleteSubTaskById);

module.exports = router;
