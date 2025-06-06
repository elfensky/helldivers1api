'use server';
import db from '@/db/db';
import { performance } from 'perf_hooks';
import { performanceTime } from '@/utils/time';
import { isValidNumber } from '@/validators/isValidNumber';

export async function getCampaign(season = null) {
    const start = performance.now();

    if (season === null) {
        try {
            //order by DESC last_updated
            //filter by is_active === true
            const data = await db.h1_season.findFirst({
                orderBy: { season: 'desc' },
                where: {
                    // is_active: true,
                    last_updated: {
                        // not: new Date('1970-01-01T00:00:00.000Z'),
                        not: null,
                    },
                },
                include: {
                    introduction_order: true,
                    points_max: true,
                    campaigns: true,
                    snapshots: true,
                    defend_events: true,
                    attack_events: true,
                    statistics: true,
                },
            });
            if (data.length < 1) {
                return null;
            } else {
                return data;
            }
        } catch (error) {
            console.error(error.message, {
                cause: '/src/db/queries/getCampaign.mjs',
            });
            throw error;
        }
    } else {
        try {
            const data = await db.h1_season.findUnique({
                where: {
                    season: season,
                    last_updated: {
                        not: new Date('1970-01-01T00:00:00.000Z'), //this date is set on init, when the full season list is generated.
                    },
                },
                include: {
                    introduction_order: true,
                    points_max: true,
                    campaigns: true,
                    snapshots: true,
                    defend_events: true,
                    attack_events: true,
                    statistics: true,
                },
            });
            return data;
        } catch (error) {
            console.error(error.message, {
                cause: '/src/db/queries/getCampaign.mjs',
            });
            throw error;
        }
    }
}
