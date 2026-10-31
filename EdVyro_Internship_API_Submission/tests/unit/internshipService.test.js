import { describe, it, expect, vi } from 'vitest';
import { InternshipService } from '../../src/services/internshipService.js';

describe('InternshipService', () => {
  it('returns pagination metadata for a list', async () => {
    const repository = { findAll: vi.fn().mockResolvedValue({ rows: [{ id: 'one' }], total: 21 }) };
    const service = new InternshipService(repository);
    const result = await service.list({ page: 2, limit: 10 });
    expect(result.data).toHaveLength(1);
    expect(result.pagination).toMatchObject({ page: 2, limit: 10, total: 21, totalPages: 3, hasNextPage: true, hasPreviousPage: true });
  });

  it('throws a 404 when an internship does not exist', async () => {
    const repository = { findById: vi.fn().mockResolvedValue(null) };
    const service = new InternshipService(repository);
    await expect(service.get('00000000-0000-4000-8000-000000000001'))
      .rejects.toMatchObject({ statusCode: 404, code: 'INTERNSHIP_NOT_FOUND' });
  });

  it('does not report a successful delete for a missing record', async () => {
    const repository = { delete: vi.fn().mockResolvedValue(false) };
    const service = new InternshipService(repository);
    await expect(service.delete('00000000-0000-4000-8000-000000000001'))
      .rejects.toMatchObject({ statusCode: 404 });
  });
});
