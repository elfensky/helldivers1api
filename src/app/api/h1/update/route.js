'use server';
import db from '@/db/db';
import { z } from 'zod/v4';
import { tryCatch } from '@/lib/tryCatch';
// import { performance } from 'perf_hooks';
import { performanceTime, elapsedSeconds } from '@/utils/time';
import { NextResponse, after } from 'next/server';
//parsers
import { formDataToObject } from '@/utils/formdata';
//validators
import { isValidContentType } from '@/validators/isValidContentType';
import { isValidFormData } from '@/validators/isValidFormData';
//update
import { updateStatus } from '@/update/status';

export async function GET(request) {
    const data = {
        time: Math.floor(Date.now() / 1000),
    };

    const { data: statusData, error: statusError } = await tryCatch(updateStatus());

    if (statusError) {
        return NextResponse.json(statusError);
    } else {
        return NextResponse.json(statusData);
    }
}

// Custom handler for all other methods
const methodNotAllowed = () => {
    return errorResponse(5);
};

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
