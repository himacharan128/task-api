# Task Management System

## Overview

Welcome to the Task Management System! This application provides a simple and effective way to manage tasks and subtasks. It includes user authentication, task creation, subtask creation, and various APIs for task and subtask management. Additionally, the system utilizes cron jobs for automated processes such as changing task priorities and initiating voice calls using Twilio.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Cron Jobs](#cron-jobs)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication
- Task Creation and Management
- Subtask Creation and Management
- Task Priority Update based on Due Date
- Voice Calling using Twilio for Overdue Tasks
- Soft Deletion of Tasks and Subtasks

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Twilio (for voice calling)
- Node-cron (for cron jobs)
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/himacharan128/task-api.git
2. Install dependencies:
   ```bash
   cd task-management-system
   npm install
3. Set up environment variables:
   ```bash
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    TWILIO_VOICE_URL=your_twilio_voice_url
4. Start the server:
   ```bash
   node index.js
## Usage

Visit http://localhost:3000 in your web browser to access the Task Management System.

## API Documentation

### Create Task API

- **POST** `http://localhost:3000/api/tasks`
- JWT Token
- Request Body:
  ```json
  {
    "title": "new task",
    "description": "task description",
    "due_date": "2024-02-04",
    "priority": 1,
    "status": "TODO"
  }
###   Create Subtask API
- **Post** `http://localhost:3000/api/subtasks`
- Request Body:
  ```json
    {
    "task_id": "65bd614ad409d679d7a92553"
    }
### Get All User Tasks API
- **Get** `http://localhost:3000/api/tasks`
### Get All User Subtasks API
- **Get** `http://localhost:3000/api/subtasks/:subtask-id`
### Update Task API
- **Put** `http://localhost:3000/api/tasks/:task-id`
- Request Body:
  ```json
    {
    "due_date": "2024-02-15",
    "status": "IN_PROGRESS"
    }
### Update Subtask API
- **Put** `http://localhost:3000/api/subtasks/:subtask-id`
- Request Body:
  ```json
    {
    "status": 1
    }
### Delete Task API
- **Delete** `http://localhost:3000/api/tasks/:task-id`
### Delete Subtask API
- **Delete** `http://localhost:3000/api/subtasks/:subtask-id`


## Cron Jobs
### Priority Update Cron Job:
- Schedule: Runs daily at midnight.
- Purpose: Updates task priorities based on due dates.
### Twilio Calling Cron Job:
- Schedule: Runs daily at 12:00 PM.
- Purpose: Initiates voice calls to users based on task priority.

## Contributing
Contributions are welcome! Feel free to submit issues and pull requests.
## License
This project is licensed under the MIT License.
