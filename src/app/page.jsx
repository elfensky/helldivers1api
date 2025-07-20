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
                className="z-0 grid h-[calc((100vh-50px)*1.111)] grid-cols-10 grid-rows-10 gap-4 md:h-[calc(95vh-80px)] md:gap-8"
                //the height is /9*10 === *1.111 -> so that the first 9 cells take up (100vh-50px) and another cell remains below the fold.
            >
                <section
                    id="alerts"
                    className="z-40 col-start-1 col-end-11 row-start-1 row-end-2 flex overflow-hidden overflow-x-scroll bg-amber-400"
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
                    className="z-30 col-start-1 col-end-11 row-start-2 row-end-7 bg-green-400 opacity-70 md:col-end-7 lg:row-end-9 2xl:col-end-6"
                >
                    <div className="ml-4 mr-4 flex h-full flex-col gap-4 bg-green-800 sm:ml-12 sm:mr-12 sm:gap-8 md:mr-0 lg:ml-24 lg:mr-0">
                        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl">
                            TRACK MANAGED DEMOCRACY ACROSS THE GALAXY
                        </h1>
                        <p className="max-w-[550px] text-[18px]">
                            Don’t miss a moment of the action! Follow the Helldivers’
                            campaign progress as they battle for peace, liberty, and
                            managed democracy. See which planets are under siege, which
                            are liberated, and where your next mission awaits.
                        </p>
                        <Button
                            type="button"
                            label="War Report"
                            href="/war"
                            umami="hero"
                        />
                    </div>
                </section>

                <section
                    id="stats"
                    className="z-20 col-start-1 col-end-11 row-start-10 row-end-11 w-full bg-blue-400 md:col-end-7 md:row-start-7 lg:col-end-11 lg:row-start-9"
                >
                    <div className="ml-4 mr-4 h-full bg-blue-800 sm:ml-12 sm:mr-12 md:mr-0 lg:ml-24 lg:mr-24">
                        stats
                        <br />
                    </div>
                </section>

                <section
                    id="map"
                    className="z-10 col-start-1 col-end-11 row-start-6 row-end-10 overflow-hidden bg-pink-400 opacity-70 md:col-start-6 md:row-start-2 md:row-end-11 lg:row-start-1"
                >
                    <Galaxy data={data} />
                </section>
            </div>

            <section id="features" className="gutters relative px-2 sm:px-24">
                content here
                {/* 
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
                     */}
            </section>
        </>
    );
}
