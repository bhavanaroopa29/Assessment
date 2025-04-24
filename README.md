# Todo List Application Implementation Guide

## Tech Stack
- **Frontend**: React with React Router and Context API for state management
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Styling**: CSS with responsive design

## How to Run the Application

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation Steps

1. **Unzip the files** to a directory of your choice

2. **Set up the backend**:
   ```bash
   cd todo-app/backend
   npm install
   ```

3. **Set up the frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure the database**:
   - Create a `.env` file in the backend directory
   - Add the following line:
     ```
     MONGODB_URI=mongodb://localhost:27017/todo-app
     ```
   - If using MongoDB Atlas, replace with your connection string

5. **Start the backend server**:
   ```bash
   cd ../backend
   npm start
   ```
   The backend will run on http://localhost:5000

6. **Start the frontend development server**:
   ```bash
   cd ../frontend
   npm start
   ```
   The frontend will run on http://localhost:3000

7. **Access the application** by opening http://localhost:3000 in your browser

## Features Implemented

### Todo Management
- Create new todos with titles and descriptions
- Add tags and priorities to todos (High, Medium, Low)
- Tag/mention other users in todos (@username)
- Edit existing todos
- Delete todos

### Todo Details
- Click on a todo to view its details
- Add notes to a todo via a modal

### List View Features
- List all todos with basic information
- Pagination with numbered pages
- Filter todos by tags, priority, or users
- Sort todos by creation date, priority, etc.

### Data Export (Optional Feature)
- Export all todos of a user in JSON or CSV format

### User Management (Optional Feature)
- Pre-created 5 different users
- User switching functionality
- Display of todos per user

## Application Structure

### Frontend
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── TodoForm.js
│   │   ├── TodoItem.js
│   │   ├── TodoList.js
│   │   ├── TodoDetails.js
│   │   ├── NoteModal.js
│   │   ├── FilterBar.js
│   │   ├── Pagination.js
│   │   └── UserSelector.js
│   ├── context/
│   │   └── TodoContext.js
│   ├── services/
│   │   ├── todoService.js
│   │   └── userService.js
│   ├── styles/
│   │   ├── App.css
│   │   └── components/
│   ├── utils/
│   │   └── exportUtils.js
│   ├── App.js
│   └── index.js
```

### Backend
```
backend/
├── controllers/
│   ├── todoController.js
│   └── userController.js
├── models/
│   ├── Todo.js
│   └── User.js
├── routes/
│   ├── todoRoutes.js
│   └── userRoutes.js
├── utils/
│   └── exportData.js
├── config.js
├── db.js
├── seed.js (for pre-creating users)
└── server.js
```

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos (with pagination, filter, sort)
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `POST /api/todos/:id/notes` - Add a note to a todo
- `GET /api/todos/export/:format` - Export todos (format: json or csv)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id/todos` - Get todos for a specific user

## Additional Notes

- The application includes error handling for both frontend and backend
- Responsive design ensures it works well on mobile devices
- User mentions are validated against existing users
- The code follows best practices for React and Node.js
Todo List Application Structure Overview
This Todo List app is a comprehensive task management application with a React frontend and RESTful API backend. It provides a robust set of features for managing tasks:
Key Features:

# User Management:

- Switch between different users to view and manage their todos
-Each user has their own todo collection


# Todo Management:

Create, read, update, and delete todo items
Set priority levels (High, Medium, Low)
Add tags to categorize todos
Mention other users in todos


# Note System:

- Add notes to existing todos
- View note history with timestamps


# Filtering & Sorting:

- Filter todos by priority, tags
- Sort by creation date, priority, or title
- Pagination for managing large sets of todos


# Export Functionality:
-Export todos in different formats (JSON, CSV)

# Technical Implementation:
Frontend Architecture:

- React Components: Modular UI components with clear separation of concerns
- Context API: Global state management using TodoContext
- React Router: Navigation between todo list and detail views
- Service Modules: API communication handled by service modules (todoService, userService)

# Components Structure:

- Header: App title, create todo button, export options
- UserSelector: Switch between different users
- TodoList: Display todos with filtering and pagination
- TodoItem: Individual todo display with action buttons
- TodoDetails: Detailed view of a specific todo with notes
- FilterBar: Filter and sort controls
- NoteModal: Add notes to todos
- TodoForm: Create and edit todos
- Pagination: Navigate between pages of todos
- Footer: Application footer with links

# Styling:

- Clean, modern UI with responsive design
- Priority color-coding for quick visual identification
- Modal dialogs for forms and confirmations
- Consistent use of design variables and components
