# Architecture

The API uses a layered architecture to keep HTTP concerns, business rules and persistence separate.

```text
HTTP request
  -> Express middleware (request ID, security, parsing, rate limit)
  -> Route
  -> Zod validation
  -> Controller
  -> Service (business rules and 404 handling)
  -> Repository (parameterized SQL)
  -> PostgreSQL
```

## Main decisions

- **UUID primary keys:** identifiers are difficult to guess and remain stable across environments.
- **Parameterized SQL:** user input is passed as query parameters to reduce SQL injection risk.
- **Allowlisted sorting:** dynamic SQL identifiers come only from a fixed allowlist.
- **Zod validation:** unknown fields are rejected and query parameters are coerced into typed values.
- **Request IDs:** every response can be correlated with server logs using `X-Request-ID`.
- **Database constraints:** allowed modes/statuses and non-negative stipend are enforced by PostgreSQL as well as the API.
- **Separation of tests:** unit tests mock the repository; HTTP contract tests do not require a live database.

## Data model

`internships`: `id`, `title`, `company`, `domain`, `location`, `mode`, `description`, `requirements` (JSONB), `stipend`, `currency`, `application_url`, `status`, `deadline`, `created_at`, `updated_at`.
