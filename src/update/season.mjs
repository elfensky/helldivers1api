'use server';
import { tryCatch } from '@/lib/tryCatch'; //util
import { performance } from 'perf_hooks'; //util
import { performanceTime } from '@/utils/time'; //util
import { getCurrentSeason } from '@/utils/getCurrentSeason'; //util
import { fetchSeason } from '@/update/fetch'; //fetch
import { isValidSeason } from '@/validators/isValidSeason'; //validators
//db
import { queryUpsertRebroadcastSeason } from '@/db/queries/rebroadcast';
import { queryUpsertDefendEvents } from '@/db/queries/upsertDefendEvents';
import { queryUpsertAttackEvents } from '@/db/queries/upsertAttackEvents';

export async function updateSeason(season) {
    //0. initialize
    const start = performance.now();
    let check = null;

    //1. fetch
    const { data: fetchedData, error: fetchedError } = await tryCatch(
        fetchSeason(season),
    );
    if (fetchedError) {
        throw new Error(fetchedError?.message || 'Failed to fetch status from the API', {
            cause: `/src/update/season.mjs | tryCatch(fetchSeason())`,
        });
    }

    //2. use zod to validate the response.
    check = isValidSeason(fetchedData);
    if (!check.success) {
        throw check.error;
    }
    //3. store in db -> /api/rebroadcast
    const { data: storedRebroadcastData, error: storedRebroadcastError } = await tryCatch(
        queryUpsertRebroadcastSeason(season, fetchedData),
    );
    if (storedRebroadcastError) {
        throw new Error(
            storedRebroadcastError?.message ||
                'Failed to store rebroadcast season in the database',
            {
                cause: `/src/update/season.mjs | queryUpsertRebroadcastSeason(fetchedData)`,
            },
        );
    }
    // //4. store in db -> normalized & historic data
    try {
        //4.1 upsertIntroductionOrder()
        // const introductionOrder = await queryUpsertSeason(currentSeason, false);
        //4.2 upsertPointsMax()
        //4.3 upsertSnapshots()
        //4.4 upsertDefendEvents()
        // const defendEvents = await queryUpsertDefendEvents(fetchedData.defend_events);
        //4.5 upsertAttackEvents()
        const attackEvents = await queryUpsertAttackEvents(fetchedData.attack_events);

        //update last_updated time
        // const season2 = await queryUpsertSeason(currentSeason, true);

        const response = {
            // introductionOrder: introductionOrder,
            // campaigns: campaigns,
            // defendEvents: defendEvents,
            attackEvents: attackEvents,
            zzz: fetchedData,
        };

        return response;
    } catch (error) {
        throw error;
    }
}
