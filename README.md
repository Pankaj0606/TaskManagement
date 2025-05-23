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
    git clone https://github.com/Pankaj0606/TaskManagement
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
      ```bash
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
```text
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
```
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
          "name": "Pankaj",
          "email": "21cs3031@rgipt.ac.in",
          "password": "mySecurePass123"
    }
    ```
    <img width="397" alt="Screenshot 2025-05-23 at 8 49 56 PM" src="https://github.com/user-attachments/assets/583e2c4e-5b07-4fdc-bea6-a183be43d813" />

    
*   **Response (201 Created):**
    ```json
    {
        "_id": "683092116036d159b890b66d",
        "name": "Pankaj",
        "email": "21cs3031@rgipt.ac.in",
        "password": "$2b$08$aVm6ztXYWrFzdm3RCoAQ9u82QQsAxFjN1nV5saG98VbdnArZIosui",
        "createdAt": "2025-05-23T15:19:45.805Z",
        "updatedAt": "2025-05-23T15:19:45.805Z",
        "__v": 0
    }
    ```
    <img width="682" alt="Screenshot 2025-05-23 at 8 50 25 PM" src="https://github.com/user-attachments/assets/ae518471-a8bd-4f45-bdff-cd08fd2da6d1" />

*   **Response (400 Bad Request):**
    ```json
    {
        "errors": {
            "name": {
                "name": "ValidatorError",
                "message": "Path `name` is required.",
                "properties": {
                    "message": "Path `name` is required.",
                    "type": "required",
                    "path": "name"
                },
                "kind": "required",
                "path": "name"
            }
        },
        "_message": "User validation failed",
        "name": "ValidationError",
        "message": "User validation failed: name: Path `name` is required."
    }
    ```
    <img width="651" alt="Screenshot 2025-05-23 at 8 51 05 PM" src="https://github.com/user-attachments/assets/bdea1dbf-3a65-4331-af0e-6a10e94c3aa4" />

    
#### POST /api/users/login
*   **Description:** Logs in an existing user.
*   **Request Body:**
    ```json
    {
      "email": "21cs3031@rgipt.ac.in",
      "password": "mySecurePass123"
    }
    ```
    <img width="400" alt="Screenshot 2025-05-23 at 8 53 10 PM" src="https://github.com/user-attachments/assets/15d5d4be-a6e9-42d6-9bcd-81a66ffa2503" />

*   **Response (200 OK):**
    ```json
    {
        "user": {
            "_id": "683092116036d159b890b66d",
            "name": "Pankaj",
            "email": "21cs3031@rgipt.ac.in",
            "password": "$2b$08$aVm6ztXYWrFzdm3RCoAQ9u82QQsAxFjN1nV5saG98VbdnArZIosui",
            "createdAt": "2025-05-23T15:19:45.805Z",
            "updatedAt": "2025-05-23T15:19:45.805Z",
            "__v": 0
        },
        "token":
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODMwOTIxMTYwMzZkMTU5Yjg5MGI2NmQiLCJpYXQiOjE3NDgwMTM3NzksImV4cCI6MTc0ODYxODU3OX0.FoL_f5dJ7c0p1emmp05qneH4JWy1vOMIdwnEb1Ds1WQ"
    }
    ```
    <img width="797" alt="Screenshot 2025-05-23 at 8 53 51 PM" src="https://github.com/user-attachments/assets/dc1323a3-e601-49b2-b5a6-8b5199aab951" />

*   **Response (400 Bad Request):**
    ```json
    {
      "error": "Invalid login"
    }
    ```
    <img width="536" alt="Screenshot 2025-05-23 at 8 54 34 PM" src="https://github.com/user-attachments/assets/08daf8ac-8c66-4255-b3ca-f3d441bf006e" />

    
#### GET /api/users/:id
*   **Description:** Gets a user by ID.
*   **Request Headers:**
    *   `Authorization: Bearer <token>`
*   **Path Parameters:**
    *   `id`: The ID of the user.
      <img width="576" alt="Screenshot 2025-05-23 at 9 48 45 PM" src="https://github.com/user-attachments/assets/318a4888-b99f-4671-86a2-ffc41e3c816e" />

*   **Response (200 OK):**
    ```json
    {
        "_id": "683092116036d159b890b66d",
        "name": "Pankaj",
        "email": "21cs3031@rgipt.ac.in",
        "password": "$2b$08$aVm6ztXYWrFzdm3RCoAQ9u82QQsAxFjN1nV5saG98VbdnArZIosui",
        "createdAt": "2025-05-23T15:19:45.805Z",
        "updatedAt": "2025-05-23T15:19:45.805Z",
        "__v": 0
    }
    ```
    <img width="658" alt="Screenshot 2025-05-23 at 9 49 05 PM" src="https://github.com/user-attachments/assets/86c65d29-52b5-4d14-8894-7a861985ba32" />

    
*   **Response (404 Not Found):**
    ```json
    {}
    ```
    <img width="603" alt="Screenshot 2025-05-23 at 9 49 44 PM" src="https://github.com/user-attachments/assets/5a0dccba-ac88-4ae4-b04b-407acd62367d" />

#### GET /api/users
*   **Description:** Gets all users.
*   **Request Headers:**
    *   `Authorization: Bearer <token>`
*   **Response (200 OK):**
    ```json
    [
    {
        "_id": "68308a46d378e61842bcbf4d",
        "name": "awsd",
        "email": "mail@mail.com",
        "password": "$2b$08$sP3CdcZbfIFS.jKMj2M06u.tWkZz7gmtxVKI3lFqWsAzDKreV6ieW",
        "createdAt": "2025-05-23T14:46:30.673Z",
        "updatedAt": "2025-05-23T14:46:30.673Z",
        "__v": 0
    },
    {
        "_id": "683092116036d159b890b66d",
        "name": "Pankaj",
        "email": "21cs3031@rgipt.ac.in",
        "password": "$2b$08$aVm6ztXYWrFzdm3RCoAQ9u82QQsAxFjN1nV5saG98VbdnArZIosui",
        "createdAt": "2025-05-23T15:19:45.805Z",
        "updatedAt": "2025-05-23T15:19:45.805Z",
        "__v": 0
    }
    ]
    ```
    <img width="678" alt="Screenshot 2025-05-23 at 9 51 57 PM" src="https://github.com/user-attachments/assets/ee5b641c-c011-416f-8e32-47ff6e81a0d6" />

    
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
      "dueDate": "2025-05-25",
      "assignedUserId": "683092116036d159b890b66d"
    }
    ```
    <img width="469" alt="Screenshot 2025-05-23 at 9 54 46 PM" src="https://github.com/user-attachments/assets/319802dd-66f7-4bfe-8ce8-56f41917940b" />

*   **Response (201 Created):**
    ```json
    {
        "title": "Grocery Shopping",
        "description": "Buy groceries for the week",
        "dueDate": "2025-05-25T00:00:00.000Z",
        "status": "pending",
        "assignedUserId": "683092116036d159b890b66d",
        "_id": "6830a1456036d159b890b67a",
        "createdAt": "2025-05-23T16:24:37.530Z",
        "updatedAt": "2025-05-23T16:24:37.530Z",
        "__v": 0
    }
    ```
    <img width="527" alt="Screenshot 2025-05-23 at 9 55 34 PM" src="https://github.com/user-attachments/assets/9a757d53-acef-4644-be10-0db2dc41a249" />
    
*   **Response (400 Bad Request):**
    ```json
    {
        "errors": {
            "title": {
                "name": "ValidatorError",
                "message": "Path `title` is required.",
                "properties": {
                    "message": "Path `title` is required.",
                    "type": "required",
                    "path": "title"
                },
                "kind": "required",
                "path": "title"
            }
        },
        "_message": "Task validation failed",
        "name": "ValidationError",
        "message": "Task validation failed: title: Path `title` is required."
    }
    ```
    <img width="646" alt="Screenshot 2025-05-23 at 9 56 13 PM" src="https://github.com/user-attachments/assets/a3fb834f-5b98-47d7-9ea7-427c071c9a20" />

    
#### GET /api/tasks/:id
*   **Description:** Gets a task by ID.
*   **Request Headers:**
    *   `Authorization: Bearer <token>`
*   **Path Parameters:**
    *   `id`: The ID of the task.
*   **Response (200 OK):**
    ```json
    {
        "_id": "6830a1456036d159b890b67a",
        "title": "Grocery Shopping",
        "description": "Buy groceries for the week",
        "dueDate": "2025-05-25T00:00:00.000Z",
        "status": "pending",
        "assignedUserId": {
            "_id": "683092116036d159b890b66d",
            "name": "Pankaj",
            "email": "21cs3031@rgipt.ac.in"
        },
        "createdAt": "2025-05-23T16:24:37.530Z",
        "updatedAt": "2025-05-23T16:24:37.530Z",
        "__v": 0
    }
    ```
    <img width="591" alt="Screenshot 2025-05-23 at 9 58 49 PM" src="https://github.com/user-attachments/assets/b24c5e99-3b1c-4c98-af06-d72a3dd9f8c5" />

    
*   **Response (404 Not Found):**
    ```json
    {}
    ```
    <img width="594" alt="Screenshot 2025-05-23 at 9 59 56 PM" src="https://github.com/user-attachments/assets/22b7f90b-707e-47c9-a305-006df342628b" />

    
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
        "total": 3,
        "page": 1,
        "pages": 1,
        "tasks": [
            {
                "_id": "68307fe803c9fa82ab27ea5e",
                "title": "Project",
                "description": "Finish task management backend",
                "dueDate": "2025-05-23T00:00:00.000Z",
                "status": "pending",
                "assignedUserId": {
                    "_id": "683078d903c9fa82ab27ea48",
                    "name": "Pankaj",
                    "email": "test@example.com"
                },
                "createdAt": "2025-05-23T14:02:16.734Z",
                "updatedAt": "2025-05-23T14:02:16.734Z",
                "__v": 0
            },
            {
                "_id": "6830802403c9fa82ab27ea61",
                "title": "Project",
                "description": "Finish task management backend",
                "dueDate": "2025-05-23T00:00:00.000Z",
                "status": "pending",
                "assignedUserId": null,
                "createdAt": "2025-05-23T14:03:16.913Z",
                "updatedAt": "2025-05-23T14:03:16.913Z",
                "__v": 0
            },
            {
                "_id": "6830a1456036d159b890b67a",
                "title": "Grocery Shopping",
                "description": "Buy groceries for the week",
                "dueDate": "2025-05-25T00:00:00.000Z",
                "status": "pending",
                "assignedUserId": {
                    "_id": "683092116036d159b890b66d",
                    "name": "Pankaj",
                    "email": "21cs3031@rgipt.ac.in"
                },
                "createdAt": "2025-05-23T16:24:37.530Z",
                "updatedAt": "2025-05-23T16:24:37.530Z",
                "__v": 0
            }
        ]
    }
    ```
    <img width="580" alt="Screenshot 2025-05-23 at 10 00 36 PM" src="https://github.com/user-attachments/assets/85f6f1cf-3217-4e28-8660-667f5db39f38" />

    
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
        "_id": "6830a1456036d159b890b67a",
        "title": "Grocery Shopping",
        "description": "Buy groceries for the week",
        "dueDate": "2025-05-25T00:00:00.000Z",
        "status": "completed",
        "assignedUserId": "683092116036d159b890b66d",
        "createdAt": "2025-05-23T16:24:37.530Z",
        "updatedAt": "2025-05-23T16:32:10.338Z",
        "__v": 0
    }
    ```
    <img width="596" alt="Screenshot 2025-05-23 at 10 02 19 PM" src="https://github.com/user-attachments/assets/431201d3-dbb1-4fd6-927e-fb0fbb6daa2e" />
    
*   **Response (404 Not Found):**
    ```json
    {}
    ```
    <img width="600" alt="Screenshot 2025-05-23 at 10 03 18 PM" src="https://github.com/user-attachments/assets/a34861e3-c4a7-4a87-b46f-f4ee9589ffc8" />

    
#### DELETE /api/tasks/:id
*   **Description:** Deletes a task.
*   **Request Headers:**
    *   `Authorization: Bearer <token>`
*   **Path Parameters:**
    *   `id`: The ID of the task.
*   **Response (200 OK):**
    ```json
    {
        "_id": "6830a1456036d159b890b67a",
        "title": "Grocery Shopping",
        "description": "Buy groceries for the week",
        "dueDate": "2025-05-25T00:00:00.000Z",
        "status": "completed",
        "assignedUserId": "683092116036d159b890b66d",
        "createdAt": "2025-05-23T16:24:37.530Z",
        "updatedAt": "2025-05-23T16:32:10.338Z",
        "__v": 0
    }
    ```
    <img width="603" alt="Screenshot 2025-05-23 at 10 03 49 PM" src="https://github.com/user-attachments/assets/f7b5a2e1-16f7-4a12-98cb-d7dadd9e5e4c" />

    
*   **Response (404 Not Found):**
    ```json
    {}
    ```
    <img width="619" alt="Screenshot 2025-05-23 at 10 04 19 PM" src="https://github.com/user-attachments/assets/87c11f64-4621-4d85-ac96-ed151a3685d3" />

    

