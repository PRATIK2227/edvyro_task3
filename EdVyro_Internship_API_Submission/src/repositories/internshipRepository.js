import { pool } from '../config/database.js';

const columns = `id, title, company, domain, location, mode, description, requirements,
  stipend, currency, application_url AS "applicationUrl", status, deadline,
  created_at AS "createdAt", updated_at AS "updatedAt"`;

export class InternshipRepository {
  async create(data) {
    const values = [
      data.title, data.company, data.domain, data.location, data.mode, data.description,
      JSON.stringify(data.requirements ?? []), data.stipend ?? 0, data.currency ?? 'INR',
      data.applicationUrl, data.status ?? 'open', data.deadline ?? null,
    ];
    const result = await pool.query(
      `INSERT INTO internships
       (title, company, domain, location, mode, description, requirements, stipend, currency,
        application_url, status, deadline)
       VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10,$11,$12)
       RETURNING ${columns}`,
      values,
    );
    return result.rows[0];
  }

  async findAll(filters) {
    const { page, limit, search, domain, location, status, sortBy, order } = filters;
    const clauses = [];
    const values = [];
    const add = (sql, value) => { values.push(value); clauses.push(sql.replace('?', `$${values.length}`)); };
    if (search) add("(title ILIKE ? OR company ILIKE ? OR description ILIKE ?)", `%${search}%`);
    if (search) {
      const pattern = `%${search}%`;
      values.splice(values.length - 1, 0, pattern, pattern);
      clauses[clauses.length - 1] = `(title ILIKE $${values.length - 2} OR company ILIKE $${values.length - 1} OR description ILIKE $${values.length})`;
    }
    if (domain) add('LOWER(domain) = LOWER(?)', domain);
    if (location) add('LOWER(location) = LOWER(?)', location);
    if (status) add('status = ?', status);

    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const safeSort = { created_at: 'created_at', title: 'title', stipend: 'stipend' }[sortBy];
    const offset = (page - 1) * limit;
    const count = await pool.query(`SELECT COUNT(*)::int AS total FROM internships ${where}`, values);
    const rows = await pool.query(
      `SELECT ${columns} FROM internships ${where}
       ORDER BY ${safeSort} ${order.toUpperCase()}, id ASC
       LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
      [...values, limit, offset],
    );
    return { rows: rows.rows, total: count.rows[0].total };
  }

  async findById(id) {
    const result = await pool.query(`SELECT ${columns} FROM internships WHERE id = $1`, [id]);
    return result.rows[0] ?? null;
  }

  async update(id, data) {
    const map = {
      title: 'title', company: 'company', domain: 'domain', location: 'location',
      mode: 'mode', description: 'description', requirements: 'requirements',
      stipend: 'stipend', currency: 'currency', applicationUrl: 'application_url',
      status: 'status', deadline: 'deadline',
    };
    const entries = Object.entries(data).filter(([key]) => map[key]);
    const values = entries.map(([key, value]) => key === 'requirements' ? JSON.stringify(value) : value);
    const sets = entries.map(([key], index) =>
      `${map[key]} = $${index + 1}${key === 'requirements' ? '::jsonb' : ''}`,
    );
    values.push(id);
    const result = await pool.query(
      `UPDATE internships SET ${sets.join(', ')}, updated_at = NOW()
       WHERE id = $${values.length} RETURNING ${columns}`,
      values,
    );
    return result.rows[0] ?? null;
  }

  async delete(id) {
    const result = await pool.query('DELETE FROM internships WHERE id = $1 RETURNING id', [id]);
    return result.rowCount > 0;
  }
}
