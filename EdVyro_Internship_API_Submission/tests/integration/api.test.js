import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('HTTP API contract', () => {
  it('returns API metadata at the root', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('EdVyro Internship API');
  });

  it('returns a request ID header for every request', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.headers['x-request-id']).toBeTruthy();
    expect(response.body.requestId).toBe(response.headers['x-request-id']);
  });

  it('returns a consistent 404 response for unknown routes', async () => {
    const response = await request(app).get('/not-a-real-route');
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('ROUTE_NOT_FOUND');
  });

  it('rejects an invalid UUID before querying the database', async () => {
    const response = await request(app).get('/api/v1/internships/not-a-uuid');
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
