require('dotenv').config();
const cron = require('node-cron');
const Task = require('../models/Task');
const User = require('../models/User');
const twilio = require('twilio');

// Twilio credentials from .env
const accountSid = process.env.accout_SID;
const authToken = process.env.auth_token;
const twilioPhoneNumber = process.env.phone_number;
const twilioVoiceUrl = process.env.voice_url;

// Twilio client
const twilioClient = new twilio(accountSid, authToken);

// Cron job for voice calling using Twilio
cron.schedule('0 12 * * *', async () => {
  try {
    const users = await User.find().sort({ priority: 1 });

    for (const user of users) {
      const tasks = await Task.find({ status: { $ne: 'DONE' } })
        .sort({ priority: -1, due_date: 1 })
        .limit(1)
        .populate('sub_tasks');

      if (tasks.length > 0) {
        const task = tasks[0];

        // Call logic using Twilio
        await twilioClient.calls.create({
          to: user.phone_number,
          from: twilioPhoneNumber,
          url: twilioVoiceUrl,
        });

        console.log(`Voice call made to ${user.phone_number} for task: ${task.title}`);
      }
    }

    console.log('Twilio calling cron job completed successfully');
  } catch (error) {
    console.error('Error in Twilio calling cron job:', error);
  }
});
