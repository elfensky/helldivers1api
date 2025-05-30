import db from '@/db/db';
import { performance } from 'perf_hooks';
import { performanceTime } from '@/utils/time';
import { zodIsNumber } from '@/validators/isNumber';

export async function queryUpsertCampaigns(campaigns) {
    'use server';
    const start = performance.now();

    try {
        const now = new Date();

        const upserts = campaigns.map((data) =>
            db.h1_campaign.upsert({
                where: {
                    season: data.season,
                    introduction_order: data.introduction_order,
                },
                update: {
                    points: data.points,
                    points_taken: data.points_taken,
                    points_max: data.points_max,
                    status: data.status,
                },
                create: data,
            }),
        );

        const transaction = await prisma.$transaction(upserts);

        const response = {
            ms: performanceTime(start),
            query: transaction,
        };

        return response;
    } catch (error) {
        throw error;
    }
}
