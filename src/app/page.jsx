import './page.css';
//db
import { tryCatch } from '@/utils/tryCatch.mjs';
import { queryGetRebroadcastStatus } from '@/db/queries/rebroadcast';
import { getCampaign } from '@/db/queries/getCampaign';
//components
import Galaxy from '@/components/h1/Galaxy/Galaxy';
import Timeline from '@/components/h1/Timeline/Timeline';

export default async function HomePage() {
    const rebroacast_status = await tryCatch(queryGetRebroadcastStatus());
    const query = await tryCatch(getCampaign());
    const data = query?.data;

    if (!data)
        return (
            <div className="flex min-h-full w-full flex-col-reverse justify-center sm:flex-row">
                Loading...
            </div>
        );

    return (
        <>
            <h1 className="text-4xl">Season {data.season}</h1>
            <div className="flex min-h-full w-full flex-col-reverse justify-center sm:flex-row">
                {/* <Timeline data={data} /> */}
                <Galaxy data={rebroacast_status} />
            </div>
        </>
    );
}
