'use server';
//performance
import { performance } from 'perf_hooks';
import { performanceTime } from '@/utils/time';
//util
import { tryCatch } from '@/lib/tryCatch.mjs';
//fetch
import axios from 'axios';
import https from 'https';
//validators
import { schema_number } from '@/validators/isValidFormData';
//db
import { query_upsert_rebroadcast_season } from '@/db/queries/rebroadcast';
// import { upsertSeason } from '@/db/queries/upsertSeason';

export async function updateSeason(season) {
    //initialize
    const start = performance.now();
    let check = null;

    //1. test if season exists and is valid
    check = schema_number.safeParse(season);
    if (!check.success) {
        throw new Error(check?.error?.issues[0]?.message || 'Invalid season', {
            cause: `updateSeason(${season})`,
        });
    }

    //2. fetch data from the official api
    const url = 'https://api.helldiversgame.com/1.0/';
    const form = new FormData();
    form.append('action', 'get_snapshots');
    form.append('season', season.toString());

    const { data: fetchedData, error: fetchedError } = await tryCatch(
        fetchSeason(url, form),
    );
    if (fetchedError) {
        throw new Error(fetchedError?.message || 'Failed to fetch data from the API', {
            cause: `fetchSeason(${season})`,
        });
    }

    const { data: storedData, error: storedError } = await tryCatch(
        query_upsert_rebroadcast_season(season, fetchedData),
    );
    if (storedError) {
        throw new Error(storedError?.message || 'Failed to store data in the database', {
            cause: `upsertSeason(${season})`,
        });
    }

    const status = {
        success: true,
        ms: performanceTime(start),
        data: storedData,
    };

    return status;
}

async function fetchSeason(url, form) {
    const agent = new https.Agent({
        rejectUnauthorized: false, // disables SSL certificate validation
    });

    try {
        const response = await axios.post(url, form, {
            httpsAgent: agent,
        });

        //todo: instead of this, use zod to properly fully validate the response.
        if (!response.data) {
            throw new Error('No data received from the API', {
                cause: 'fetchSeason()',
            });
        }
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data from axios', {
            cause: 'fetchSeason()',
        });
    }
}
