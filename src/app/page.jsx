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
import { formatNumber, addOrdinalSuffix } from '@/utils/utils';

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

    if (!query) {
        return (
            <div className="flex min-h-full w-full flex-col-reverse justify-center sm:flex-row">
                Loading...
            </div>
        );
    }

    const data = query;

    return (
        <>
            <Hero data={data} />

            <div className="gutters relative flex flex-wrap gap-8 bg-red-400">
                <About />
                <Features />
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
    const ButtonText = `Check the ${addOrdinalSuffix(data.season)} War Report`;

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
                className="z-20 col-start-1 col-end-11 row-start-2 row-end-7 sm:z-30 md:col-end-7 lg:row-end-9 2xl:col-end-6"
            >
                <div className="ml-4 mr-4 flex h-full flex-col gap-4 sm:ml-12 sm:mr-12 sm:gap-8 md:mr-0 lg:ml-24 lg:mr-0">
                    <h1 className="text-4xl font-black sm:text-5xl lg:text-7xl">
                        TRACK MANAGED DEMOCRACY ACROSS THE GALAXY
                    </h1>
                    <p className="max-w-[550px] text-[18px]">
                        Don’t miss a moment of the action! Follow the Helldivers’ campaign
                        progress as they battle for peace, liberty, and managed democracy.
                        See which planets are under siege, which are liberated, and where
                        your next mission awaits.
                    </p>
                    <Button umami="hero" type="button" href="/war" label={ButtonText} />
                </div>
            </section>

            <section
                id="stats"
                className="z-10 col-start-1 col-end-11 row-start-10 row-end-11 w-full md:col-end-7 md:row-start-7 lg:col-end-11 lg:row-start-9"
            >
                <div className="ml-4 mr-4 flex h-full flex-wrap items-center justify-between sm:ml-12 sm:mr-12 md:mr-0 lg:ml-24 lg:mr-24">
                    <HeroStats data={data} />
                </div>
            </section>

            <section
                id="map"
                className="z-30 col-start-1 col-end-11 row-start-6 row-end-10 overflow-hidden sm:z-10 md:col-start-6 md:row-start-2 md:row-end-11 lg:row-start-1"
            >
                <Galaxy data={data} />
            </section>
        </div>
    );
}

function HeroStats({ data }) {
    const players = data.statistics.reduce((total, enemy) => total + enemy.players, 0);
    const successful_missions = data.statistics.reduce(
        (total, enemy) => total + enemy.successful_missions,
        0,
    );
    const deaths = data.statistics.reduce((total, enemy) => total + enemy.deaths, 0n);
    const kills = data.statistics.reduce((total, enemy) => total + enemy.kills, 0n);

    return (
        <>
            <div className="flex w-1/4 flex-col md:w-1/2 lg:w-fit">
                <span className="text-3xl sm:text-4xl">{formatNumber(players)}</span>
                <span>Players Online</span>
            </div>
            <div className="flex w-1/4 flex-col md:w-1/2 lg:w-fit">
                <span className="text-3xl sm:text-4xl">
                    {formatNumber(successful_missions)}
                </span>
                <span>Missions Completed</span>
            </div>
            <div className="flex w-1/4 flex-col md:w-1/2 lg:w-fit">
                <span className="text-3xl sm:text-4xl">{formatNumber(deaths)}</span>
                <span>Fallen in Combat</span>
            </div>
            <div className="flex w-1/4 flex-col md:w-1/2 lg:w-fit">
                <span className="text-3xl sm:text-4xl">{formatNumber(kills)}</span>
                <span>Enemies killed</span>
            </div>
        </>
    );
}

function About() {
    return (
        <section id="about" className="w-min-[300px] w-1/3 bg-amber-900">
            <p>This was made as a passion project to pad my portfolio.</p>
        </section>
    );
}
function Features() {
    return (
        <section id="features" className="flex flex-grow bg-fuchsia-600">
            content here
        </section>
    );
}
