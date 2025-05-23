# Task Management Application Documentation
## Project Overview
This application is a RESTful API designed for managing tasks and users. It allows users to create, read, update, and delete tasks, as well as manage user accounts. The application uses Node.js, Express, and MongoDB.
**Key Features:**
*   User authentication and authorization.
*   Task management (create, read, update, delete).
*   User management (create, read, login).
*   Task filtering and pagination.
**Requirements:**
*   Node.js (version 14 or higher)
*   MongoDB
## Getting Started
### Installation
1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```
    
2.  **Navigate to the project directory:**
    ```bash
    cd TaskManagement
    ```
    
3.  **Install dependencies:**
    ```bash
    npm install
    ```
    
4.  **Configure environment variables:**
    *   Create a `.env` file in the root directory.
    *   Add the following variables, replacing the values with your own:
                PORT=3000
        MONGO_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_jwt_secret>
        ```
        
### Running the Application
1.  **Start the server:**
    ```bash
    npm run dev # For development with nodemon
    # OR
    npm start # For production
    ```
    
    The server will start on the port specified in the `.env` file (default: 3000).
## Code Structure
TaskManagement/
├── controllers/
│   ├── task.controller.js  # Handles task-related logic
│   └── user.controller.js  # Handles user-related logic
├── middleware/
│   └── auth.js             # Authentication middleware
├── models/
│   ├── task.model.js       # Task data model
│   └── user.model.js       # User data model
├── routes/
│   ├── task.routes.js      # Task API routes
│   └── user.routes.js      # User API routes
├── .gitignore              # Specifies intentionally untracked files that Git should ignore
├── index.js                # Main application entry point
└── package.json            # Project dependencies and scripts
**Key Components:**
*   **`index.js`:**  The main entry point of the application. It initializes the Express app, connects to the MongoDB database, and registers the routes.
*   **`controllers`:** Contains the logic for handling requests and interacting with the models.
*   **`middleware`:** Contains middleware functions, such as authentication.
*   **`models`:** Defines the data models for users and tasks using Mongoose.
*   **`routes`:** Defines the API endpoints and maps them to the corresponding controller functions.
## API Documentation
### User API
#### POST /api/users
*   **Description:** Creates a new user.
*   **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
    
*   **Response (201 Created):**
    ```json
    {
      "_id": "64b0b0b0b0b0b0b0b0b0b0b0",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2024-07-14T00:00:00.000Z",
      "updatedAt": "2024-07-14T00:00:00.000Z",
      "__v": 0
    }
    ```
    
*   **Response (400 Bad Request):**
    ```json
    {
      "errors": [
        {
          "location": "body",
          "msg": "Name is required",
          "param": "name"
        }
      ]
    }
    ```
    
#### POST /api/users/login
*   **Description:** Logs in an existing user.
*   **Request Body:**
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
    
*   **Response (200 OK):**
    ```json
    {
      "user": {
        "_id": "64b0b0b0b0b0b0b0b0b0b0b0",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "createdAt": "2024-07-14T00:00:00.000Z",
        "updatedAt": "2024-07-14T00:00:00.000Z",
        "__v": 0
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGIwYjBiMGIwYjBiMGIwYjBiMGIwMCIsImlhdCI6MTY4OTMzNDQwMCwiZXhwIjoxNjg5OTM5MjAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
    ```
    
*   **Response (400 Bad Request):**
    ```json
    {
      "error": "Invalid login"
    }
    ```
    
#### GET /api/users/:id
*   **Description:** Gets a user by ID.
*   **Request Headers:**
    *   `Authorization: Bearer <token>`
*   **Path Parameters:**
    *   `id`: The ID of the user.
*   **Response (200 OK):**
    ```json
    {
      "_id": "64b0b0b0b0b0b0b0b0b0b0b0",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2024-07-14T00:00:00.000Z",
      "updatedAt": "2024-07-14T00:00:00.000Z",
      "__v": 0
    }
    ```
    
*   **Response (404 Not Found):**
    ```json
    {}
    ```
    
#### GET /api/users
*   **Description:** Gets all users.
*   **Request Headers:**
    *   `Authorization: Bearer <token>`
*   **Response (200 OK):**
    ```json
    [
      {
        "_id": "64b0b0b0b0b0b0b0b0b0b0b0",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "createdAt": "2024-07-14T00:00:00.000Z",
        "updatedAt": "2024-07-14T00:00:00.000Z",
        "__v": 0
      },
      {
        "_id": "64b0b0b0b0b0b0b0b0b0b0b1",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "createdAt": "2024-07-14T00:00:00.000Z",
        "updatedAt": "2024-07-14T00:00:00.000Z",
        "__v": 0
      }
    ]
    ```
    
### Task API
#### POST /api/tasks
*   **Description:** Creates a new task.
*   **Request Headers:**
    *   `Authorization: Bearer <token>`
*   **Request Body:**
    ```json
    {
      "title": "Grocery Shopping",
      "description": "Buy groceries for the week",
      "dueDate": "2024-07-20T00:00:00.000Z",
      "assignedUserId": "64b0b0b0b0b0b0b0b0b0b0b0"
    }
    ```
    
*   **Response (201 Created):**
    ```json
    {
      "_id": "64b0b0b0b0b0b0b0b0b0b0b2",
      "title": "Grocery Shopping",
      "description": "Buy groceries for the week",
      "dueDate": "2024-07-20T00:00:00.000Z",
      "status": "pending",
      "assignedUserId": "64b0b0b0b0b0b0b0b0b0b0b0",
      "createdAt": "2024-07-14T00:00:00.000Z",
      "updatedAt": "2024-07-14T00:00:00.000Z",
      "__v": 0
    }
    ```
    
*   **Response (400 Bad Request):**
    ```json
    {
      "errors": [
        {
          "location": "body",
          "msg": "Title is required",
          "param": "title"
        }
      ]
    }
    ```
    
#### GET /api/tasks/:id
*   **Description:** Gets a task by ID.
*   **Request Headers:**
    *   `Authorization: Bearer <token>`
*   **Path Parameters:**
    *   `id`: The ID of the task.
*   **Response (200 OK):**
    ```json
    {
      "_id": "64b0b0b0b0b0b0b0b0b0b0b2",
      "title": "Grocery Shopping",
      "description": "Buy groceries for the week",
      "dueDate": "2024-07-20T00:00:00.000Z",
      "status": "pending",
      "assignedUserId": {
        "_id": "64b0b0b0b0b0b0b0b0b0b0b0",
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "createdAt": "2024-07-14T00:00:00.000Z",
      "updatedAt": "2024-07-14T00:00:00.000Z",
      "__v": 0
    }
    ```
    
*   **Response (404 Not Found):**
    ```json
    {}
    ```
    
#### GET /api/tasks
*   **Description:** Gets all tasks with optional filtering and pagination.
*   **Request Headers:**
    *   `Authorization: Bearer <token>`
*   **Query Parameters:**
    *   `status`: Filter tasks by status (e.g., `pending`, `in-progress`, `completed`).
    *   `assignedUserId`: Filter tasks by assigned user ID.
    *   `page`: The page number (default: 1).
    *   `limit`: The number of tasks per page (default: 10).
*   **Response (200 OK):**
    ```json
    {
      "total": 25,
      "page": 2,
      "pages": 3,
      "tasks": [
        {
          "_id": "64b0b0b0b0b0b0b0b0b0b0b3",
          "title": "Task 11",
          "description": "Description for task 11",
          "dueDate": "2024-07-25T00:00:00.000Z",
          "status": "in-progress",
          "assignedUserId": {
            "_id": "64b0b0b0b0b0b0b0b0b0b0b0",
            "name": "John Doe",
            "email": "john.doe@example.com"
          },
          "createdAt": "2024-07-14T00:00:00.000Z",
          "updatedAt": "2024-07-14T00:00:00.000Z",
          "__v": 0
        },
        {
          "_id": "64b0b0b0b0b0b0b0b0b0b0b4",
          "title": "Task 12",
          "description": "Description for task 12",
          "dueDate": "2024-07-26T00:00:00.000Z",
          "status": "completed",
          "assignedUserId": {
            "_id": "64b0b0b0b0b0b0b0b0b0b0b1",
            "name": "Jane Smith",
            "email": "jane.smith@example.com"
          },
          "createdAt": "2024-07-14T00:00:00.000Z",
          "updatedAt": "2024-07-14T00:00:00.000Z",
          "__v": 0
        }
      ]
    }
    ```
    
#### PUT /api/tasks/:id
*   **Description:** Updates a task.
*   **Request Headers:**
    *   `Authorization: Bearer <token>`
*   **Path Parameters:**
    *   `id`: The ID of the task.
*   **Request Body:**
    ```json
    {
      "status": "completed"
    }
    ```
    
*   **Response (200 OK):**
    ```json
    {
      "_id": "64b0b0b0b0b0b0b0b0b0b0b2",
      "title": "Grocery Shopping",
      "description": "Buy groceries for the week",
      "dueDate": "2024-07-20T00:00:00.000Z",
      "status": "completed",
      "assignedUserId": "64b0b0b0b0b0b0b0b0b0b0b0",
      "createdAt": "2024-07-14T00:00:00.000Z",
      "updatedAt": "2024-07-14T00:00:00.000Z",
      "__v": 0
    }
    ```
    
*   **Response (404 Not Found):**
    ```json
    {}
    ```
    
#### DELETE /api/tasks/:id
*   **Description:** Deletes a task.
*   **Request Headers:**
    *   `Authorization: Bearer <token>`
*   **Path Parameters:**
    *   `id`: The ID of the task.
*   **Response (200 OK):**
    ```json
    {}
    ```
    
*   **Response (404 Not Found):**
    ```json
    {}
    ```
    

