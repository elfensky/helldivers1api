// import update from '@/update/update.mjs';

export async function initializeData() {
    'use server';

    if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV === 'development') {
        try {
            // return await update();
            return true;
        } catch (error) {
            return false;
        }
    }

    return false;
}
