// 'use client';
import './Timeline.css';
// import { timeAgo, timeUntil } from '@/utils/time';
import Image from 'next/image';
import humanizeDuration from 'humanize-duration';
//
import Event from '@/components/h1/Event/Event';

export default function Timeline({ data }) {
    const events = [...data.defend_events, ...data.attack_events].sort(
        (a, b) => b.start_time - a.start_time,
    );

    if (events.length === 0) {
        return null;
    }

    return (
        <section
            id="timeline"
            className="flex flex-col gap-4"
            // className="flex flex-col gap-8 sm:max-h-[86vh] sm:overflow-y-auto sm:p-0"
        >
            <h2>Timeline</h2>
            <div className="flex flex-col gap-4 sm:overflow-y-auto">
                {events ?
                    <div className="flex flex-col gap-4 overflow-y-auto">
                        {events.map((event) => (
                            <Event key={event.event_id} event={event} />
                        ))}
                    </div>
                :   null}
            </div>
        </section>
    );
}

function util_evaluate_progress(event) {
    // Get the current time as a timestamp
    const currentTime = Math.floor(Date.now() / 1000);

    // Calculate total time in milliseconds
    const totalTime = event.end_time - event.start_time;
    // console.log('totalTime', totalTime);

    // Calculate elapsed time in milliseconds
    const elapsedTime = currentTime - event.start_time;
    // console.log('elapsedTime', elapsedTime);

    // Calculate remaining time in milliseconds
    const remainingTime = event.end_time - currentTime;
    // console.log('remainingTime', remainingTime);

    // Calculate the expected rate of progress (points per millisecond)
    const expectedRate = event.points_max / totalTime;

    // Calculate the current rate of progress (points per millisecond)
    const currentRate = event.points / elapsedTime;

    // Calculate the expected points by now
    const expectedPoints = expectedRate * elapsedTime;

    // Calculate the remaining points
    const remainingPoints = event.points_max - event.points;

    // Calculate the required rate for the remaining time (points per millisecond)
    const requiredRate = remainingPoints / remainingTime;

    // 10% buffer
    const buffer = expectedPoints * 0.1;
    // Determine the progress status
    let status;
    if (event.points > expectedPoints + buffer) {
        status = 'Ahead';
    } else if (event.points < expectedPoints) {
        status = 'Behind';
    } else {
        status = 'On track';
    }

    let pointDifference = Math.abs(expectedPoints - event.points);

    const progress = {
        expectedRate: expectedRate.toFixed(6), // Adjust precision as needed
        currentRate: currentRate.toFixed(6),
        expectedPoints: expectedPoints.toFixed(0),
        remainingPoints: remainingPoints.toFixed(0),
        requiredRate: requiredRate.toFixed(6),
        status: status,
        // rateStatus: rateStatus,
    };

    if (event.status === 'active') {
        return `${status} by ${pointDifference.toFixed(0)} points`;
    }
    // if (event.status === 'success') {
    //     return `tbd`;
    // }
    // if (event.status === 'fail') {
    //     return `Lost ${pointDifference.toFixed(0)} points`;
    // }

    // if (event.status === 'success') {
    //     const remaining_minutes = Math.abs(120 - Math.floor(elapsedTime / 60));
    //     const win_text =
    //         remaining_minutes > 1 ?
    //             `${remaining_minutes} minutes`
    //             : `${remaining_minutes} minute`;

    //     return `Won with ${win_text} to spare.`;
    // }
    // if (event.status === 'failure') {
    //     return `Lost ${pointDifference.toFixed(0)} points`;
    // }
}
