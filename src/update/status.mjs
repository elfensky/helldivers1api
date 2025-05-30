'use server';
//performance
// import { performance } from 'perf_hooks';
import { performanceTime } from '@/utils/time';
//util
import { tryCatch } from '@/lib/tryCatch.mjs';
//fetch
import { fetchStatus } from '@/update/fetch.mjs';
// //validators
import { isValidStatus } from '@/validators/isValidStatus';
// import { schemaNumber } from '@/validators/isValidFormData';
//db
import { queryUpsertRebroadcastStatus } from '@/db/queries/rebroadcast';
import { queryUpsertSeason } from '@/db/queries/upsertSeason';
import { queryUpsertCampaigns } from '@/db/queries/upsertCampaigns';
import { queryUpsertDefendEvent } from '@/db/queries/upsertDefendEvent';
import { queryUpsertAttackEvents } from '@/db/queries/upsertAttackEvents';

export async function updateStatus() {
    //0. initialize
    const start = performance.now();
    let check = null;

    //1. fetch
    const { data: fetchedData, error: fetchedError } = await tryCatch(fetchStatus());
    if (fetchedError) {
        throw new Error(fetchedError?.message || 'Failed to fetch status from the API', {
            cause: `/src/update/status.mjs | tryCatch(fetchStatus())`,
        });
    }

    //2. use zod to validate the response.
    if (!isValidStatus(fetchedData)) {
        throw new Error('Invalid status data', {
            cause: `/src/update/status.mjs | isValidStatus(fetchedData)`,
        });
    }

    const currentSeason = getCurrentSeason(fetchedData);

    //3. store in db -> /api/rebroadcast
    const { data: storedRebroadcastData, error: storedRebroadcastError } = await tryCatch(
        queryUpsertRebroadcastStatus(fetchedData),
    );
    if (storedRebroadcastError) {
        throw new Error(
            storedRebroadcastError?.message ||
                'Failed to store rebroadcast status in the database',
            {
                cause: `/src/update/status.mjs | queryUpsertRebroadcastStatus(fetchedData)`,
            },
        );
    }

    //4. store in db -> normalized & historic data
    console.log(`4. store in db -> normalized & historic data for ${currentSeason}`);
    try {
        //4.1 upsertSeason()
        const season = await queryUpsertSeason(currentSeason);
        //4.2 upsertCampaign()
        const campaigns = await queryUpsertCampaigns(fetchedData.campaign_status);
        //4.3 upsertDefendEvent()
        const defendEvent = await queryUpsertDefendEvent(fetchedData.defend_event);
        //4.4 upsertAttackEvent()
        const attackEvents = await queryUpsertAttackEvents(fetchedData.attack_events);
        //4.5 upsertStatistics()
        const response = {
            season: season,
            campaigns: campaigns,
            defendEvent: defendEvent,
            attackEvents: attackEvents,
        };
        return response;
    } catch (error) {
        console.error(error);
    }

    // return false;

    // //5. return response
    // const status = {
    //     success: true,
    //     ms: performanceTime(start),
    //     data: storedData,
    // };
    // return status;
    return false;
}

function getCurrentSeason(data) {
    // Gather all relevant season numbers
    const campaignSeasons = (data.campaign_status || []).map((cs) => cs.season);
    const defendSeason = data.defend_event ? [data.defend_event.season] : [];
    const statisticsSeasons = (data.statistics || []).map((stat) => stat.season);

    // Combine all seasons
    const allSeasons = [...campaignSeasons, ...defendSeason, ...statisticsSeasons];

    // Check if all seasons are equal
    const uniqueSeasons = [...new Set(allSeasons)];
    const isValid = uniqueSeasons.length === 1;

    if (isValid) {
        return uniqueSeasons[0];
    } else {
        throw new Error('Invalid Current Season');
    }
}
