const SubTask = require('../models/SubTask');
const Task=require('../models/Task');
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

// Get subtask by task_ID
exports.getSubTasksByTaskId = async (req, res) => {
  try {
    const taskId = req.params.id;
    const subtasks = await SubTask.find({ task_id: taskId });

    if (!subtasks || subtasks.length === 0) {
      return res.status(404).json({ error: 'SubTasks not found for the specified task_id' });
    }

    res.status(200).json(subtasks);
  } catch (error) {
    console.error('Error fetching subtasks by task_id:', error);
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

    // Fetch all subtasks for the parent task
    const subtasksForTask = await SubTask.find({ task_id: subtask.task_id });

    // Determine the parent task status based on subtasks
    const taskStatus =
      subtasksForTask.every(subtask => subtask.status === 1) ? 'DONE' :
      subtasksForTask.some(subtask => subtask.status === 1) ? 'IN_PROGRESS' :
      'TODO';

    // Update the parent task with the calculated status
    await Task.findByIdAndUpdate(
      subtask.task_id,
      { status: taskStatus },
      { new: true }
    );

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
