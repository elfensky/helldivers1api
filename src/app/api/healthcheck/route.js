import { tryCatch } from '@/utils/tryCatch';
import { performance } from 'perf_hooks';
import { roundedPerformanceTime } from '@/utils/time';
import { errorResponse, successResponse } from '@/utils/responses';

import { NextResponse, after } from 'next/server';
//validators
import { isValidNumber } from '@/validators/isValidNumber';
//db and fetch
import { getCampaign } from '@/db/queries/getCampaign';
import { updateSeason } from '@/update/season';
//track
import { umamiTrackEvent } from '@/utils/umami';

export async function GET(request) {
    const start = performance.now();
    return successResponse(200, start, { alive: true });
}

const methodNotAllowed = () => {
    const start = performance.now();
    return errorResponse(405, start);
};

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
