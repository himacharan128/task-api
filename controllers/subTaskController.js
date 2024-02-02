const SubTask = require('../models/SubTask');

// Create a new subtask
exports.createSubTask = async (req, res) => {
  try {
    const { task_id } = req.body;
    const subtask = new SubTask({ task_id });
    await subtask.save();
    res.status(201).json({ message: 'SubTask created successfully', subtask });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all subtasks
exports.getAllSubTasks = async (req, res) => {
  try {
    const subtasks = await SubTask.find();
    res.status(200).json(subtasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get subtask by ID
exports.getSubTaskById = async (req, res) => {
  try {
    const subtaskId = req.params.id;
    const subtask = await SubTask.findById(subtaskId);
    if (!subtask) {
      return res.status(404).json({ error: 'SubTask not found' });
    }
    res.status(200).json(subtask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update subtask by ID
exports.updateSubTaskById = async (req, res) => {
  try {
    const subtaskId = req.params.id;
    const { status } = req.body;
    const subtask = await SubTask.findByIdAndUpdate(
      subtaskId,
      { status },
      { new: true }
    );
    if (!subtask) {
      return res.status(404).json({ error: 'SubTask not found' });
    }
    res.status(200).json({ message: 'SubTask updated successfully', subtask });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete subtask by ID (soft deletion)
exports.deleteSubTaskById = async (req, res) => {
  try {
    const subtaskId = req.params.id;
    const subtask = await SubTask.findByIdAndUpdate(
      subtaskId,
      { deleted_at: new Date() },
      { new: true }
    );
    if (!subtask) {
      return res.status(404).json({ error: 'SubTask not found' });
    }
    res.status(200).json({ message: 'SubTask deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
