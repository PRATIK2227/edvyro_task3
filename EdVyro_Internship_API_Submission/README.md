# EdVyro Internship API — REST API and Persistent Data

A structured REST API for managing internship opportunities. Built with Node.js, Express, PostgreSQL and Zod. The project demonstrates CRUD operations, persistent storage, filtering, pagination, secure request handling and automated tests.

## Features

- Create, list, retrieve, partially update, replace and delete internship records.
- PostgreSQL persistence, UUID identifiers and repeatable schema migration.
- Search across title, company and description.
- Case-insensitive domain and location filters.
- Status filtering, allowlisted sorting and pagination.
- Zod validation with unknown-field rejection.
- Consistent JSON response and error formats.
- Request IDs, Helmet security headers, CORS, compression and rate limiting.
- Layered routes/controllers/services/repositories architecture.
- Unit tests and HTTP contract tests.

## Requirements

- Node.js 20+
- npm
- PostgreSQL 13+

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file:

   **Windows PowerShell**
   ```powershell
   Copy-Item .env.example .env
   notepad .env
   ```

   **macOS/Linux**
   ```bash
   cp .env.example .env
   ```

3. Set `DATABASE_URL` in `.env` to your PostgreSQL database. Example:

   ```env
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/edvyro_internships
   DB_SSL=false
   PORT=5000
   NODE_ENV=development
   ```

4. Create the database if it does not exist:

   ```sql
   CREATE DATABASE edvyro_internships;
   ```

5. Run migration and seed sample data:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

6. Start the server:

   ```bash
   npm start
   ```

   Development mode: `npm run dev`

7. Verify:

   ```text
   GET http://localhost:5000/api/v1/health
   ```

## API endpoints

All resource endpoints are prefixed with `/api/v1`.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | API and database health |
| POST | `/internships` | Create an internship |
| GET | `/internships` | List/search/filter internships |
| GET | `/internships/:id` | Get one internship |
| PATCH | `/internships/:id` | Update selected fields |
| PUT | `/internships/:id` | Replace internship data |
| DELETE | `/internships/:id` | Delete an internship |

### Query parameters

`page`, `limit` (1–100), `search`, `domain`, `location`, `status`, `sortBy` (`created_at`, `title`, `stipend`) and `order` (`asc`, `desc`).

See [API examples](docs/api-examples.md) and [architecture notes](docs/architecture.md).

## Tests and quality checks

```bash
npm test
npm run test:coverage
npm run lint
npm run format:check
```

The test suite includes unit tests for service behavior and validation, plus HTTP contract tests. Database-dependent behavior must also be verified against your configured PostgreSQL instance.

## Environment variables

| Variable | Required | Default | Purpose |
|---|---:|---|---|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |
| `DB_SSL` | No | `false` | Require TLS for hosted database |
| `PORT` | No | `5000` | HTTP port |
| `NODE_ENV` | No | `development` | Runtime environment |
| `CORS_ORIGIN` | No | `*` | Allowed browser origin(s) |
| `LOG_LEVEL` | No | `info` | Pino log level |
| `RATE_LIMIT_WINDOW_MS` | No | `900000` | Rate-limit window |
| `RATE_LIMIT_MAX` | No | `100` | Requests per window |

Never commit `.env`, database passwords or access tokens. Commit `.env.example` only.

## Project structure

```text
EdVyro_Internship_API_Submission/
├── docs/
├── migrations/
├── scripts/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validators/
├── tests/
│   ├── integration/
│   └── unit/
├── .env.example
├── package.json
└── README.md
```

## Submission notes

This is a project starter prepared against the REST API and persistent-data scope. Before submission, run it locally, configure PostgreSQL, execute tests, capture real request/response evidence, and push it to your own public GitHub repository. Do not claim a deployment or test result that you have not verified.

## Author

Add your name, internship cohort and repository/demo links here before publishing.
