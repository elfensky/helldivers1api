'use client';
import { useRef } from 'react';
import Script from 'next/script';
import Map from '@/components/h1/Galaxy/Map';
import Tooltip from '@/components/h1/Galaxy/Tooltip';
import Wings from '@/components/layout/Wings/Wings';
//enums
import factions from '@/enums/factions';
import map from '@/enums/map';
//time
import { elapsedSeasonTime } from '@/utils/time';

export default function Galaxy({ data, rebroadcast }) {
    const svgRef = useRef(null);

    processCampaigns(data);
    processDefendEvents(data);
    processAttackEvents(data);

    const elapsedTime = elapsedSeasonTime(data?.statistics[0]?.season_duration);

    return (
        <>
            <section
                id="galaxy"
                className="mx-4 mb-4 flex flex-grow-[4] flex-col items-center gap-4 sm:mx-0"
            >
                {/* <h2>
                    <Wings>{`Season ${data.season}`}</Wings>
                </h2> */}

                {/* <p className="gap-2">
                    <span>Day {elapsedTime.days}</span> <span>Players 999</span>
                </p> */}
                <Map svgRef={svgRef} map={map} />
                <Tooltip svgRef={svgRef} data={data} map={map} />
            </section>
        </>
    );
}

function processCampaigns(data) {
    data?.campaigns?.forEach((campaign, faction) => {
        const sector_count = 10; //10 sectors, 11th (homeworld) is determined by the attack event, not campaign progress.
        const points_max = campaign?.points_max;
        const points = campaign?.points;
        const points_per_sector = points_max / sector_count;

        const sectors_earned = Math.trunc(points / points_per_sector);
        const sectors_in_progress = sectors_earned + 1;
        const sectors_remaining = sector_count - sectors_earned - 1;

        if (campaign.status === 'active') {
            for (const region in map[faction]) {
                const total_points_for_sector = region * points_per_sector;

                if (region === '11') {
                    //this will later be overwritten by processAttackEvents
                    map[faction][region].status = 'lost';
                    map[faction][region].percent = 0;
                    // if (campaign.status === 'defeated') {
                    //     map[faction][region].status = 'captured';
                    //     map[faction][region].percent = 100;
                    // } else {
                    //     map[faction][region].status = 'lost';
                    //     map[faction][region].percent = 0;
                    //
                    // }
                } else if (region === sectors_in_progress.toString()) {
                    //if in progress, calculate module difference
                    const remaining_points =
                        points - (total_points_for_sector - points_per_sector);

                    map[faction][region].status = 'in_progress';
                    map[faction][region].points = points;
                    map[faction][region].points_max = total_points_for_sector;
                    map[faction][region].points_sector = remaining_points;
                    map[faction][region].points_sector_max = points_per_sector;
                    //percentage
                    const percent = (remaining_points / points_per_sector) * 100;
                    map[faction][region].percent = percent;
                    //
                } else if (region <= sectors_earned) {
                    //if captured, simply use the totals per sector.
                    map[faction][region].status = 'captured';
                    map[faction][region].points = total_points_for_sector;
                    map[faction][region].points_max = total_points_for_sector;
                    map[faction][region].points_sector = points_per_sector;
                    map[faction][region].points_sector_max = points_per_sector;
                    //percentage
                    const percent =
                        (total_points_for_sector / total_points_for_sector) * 100;
                    map[faction][region].percent = percent;
                    //
                } else {
                    //if it's here, it hasn't been reached yet, and the points are 0;
                    map[faction][region].status = 'lost';
                    map[faction][region].points = points;
                    map[faction][region].points_max = total_points_for_sector;
                    map[faction][region].points_sector = 0;
                    map[faction][region].points_sector_max = points_per_sector;
                    //percentage
                    map[faction][region].percent = 0;
                }
            }
        } else {
            for (const region in map[faction]) {
                map[faction][region].status = 'lost';
                map[faction][region].percent = 0;
            }
        }
    });
}

function processDefendEvents(data) {
    if (data?.defend_events?.length > 0) {
        data?.defend_events?.forEach((event) => {
            if (event?.status === 'active') {
                map[event?.enemy][event?.region].event = 'active';
            } else {
                map[event?.enemy][event?.region].event = 'idle';
            }
        });
    }
}

function processAttackEvents(data) {
    if (data?.attack_events?.length > 0) {
        data?.attack_events?.forEach((event) => {
            if (event?.status === 'active') {
                map[event?.enemy][11].percent = (event?.points / event?.points_max) * 100;
                map[event?.enemy][11].points = event?.points;
                map[event?.enemy][11].points_max = event?.points_max;
                // map[event?.enemy][11].points_sector = event?.points;
                // map[event?.enemy][11].points_sector_max = event?.points_max;
                map[event?.enemy][11].status = 'in_progress';
                map[event?.enemy][11].event = event;
            }
            if (event?.status === 'success') {
                map[event?.enemy][11].percent = (event?.points / event?.points_max) * 100;
                map[event?.enemy][11].points = event?.points;
                map[event?.enemy][11].points_max = event?.points_max;
                map[event?.enemy][11].status = 'captured';
                map[event?.enemy][11].event = event;
            }
        });
    }
}
