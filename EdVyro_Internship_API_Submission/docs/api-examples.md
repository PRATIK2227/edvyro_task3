# API examples

Base URL: `http://localhost:5000/api/v1`

## Create an internship

`POST /internships`

```json
{
  "title": "Backend Developer Intern",
  "company": "Example Technologies",
  "domain": "Backend Development",
  "location": "Remote - India",
  "mode": "remote",
  "description": "Build and maintain REST APIs with the engineering team.",
  "requirements": ["JavaScript", "Node.js", "Basic SQL"],
  "stipend": 8000,
  "currency": "INR",
  "applicationUrl": "https://example.com/careers/backend-intern",
  "status": "open",
  "deadline": "2027-01-31"
}
```

## List, search and filter

- `GET /internships?page=1&limit=10`
- `GET /internships?search=backend`
- `GET /internships?domain=Backend%20Development&location=Remote%20-%20India`
- `GET /internships?status=open&sortBy=stipend&order=desc`

## Read, update and delete

- `GET /internships/{uuid}`
- `PATCH /internships/{uuid}` with only the fields to change.
- `PUT /internships/{uuid}` with the complete resource representation.
- `DELETE /internships/{uuid}`

## Response conventions

Success: `{ "success": true, "message": "...", "data": {}, "requestId": "..." }`

Failure: `{ "success": false, "error": { "code": "...", "message": "..." }, "requestId": "..." }`

List responses also include `pagination` with `page`, `limit`, `total`, `totalPages`, `hasNextPage`, and `hasPreviousPage`.
