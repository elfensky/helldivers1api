import fastify from 'fastify';
import * as Sentry from '@sentry/node';

const app = fastify();

Sentry.setupFastifyErrorHandler(app);

app.get('/health-check', async (request, reply) => {
    return { status: 'ok' };
});

app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My first Sentry error!');
});

export default app;
