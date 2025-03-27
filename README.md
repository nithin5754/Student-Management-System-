# Student Management System API

## Overview
This is a  Student Management System API built with Express.js, TypeScript, and MongoDB Atlas. 


## Features
- Admin Panel
  - Admin login
  - Add students
  - Assign tasks to students
  - View all students
- Student Interface
  - Student login
  - View assigned tasks
  - Update task status - completed

## Prerequisites
- Node.js 
- MongoDB Atlas account
- Postman for testing

## Installation

1. Clone the repository
```bash
git clone https://github.com/nithin5754/Student-Management-System-.git
cd Student-Management-System-
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file with the following variables:
```
PORT=3000   
MONGO_URI= mongodb string 

JWT_SECRET= jwt  key
ADMIN_EMAIL= admin@admin.com
ADMIN_PASSWORD= admin
```

4. Run the application
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## API Endpoints

### Admin Endpoints
- `POST /api/v1/admin/login`
  - Login with admin credentials 
- `POST /api/v1/admin/student/add`
  - Add a new student
- `POST /api/v1/admin/task/add`
  - Assign a task to a student
 - `GET /api/v1/admin/student/all`
  - Get all the  students lists

### Student Endpoints
- `POST /api/v1/student/login`
  - Student login
  - `GET /api/v1/student/details`
  - Retrieve student's details
- `GET /api/v1/student/tasks`
  - Retrieve student's tasks
- `PATCH /api/v1/student/tasks/:taskId`
  - Update task status -completed

## Authentication
- JWT based authentication
- Token expires in 1 hour

## Default Credentials
- Admin Email: admin@admin.com
- Admin Password: admin

## Postman Documentation

```
https://documenter.getpostman.com/view/29889355/2sAYkLnww9

```
## Live Link

```
https://student-management-system-4l0z.onrender.com

```

## Deployment
- Render

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request


