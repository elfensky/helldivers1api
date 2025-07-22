import './page.css';
//db
import { tryCatch } from '@/utils/tryCatch.mjs';
import { queryGetRebroadcastStatus } from '@/db/queries/rebroadcast';
import { getCampaign } from '@/db/queries/getCampaign';
//nextjs
// import Script from 'next/script';
// import Image from 'next/image';
// import Link from 'next/link';
//components
// import Wings from '@/components/layout/Wings/Wings';
import Button from '@/components/layout/Button/Button';
import Galaxy from '@/components/h1/Galaxy/Galaxy';
// import War from '@/components/h1/War/War';
// import Timeline from '@/components/h1/Timeline/Timeline';
// import Active from '@/components/h1/Active/Active';
import Alerts from '@/components/h1/Alerts/Alerts';

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
            <Hero data={data} />

            <div className="gutters relative flex px-2 sm:px-24">
                <section id="about" className="bg-amber-200">
                    about
                </section>
                <section id="features" className="bg-fuchsia-600">
                    content here
                </section>
            </div>
            <div className="gutters relative flex px-2 sm:px-24">
                <section id="discord" className="bg-pink-300">
                    discord bot
                </section>
                <section id="api" className="bg-rose-500">
                    api
                </section>
            </div>

            <div className="gutters relative flex px-2 sm:px-24">
                <section id="game" className="bg-green-600">
                    game
                </section>
                <section id="roadmap" className="bg-indigo-500">
                    roadmap
                </section>
            </div>
        </>
    );
}

function Hero({ data }) {
    return (
        <div
            id="hero"
            className="z-0 grid h-[calc((100vh-50px)*1.111)] grid-cols-10 grid-rows-10 md:h-[calc(95vh-80px)]"
            //the height is /9*10 === *1.111 -> so that the first 9 cells take up (100vh-50px) and another cell remains below the fold.
        >
            <section
                id="alerts"
                className="z-40 col-start-1 col-end-11 row-start-1 row-end-3 flex h-1/2 overflow-hidden overflow-x-scroll"
            >
                <Alerts data={data} />
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
                        Don’t miss a moment of the action! Follow the Helldivers’ campaign
                        progress as they battle for peace, liberty, and managed democracy.
                        See which planets are under siege, which are liberated, and where
                        your next mission awaits.
                    </p>
                    <Button type="button" label="War Report" href="/war" umami="hero" />
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
    );
}

function Hero2({ data }) {
    return (
        //the height is /9*10 === *1.111 -> so that the first 9 cells take up (100vh-50px) and another cell remains below the fold.
        <div
            id="hero"
            // className="z-0 grid h-[calc((100vh-50px)*1.111)] grid-cols-10 grid-rows-10 gap-4 md:h-[calc(95vh-80px)] md:gap-8"
            className="z-0 grid h-[calc((100vh-50px)*1.111)] w-full grid-cols-10 grid-rows-10 gap-0 md:h-[calc(95vh-80px)]"
            //gap-4 md:gap-8
        >
            <section
                id="alerts"
                // className="z-40 w-screen bg-green-400"
                className="z-40 col-start-1 col-end-11 row-start-1 row-end-3 flex overflow-hidden overflow-x-scroll bg-amber-400"
            >
                <Alerts data={data} />
            </section>
        </div>
    );
}
