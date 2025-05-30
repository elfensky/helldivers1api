import { performanceTime } from '@/utils/time';
import { tryCatch } from '@/lib/tryCatch';

export async function initializeWorker() {
    'use server';
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        //dynamic imports
        //worker threads and path
        const { Worker } = await import('worker_threads');
        const path = await import('path');
        const fs = await import('fs');
        const { performance } = await import('perf_hooks');

        //initialize
        const start = performance.now();
        try {
            const worker = new Worker(path.resolve('./public/scripts/cron.js'));
            return true;
        } catch (error) {
            return false;
        }
    }
}
