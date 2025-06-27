import './page.css';
//db
import { tryCatch } from '@/utils/tryCatch.mjs';
import { queryGetRebroadcastStatus } from '@/db/queries/rebroadcast';
import { getCampaign } from '@/db/queries/getCampaign';
//components
import Galaxy from '@/components/h1/Galaxy/Galaxy';
import War from '@/components/h1/War/War';
import Timeline from '@/components/h1/Timeline/Timeline';
//
import Script from 'next/script';

//

export default async function HomePage() {
    const rebroacast_status = await tryCatch(queryGetRebroadcastStatus());
    // const query = await tryCatch(getCampaign());
    const { data: query, error: queryError } = await tryCatch(getCampaign());

    if (queryError !== null) {
        return (
            <div className="flex min-h-full w-full flex-col-reverse justify-center sm:flex-row">
                Error: {queryError.message}
            </div>
        );
    }

    const data = query;
    if (!query) {
        return (
            <div className="flex min-h-full w-full flex-col-reverse justify-center sm:flex-row">
                Loading...
            </div>
        );
    }

    return (
        <div className="mx-2 flex flex-col-reverse gap-4 sm:mx-24 lg:flex-row">
            {/* mx-2 flex min-h-full w-full flex-col-reverse items-center justify-center gap-2 sm:mx-24 sm:items-start sm:gap-4 lg:flex-row */}

            {/* USE SUSPENSE HERE */}
            <War data={data} />
            <Timeline data={data} />
            <Galaxy data={data} />
            <Script src="/scripts/reload.js" />
        </div>
    );
}
