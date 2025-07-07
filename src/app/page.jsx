import './page.css';
//db
import { tryCatch } from '@/utils/tryCatch.mjs';
import { queryGetRebroadcastStatus } from '@/db/queries/rebroadcast';
import { getCampaign } from '@/db/queries/getCampaign';
//nextjs
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
//components
import Wings from '@/components/layout/Wings/Wings';
import Button from '@/components/layout/Button/Button';
import Galaxy from '@/components/h1/Galaxy/Galaxy';
import War from '@/components/h1/War/War';
import Timeline from '@/components/h1/Timeline/Timeline';
import Active from '@/components/h1/Active/Active';

export default async function HomePage() {
    const rebroacast_status = await tryCatch(queryGetRebroadcastStatus());
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
        <>
            <div
                id="hero"
                className="z-0 grid h-[calc(100vh-50px)] grid-cols-10 grid-rows-10 md:h-[85vh]"
            >
                <section
                    id="alerts"
                    className="col-span-10 row-span-1 row-start-1 flex overflow-hidden overflow-x-scroll bg-amber-400"
                >
                    <ul className="gutters--left flex flex-row gap-10">
                        <li className="bg-red-500 px-10">alert1</li>
                        <li className="bg-red-500 px-10">alert2</li>
                        <li className="bg-red-500 px-10">alert3</li>
                        <li className="bg-red-500 px-10">alert4</li>
                        <li className="bg-red-500 px-10">alert5</li>
                        <li className="bg-red-500 px-10">alert6</li>
                        <li className="bg-red-500 px-10">alert7</li>
                        <li className="bg-red-500 px-10">alert8</li>
                        <li className="bg-red-500 px-10">alert9 </li>
                    </ul>
                    <div className="gutters--right w-4"></div>
                </section>

                <section
                    id="info"
                    className="gutters col-span-10 row-span-4 row-start-2 bg-green-400"
                >
                    {/* <h1>
                        <Wings>Online campaign</Wings> tracker for the original Helldivers
                    </h1>
                    <p>
                        This is a fan project that allows you to check the campaign status
                        of the original Helldivers game on the go. <br />
                        It features an up-to-date overview of current campaign, including
                        in-game events and player statistics, alongside the entire history
                        of the past seasons.
                    </p>

                    <p>
                        I am <span className="font-bold">not</span> affiliated with
                        Arrowhead Game Studios or the Helldivers game itself.
                    </p>
                    <Button
                        type="button"
                        label="Detailed Campaign"
                        href="/campaign"
                        umami="hero"
                    /> */}
                </section>

                <section
                    id="map"
                    className="col-span-10 row-span-5 row-start-6 overflow-hidden bg-pink-400"
                >
                    <Galaxy data={data} />
                </section>

                <section id="stats" className="gutters w-full bg-pink-400">
                    stats
                </section>
            </div>

            <section id="features" className="gutters relative bg-red-400 px-2 sm:px-24">
                content here
            </section>
        </>
    );
}
