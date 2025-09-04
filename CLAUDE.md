# Frontend Development Guide

## Setup
- **Package Manager**: pnpm
- **API Calls**: Always include `credentials: 'include'` for auth
- **Error Handling**: Handle null API responses gracefully

## API Endpoints
An API Server already exists. These are the endpoints that you can call on the API server. Remember to use `credentials: 'include'`

Base URL: `VITE_API_URL`

### Execute External Database Query
`POST /api/v1/external-db/query`

Executes raw SQL queries on external PostgreSQL database.

**Request:**
```json
{
  "sql": "SELECT id, name, email FROM users WHERE active = true LIMIT 10"
}
```

**Response:**
```json
{
  "success": true,
  "error": "",
  "columns": ["id", "name", "email"],
  "rows": [
    {"id": 1, "name": "John Doe", "email": "john@example.com"},
    {"id": 2, "name": "Jane Smith", "email": "jane@example.com"}
  ]
}
```

**Status Codes:**
- 200: Success
- 400: Invalid request
- 500: Database/query error
