import db from '@/db/db';
import { performance } from 'perf_hooks';
import { performanceTime } from '@/utils/time';

export async function queryUpsertIntroductionOrder(season, order) {
    'use server';
    const start = performance.now();

    if (!season) throw new Error('season is missing');
    if (!order) throw new Error('order is missing');

    try {
        const now = new Date();

        const upsertRecord = await db.h1_introduction_order.upsert({
            where: {
                season: season,
            },
            update: {
                // season: season,
                order: order,
                json: order,
            },
            create: {
                season: season,
                order: order,
                json: order,
            },
        });

        const response = {
            ms: performanceTime(start),
            query: upsertRecord,
        };

        return response;
    } catch (error) {
        console.error(error.message, {
            cause: 'db/queries/queryUpsertIntroductionOrder.mjs',
        });
        throw error;
    }
}
