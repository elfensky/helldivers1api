import fastify from 'fastify';

const app = fastify();

app.get('/health-check', async (request, reply) => {
    return { status: 'ok' };
});

export default app;
