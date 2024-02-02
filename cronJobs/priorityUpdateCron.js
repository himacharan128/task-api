const cron = require('node-cron');
const Task = require('../models/Task');

// Cron job to update task priorities based on due_date
cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    await Task.updateMany(
      { due_date: { $lt: today } },
      { priority: 0 }
    );

    await Task.updateMany(
      { due_date: { $gte: tomorrow, $lt: new Date(today.setDate(today.getDate() + 2)) } },
      { priority: 1 }
    );

    await Task.updateMany(
      { due_date: { $gte: new Date(today.setDate(today.getDate() + 2)), $lt: new Date(today.setDate(today.getDate() + 4)) } },
      { priority: 2 }
    );

    await Task.updateMany(
      { due_date: { $gte: new Date(today.setDate(today.getDate() + 4)) } },
      { priority: 3 }
    );

    console.log('Task priorities updated successfully');
  } catch (error) {
    console.error('Error updating task priorities:', error);
  }
});