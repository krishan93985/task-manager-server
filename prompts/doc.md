# Task Management API Documentation

Use this documentation to implement the frontend UI. All responses include proper HTTP status codes and error handling.

Base URL: `http://localhost:3000/api`

## Common Types

```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

## Board APIs

### Create Board
**Endpoint:** `POST /boards`
```typescript
// Request
{
  "name": string;       // required, max 100 chars
  "description"?: string; // optional, max 500 chars
}

// Response - 201 Created
{
  "id": string;         // UUID
  "name": string;
  "description": string | null;
  "createdAt": string;  // ISO date
  "_count": {
    "tasks": number;
  }
}
```

### Get All Boards
**Endpoint:** `GET /boards?page=1&limit=10&search=project`
```typescript
// Query Parameters
{
  "page": number;     // default: 1
  "limit": number;    // default: 10, max: 100
  "search"?: string;  // optional search term
}

// Response - 200 OK
PaginatedResponse<{
  "id": string;
  "name": string;
  "description": string | null;
  "createdAt": string;
  "_count": {
    "tasks": number;
  }
}>
```

### Get Board by ID
**Endpoint:** `GET /boards/:id`
```typescript
// Response - 200 OK
{
  "id": string;
  "name": string;
  "description": string | null;
  "createdAt": string;
  "_count": {
    "tasks": number;
  }
}
```

### Update Board
**Endpoint:** `PATCH /boards/:id`
```typescript
// Request
{
  "name"?: string;        // optional, max 100 chars
  "description"?: string; // optional, max 500 chars
}

// Response - 200 OK
{
  "id": string;
  "name": string;
  "description": string | null;
  "createdAt": string;
  "_count": {
    "tasks": number;
  }
}
```

### Delete Board
**Endpoint:** `DELETE /boards/:id`
```typescript
// Response - 204 No Content
// No response body
```

## Task APIs

### Create Task
**Endpoint:** `POST /tasks`
```typescript
// Request
{
  "title": string;       // required, max 100 chars
  "description"?: string; // optional, max 500 chars
  "status": "TODO" | "DOING" | "DONE"; // required
  "boardId": string;     // required, valid board UUID
}

// Response - 201 Created
{
  "id": string;
  "title": string;
  "description": string | null;
  "status": "TODO" | "DOING" | "DONE";
  "boardId": string;
  "createdAt": string;
  "board": {
    "name": string;
  }
}
```

### Get All Tasks
**Endpoint:** `GET /tasks?page=1&limit=10&status=TODO&boardId=uuid&search=task`
```typescript
// Query Parameters
{
  "page": number;     // default: 1
  "limit": number;    // default: 10, max: 100
  "status"?: "TODO" | "DOING" | "DONE";
  "boardId"?: string; // board UUID
  "search"?: string;
}

// Response - 200 OK
PaginatedResponse<{
  "id": string;
  "title": string;
  "description": string | null;
  "status": "TODO" | "DOING" | "DONE";
  "boardId": string;
  "createdAt": string;
  "board": {
    "name": string;
  }
}>
```

### Get Task by ID
**Endpoint:** `GET /tasks/:id`
```typescript
// Response - 200 OK
{
  "id": string;
  "title": string;
  "description": string | null;
  "status": "TODO" | "DOING" | "DONE";
  "boardId": string;
  "createdAt": string;
  "board": {
    "name": string;
  }
}
```

### Update Task
**Endpoint:** `PATCH /tasks/:id`
```typescript
// Request
{
  "title"?: string;      // optional, max 100 chars
  "description"?: string; // optional, max 500 chars
  "status"?: "TODO" | "DOING" | "DONE";
  "boardId"?: string;    // optional, valid board UUID
}

// Response - 200 OK
{
  "id": string;
  "title": string;
  "description": string | null;
  "status": "TODO" | "DOING" | "DONE";
  "boardId": string;
  "createdAt": string;
  "board": {
    "name": string;
  }
}
```

### Delete Task
**Endpoint:** `DELETE /tasks/:id`
```typescript
// Response - 204 No Content
// No response body
```

## Error Responses

All endpoints return consistent error responses:

```typescript
// 400 Bad Request - Validation Error
{
  "error": "Validation error",
  "details": [
    {
      "code": string;
      "message": string;
      "path": string[];
    }
  ]
}

// 404 Not Found
{
  "error": "Board not found" | "Task not found"
}

// 500 Internal Server Error
{
  "error": "Internal server error"
}
```

## Important Notes

1. All timestamps are in ISO format
2. All IDs are UUIDs
3. Pagination is 1-based
4. Search is case-insensitive
5. Task status must be one of: "TODO", "DOING", "DONE"
6. Deleting a board will cascade delete all its tasks
7. All paginated responses follow the `PaginatedResponse<T>` interface
