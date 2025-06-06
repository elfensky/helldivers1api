import db from '@/db/db';
import { performance } from 'perf_hooks';
import { performanceTime } from '@/utils/time';
import { isValidNumber } from '@/validators/isValidNumber';
import { tryCatch } from '@/utils/tryCatch';

export async function queryUpsertSeason(season, complete = false) {
    'use server';
    //0. initialize variables
    const start = performance.now(); //start performance metrics
    const now = new Date(); //current date
    let seasonCount = null;

    //1. validate season parameter is a positive integer
    const checkSeason = isValidNumber.safeParse(season);
    if (!checkSeason.success) {
        throw checkSeason.error;
    }

    //2.
    try {
        const count = await db.h1_season.count();
        if (count !== season) {
            //why is this needed?
            // depending on how the war has gone, sometimes a status or snapshot of the current Season shows events of the past seasons. If those seasons do not exist (even without related data) the update will error.
            // it's easier, simpler and cleanaer generate empty seasons and update them later than to write edge-case code that will check if the season exists, if not fetch THAT season's data, etc.
            // And what if that season also has other season's data, that will spiral. This avoids loops etc.
            //3. generate empty seasons.

            // const origin = new Date(0);
            for (let index = 1; index < season; index++) {
                const createEmptySeason = await db.h1_season.upsert({
                    where: {
                        season: index,
                    },
                    update: {},
                    create: {
                        // last_updated: null,
                        season: index,
                    },
                });
            }
        }

        if (complete) 
            //update actual data
            const upsertRecord = await db.h1_season.upsert({
                where: {
                    season: season,
                },
                update: {
                    // last_updated: null,
                },
                create: {
                    last_updated: now,
                    season: season,
                },
            });

            const response = {
                ms: performanceTime(start),
                query: upsertRecord,
            };

            return response;
        } else {
            //update actual data
            const upsertRecord = await db.h1_season.upsert({
                where: {
                    season: season,
                },
                update: {},
                create: {
                    last_updated: now,
                    season: season,
                },
            });

            const response = {
                ms: performanceTime(start),
                query: upsertRecord,
            };

            return response;
        }
    } catch (error) {
        console.error(error.message, {
            cause: '/src/db/queries/queryUpsertSeason.mjs',
        });
        throw error;
    }
}
