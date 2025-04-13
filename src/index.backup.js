'use strict';
import fastify from 'fastify';

import { a } from './config.mjs';
console.log(a);

const server = fastify();

server.get('/ping', async (request, reply) => {
    return 'pong\n';
});

server.get('/health-check', async (request, reply) => {
    return { status: 'ok' };
});

server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server listening at ${address}`);
});

// Use setInterval to perform a task every 5 seconds
setInterval(() => {
    console.log('This message is logged every 5 seconds');
    // You can perform any repeated task here, such as checking a database, making an API call, etc.
}, 5000);
