// 'use client';
import './Timeline.css';

export default function Timeline({ data }) {
    const events = [...data.defend_events, ...data.attack_events];
    events.sort((a, b) => b.start_time - a.start_time);

    return (
        <section
            id="timeline"
            className="flex flex-col gap-4"
            // className="flex flex-col gap-8 sm:max-h-[86vh] sm:overflow-y-auto sm:p-0"
        >
            <h2
                className="text-3xl uppercase"
                style={{ fontFamily: 'Insignia, sans-serif' }}
            >
                Timeline
            </h2>
            <div className="flex flex-col gap-4 sm:overflow-y-auto">
                {events ?
                    <div id="timeline" className="flex flex-col gap-4 overflow-y-auto">
                        {events.map((event) => generateEvent(event))}
                    </div>
                :   null}
            </div>
        </section>
    );
}

function generateEvent(event) {
    let type = null;
    if (event?.region) {
        type = 'Defend';
    } else {
        type = 'Attack';
    }
    const start = new Date(event.start_time * 1000).toLocaleString('en-GB');
    const end = new Date(event.end_time * 1000).toLocaleString('en-GB');

    return (
        <article
            id="event"
            key={event.event_id}
            className={`flex flex-col gap-2 rounded-sm p-2 ${type} ${event?.status} ${event?.status === 'active' ? 'active' : ''}`}
        >
            <h3>{type} Event</h3>
            Started at {start}
            <br />
            Finished at {end}
            <br />
            {event.status}
        </article>
    );
}
