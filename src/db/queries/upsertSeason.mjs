import db from '@/db/db';
import { performance } from 'perf_hooks';
import { performanceTime } from '@/utils/time';
import { zodIsNumber } from '@/validators/isNumber';

export async function queryUpsertSeason(season) {
    'use server';
    const start = performance.now();

    const checkSeason = zodIsNumber.safeParse(season);
    if (!checkSeason.success) {
        throw checkSeason.error;
    }

    try {
        const now = new Date();

        //update active/inactive records
        const activeRecords = await db.h1_season.findMany({
            where: {
                is_active: true,
                season: {
                    not: season,
                },
            },
        });
        //set all non-active ones to false
        for (const record of activeRecords) {
            await db.h1_season.update({
                where: {
                    season: record.season,
                },
                data: {
                    is_active: false,
                },
            });
        }

        //update actual data
        const upsertRecord = await db.h1_season.upsert({
            where: {
                season: season,
            },
            update: {
                is_active: true,
                last_updated: now,
            },
            create: {
                is_active: true,
                last_updated: now,
                season: season,
            },
        });

        const response = {
            ms: performanceTime(start),
            query: upsertRecord,
        };

        return response;
    } catch (error) {
        throw error;
    }
}
