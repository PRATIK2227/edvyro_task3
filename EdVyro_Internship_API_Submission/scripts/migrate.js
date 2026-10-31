import { readFile } from 'node:fs/promises';
import { pool } from '../src/config/database.js';
import { logger } from '../src/config/logger.js';

try {
  const sql = await readFile(new URL('../migrations/001_create_internships.sql', import.meta.url), 'utf8');
  await pool.query('BEGIN');
  await pool.query(sql);
  await pool.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    filename TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);
  await pool.query(
    `INSERT INTO schema_migrations(filename) VALUES ($1) ON CONFLICT (filename) DO NOTHING`,
    ['001_create_internships.sql'],
  );
  await pool.query('COMMIT');
  logger.info('Database migration completed');
} catch (error) {
  await pool.query('ROLLBACK').catch(() => {});
  logger.error(error, 'Migration failed');
  process.exitCode = 1;
} finally {
  await pool.end();
}
