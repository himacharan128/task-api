const Task = require('../models/Task');
const SubTask = require('../models/SubTask');
const jwt = require('jsonwebtoken');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    // Extract user_id from JWT token
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Authorization token not provided' });
    }

    const decoded = jwt.verify(token.replace('Bearer ', ''), 'secret');
    const user_id = decoded.user_id;

    // Now user_id can be used in your task creation logic

    const { title, description, due_date, priority, status } = req.body;
    const task = new Task({ title, description, due_date, priority, status, user_id });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update task by ID
exports.updateTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { due_date, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { due_date, status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete task by ID (soft deletion)
exports.deleteTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Soft delete the task
    const task = await Task.findByIdAndUpdate(
      taskId,
      { deleted_at: new Date() },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Soft delete all associated subtasks
    await SubTask.updateMany(
      { task_id: taskId },
      { deleted_at: new Date() }
    );

    res.status(200).json({ message: 'Task and associated subtasks deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};