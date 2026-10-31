import { pool } from '../src/config/database.js';
import { logger } from '../src/config/logger.js';

const examples = [
  ['Frontend Developer Intern', 'BrightPath Labs', 'Web Development', 'Remote - India', 'remote',
   'Build accessible React interfaces and collaborate with the product team.',
   JSON.stringify(['HTML, CSS and JavaScript', 'React fundamentals', 'Git basics']), 8000, 'INR',
   'https://example.com/apply/frontend', 'open', '2027-01-15'],
  ['Node.js Backend Intern', 'CloudNest Technologies', 'Backend Development', 'Pune, India', 'hybrid',
   'Develop REST endpoints, write tests and work with PostgreSQL data models.',
   JSON.stringify(['JavaScript and Node.js', 'Express basics', 'SQL fundamentals']), 10000, 'INR',
   'https://example.com/apply/backend', 'open', '2027-01-20'],
  ['Data Analyst Intern', 'Northstar Analytics', 'Data Analytics', 'Remote - India', 'remote',
   'Clean datasets, create reports and communicate findings to stakeholders.',
   JSON.stringify(['Excel or Google Sheets', 'Basic SQL', 'Analytical thinking']), 5000, 'INR',
   'https://example.com/apply/analyst', 'open', '2027-02-01'],
];

try {
  for (const item of examples) {
    await pool.query(
      `INSERT INTO internships
       (title, company, domain, location, mode, description, requirements, stipend, currency,
        application_url, status, deadline)
       SELECT $1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10,$11,$12
       WHERE NOT EXISTS (SELECT 1 FROM internships WHERE title = $1 AND company = $2)`,
      item,
    );
  }
  logger.info('Seed data inserted (existing matching records were preserved)');
} catch (error) {
  logger.error(error, 'Seed failed');
  process.exitCode = 1;
} finally {
  await pool.end();
}
