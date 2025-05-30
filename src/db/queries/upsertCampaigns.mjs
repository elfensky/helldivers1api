import db from '@/db/db';
import { performance } from 'perf_hooks';
import { performanceTime } from '@/utils/time';
import { zodIsNumber } from '@/validators/isNumber';

export async function queryUpsertCampaigns(campaigns) {
    'use server';
    const start = performance.now();

    try {
        const now = new Date();

        const upsertRecords = [];
        for (const campaign of campaigns) {
            console.log('campaign', campaign);
            const upsertRecord = await db.h1_campaign.upsert({
                where: {
                    season_introduction_order: {
                        season: campaign.season,
                        introduction_order: campaign.introduction_order,
                    },
                },
                update: {
                    points: campaign.points,
                    points_taken: campaign.points_taken,
                    points_max: campaign.points_max,
                    status: campaign.status,
                },
                create: {
                    season: campaign.season,
                    points: campaign.points,
                    points_taken: campaign.points_taken,
                    points_max: campaign.points_max,
                    status: campaign.status,
                    introduction_order: campaign.introduction_order,
                },
            });
            upsertRecords.push(upsertRecord);
        }

        const response = {
            ms: performanceTime(start),
            query: upsertRecords,
        };

        return response;
    } catch (error) {
        throw error;
    }
}
