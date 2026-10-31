import { describe, it, expect } from 'vitest';
import { createInternshipSchema, listInternshipsSchema, updateInternshipSchema } from '../../src/validators/internshipSchemas.js';

const valid = {
  title: 'Backend Developer Intern', company: 'Example Labs', domain: 'Backend',
  location: 'Remote - India', mode: 'remote', description: 'Build and test APIs.',
  requirements: ['Node.js'], stipend: 5000, currency: 'INR',
  applicationUrl: 'https://example.com/apply', status: 'open', deadline: '2027-01-31',
};

describe('request schemas', () => {
  it('accepts a valid internship', () => {
    expect(createInternshipSchema.safeParse({ body: valid, params: {}, query: {} }).success).toBe(true);
  });
  it('rejects unknown properties', () => {
    expect(createInternshipSchema.safeParse({ body: { ...valid, unexpected: true }, params: {}, query: {} }).success).toBe(false);
  });
  it('rejects invalid URLs', () => {
    expect(createInternshipSchema.safeParse({ body: { ...valid, applicationUrl: 'not-a-url' }, params: {}, query: {} }).success).toBe(false);
  });
  it('requires at least one field for PATCH', () => {
    expect(updateInternshipSchema.safeParse({ body: {}, params: { id: '00000000-0000-4000-8000-000000000001' }, query: {} }).success).toBe(false);
  });
  it('applies safe pagination defaults', () => {
    const result = listInternshipsSchema.parse({ query: {}, params: {}, body: {} });
    expect(result.query).toMatchObject({ page: 1, limit: 10, sortBy: 'created_at', order: 'desc' });
  });
});
