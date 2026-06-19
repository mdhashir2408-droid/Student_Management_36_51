# Student Management System API

A professional, backend-only Node.js + Express.js RESTful API boilerplate for a Student Management System. Built using Node.js, Express, and MongoDB (via Mongoose), it is equipped with structured routes, schemas, and controllers designed for production-level development.

## Technologies Used
- **Node.js** - JavaScript runtime environment.
- **Express.js** - Minimalist web framework for Node.js.
- **MongoDB** - Document-based NoSQL database.
- **Mongoose** - Elegant MongoDB object modeling for Node.js.
- **JWT (jsonwebtoken)** - Token-based authentication.
- **bcryptjs** - Password hashing utility.

## Features
- **Token-Based Authentication**: Secure sign-up and sign-in operations with JSON Web Tokens.
- **Role-Based Authorization**: Restrict specific endpoints to distinct roles: `admin`, `teacher`, or `student`.
- **Student Profile Management**: Full CRUD operations for managing students.
- **Course Administration**: Admin and teacher control over course listings, details, and credits.
- **Enrollment Tracking**: Process student registrations, monitor course capacities, and store grades.
- **Structured Database Models**: Mongoose models for User, Student, Course, and Enrollment.

## Folder Structure
```
Student_management_SYS/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── studentController.js
│   ├── courseController.js
│   └── enrollmentController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Student.js
│   ├── Course.js
│   └── Enrollment.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── studentRoutes.js
│   ├── courseRoutes.js
│   └── enrollmentRoutes.js
│
├── utils/
│   └── generateToken.js
│
├── .env.example
├── .gitignore
├── README.md
├── package.json
└── server.js
```

## Environment Variables Setup
Copy the `.env.example` file to `.env` in the root folder:
```bash
cp .env.example .env
```
And populate it with your actual secrets:
- `PORT`: Port number the server will run on (Default: 5000).
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key used to sign and verify JSON Web Tokens.

## Installation & Getting Started

### Prerequisites
- Node.js installed (v16+ recommended)
- MongoDB running locally or on MongoDB Atlas

### Steps
1. Navigate to the project root directory:
   ```bash
   cd Student_management_SYS
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the application in development mode (with hot reloading via `nodemon`):
   ```bash
   npm run dev
   ```
4. Start the application in production mode:
   ```bash
   npm start
   ```

## API Modules & Endpoints

### 1. Authentication
- `POST /api/auth/register` - Register a new user profile.
- `POST /api/auth/login` - Authenticate user credentials and return a JWT.

### 2. Users
- `GET /api/users/profile` - Retrieve the currently authenticated user's profile details.
- `GET /api/users` - Fetch list of all registered users (Admin access only).

### 3. Students
- `POST /api/students` - Register a new student profile (Admin access only).
- `GET /api/students` - Get all student profiles (Admin and Teacher access only).
- `GET /api/students/:id` - Fetch student by ID.
- `PUT /api/students/:id` - Update student information (Admin and self-access).
- `DELETE /api/students/:id` - Remove a student profile (Admin access only).

### 4. Courses
- `POST /api/courses` - Create a course (Admin and Teacher access only).
- `GET /api/courses` - View all course listings.
- `GET /api/courses/:id` - Fetch detailed view of a course.
- `PUT /api/courses/:id` - Edit course parameters (Admin and Teacher access only).
- `DELETE /api/courses/:id` - Delete a course from the catalog (Admin access only).

### 5. Enrollments
- `POST /api/enrollments` - Enroll student in a course.
- `GET /api/enrollments` - Retrieve course enrollments history (Admin and Teacher access only).
- `GET /api/enrollments/:id` - Fetch detailed information about an enrollment.
- `PUT /api/enrollments/:id` - Update enrollment grade/status (Admin and Teacher access only).
- `DELETE /api/enrollments/:id` - Drop a student's course enrollment.
