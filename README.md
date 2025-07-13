# Task Management API

A RESTful API for managing tasks and boards built with Express.js, TypeScript, PostgreSQL, and Prisma.

## Features

- Create, read, update, and delete boards
- Create, read, update, and delete tasks within boards
- Filter tasks by status and board
- Search tasks and boards
- Pagination support
- Input validation
- Error handling
- TypeScript support
- PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/task_management"
   PORT=3000
   ```

4. Create the database:
   ```bash
   createdb task_management
   ```

5. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

6. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

## Development

Start the development server:
```bash
npm run dev
```

## API Documentation

### Boards

#### Create a Board
- **POST** `/api/boards`
- Body:
  ```json
  {
    "name": "Project Board",
    "description": "Optional board description"
  }
  ```

#### Get All Boards
- **GET** `/api/boards`
- Query Parameters:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `search`: Search term

#### Get Board by ID
- **GET** `/api/boards/:id`

#### Update Board
- **PATCH** `/api/boards/:id`
- Body:
  ```json
  {
    "name": "Updated Board Name",
    "description": "Updated description"
  }
  ```

#### Delete Board
- **DELETE** `/api/boards/:id`

### Tasks

#### Create a Task
- **POST** `/api/tasks`
- Body:
  ```json
  {
    "title": "Task Title",
    "description": "Optional task description",
    "status": "TODO",
    "boardId": "board-uuid"
  }
  ```

#### Get All Tasks
- **GET** `/api/tasks`
- Query Parameters:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `status`: Filter by status (TODO, DOING, DONE)
  - `boardId`: Filter by board
  - `search`: Search term

#### Get Task by ID
- **GET** `/api/tasks/:id`

#### Update Task
- **PATCH** `/api/tasks/:id`
- Body:
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated description",
    "status": "DOING",
    "boardId": "new-board-uuid"
  }
  ```

#### Delete Task
- **DELETE** `/api/tasks/:id`

## Error Handling

The API uses standard HTTP status codes and returns errors in the following format:

```json
{
  "error": "Error message",
  "details": [] // Validation errors if applicable
}
```

Common status codes:
- 200: Success
- 201: Created
- 204: No Content (successful deletion)
- 400: Bad Request (validation error)
- 404: Not Found
- 500: Internal Server Error

## Database Schema

### Board
```prisma
model Board {
  id          String   @id @default(uuid())
  name        String
  description String?
  tasks       Task[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Task
```prisma
model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  status      String   // TODO, DOING, DONE
  boardId     String
  board       Board    @relation(fields: [boardId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
``` 