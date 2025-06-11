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
import { elapsedSeasonTime } from '@/utils/time';

export default async function HomePage() {
    const rebroacast_status = await tryCatch(queryGetRebroadcastStatus());
    const query = await tryCatch(getCampaign());
    const data = query?.data;

    const elapsedTime = elapsedSeasonTime(data?.statistics[0]?.season_duration);
    console.log(elapsedTime);

    if (!data) {
        return (
            <div className="flex min-h-full w-full flex-col-reverse justify-center sm:flex-row">
                Loading...
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-row gap-2">
                <h1 className="text-4xl">Season {data.season}</h1>
                <span className="text-4xl">|</span>
                <span className="text-4xl">{elapsedTime.days} days</span>
            </div>
            <div className="flex min-h-full w-full flex-col-reverse justify-center sm:flex-row">
                <div className="flex flex-col gap-8 p-4 sm:max-h-[86vh] sm:overflow-y-auto sm:p-0">
                    <War data={data} />
                    <Timeline data={data} />
                </div>
                <Galaxy data={data} />
            </div>
        </>
    );
}
