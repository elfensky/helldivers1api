// tests/health-check.test.ts
import { test, expect } from 'vitest';
import app from '../src/app.mjs';

test('GET /health-check should return status OK', async () => {
    const response = await app.inject({
        method: 'GET',
        url: '/health-check',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
});
