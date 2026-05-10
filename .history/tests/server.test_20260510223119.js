const request = require('supertest');
const app = require('../src/server');

describe('server endpoints', () => {
  test('GET /api/hello returns success', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.apiKey).toBe('configured');
  });

  test('GET /api/add returns sum', async () => {
    const response = await request(app).get('/api/add').query({ a: 5, b: 7 });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.result).toBe(12);
  });

  test('GET /api/add returns 400 when missing parameters', async () => {
    const response = await request(app).get('/api/add');
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('error');
  });
});
