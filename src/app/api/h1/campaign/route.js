import { NextResponse, after } from 'next/server';
import { performanceTime } from '@/utils/time';
import { isValidNumber } from '@/validators/isValidNumber';
import { tryCatch } from '@/utils/tryCatch';
//db and fetch
import { getCampaign } from '@/db/queries/getCampaign';
import { updateSeason } from '@/update/season';

export async function GET(request) {
    //0. initialize
    const start = performance.now();
    let data = null;
    let season = null;

    // after(async () => {
    //     console.log('after() ', performanceTime(start));
    // });

    //1. validate query parameters (if any)
    if (request.nextUrl.searchParams.get('season')) {
        const check = isValidNumber.safeParse(request.nextUrl.searchParams.get('season'));
        if (!check.success) {
            return NextResponse.json(
                {
                    ms: performanceTime(start),
                    error: 'Invalid season',
                },
                { status: 400 },
            );
        }
        season = Number(request.nextUrl.searchParams.get('season'));
    }

    //2. get data from db
    const { data: campaignData, error: campaignError } = await tryCatch(
        getCampaign(season),
    );
    if (campaignError) {
        return NextResponse.json(
            {
                ms: performanceTime(start),
                error: campaignError,
            },
            { status: 500 },
        );
    }
    data = campaignData;

    //3. if no data, attempt fetch remote data
    if (!campaignData) {
        //1. fetch remote data
        //2. fetch local data
        //3. data = campaignData2;
        const { data: fetchData, error: fetchError } = await tryCatch(
            updateSeason(season),
        );
        const { data: campaignData2, error: campaignError2 } = await tryCatch(
            getCampaign(season),
        );
        data = campaignData2;
        if (!campaignData2) {
            return NextResponse.json(
                {
                    ms: performanceTime(start),
                    error: 'No data found',
                },
                { status: 404 },
            );
        }
    }
    //4. return response
    return NextResponse.json({
        ms: performanceTime(start),
        data,
    });
}
