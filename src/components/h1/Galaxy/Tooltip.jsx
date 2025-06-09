import './Tooltip.css';
import { useRef, useState, useEffect } from 'react';
import enemies from '@/enums/enemies';
import score from '@/enums/score';
import map from '@/enums/map';

export default function Tooltip({ svgRef, json }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hover, setHover] = useState(null); //{ faction: "0", id: "1" }
    // const [map, setMap] = useState(map2);

    useEffect(() => {
        //#region Mouse Move
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });

            // Get the element under the mouse
            const el = document.elementFromPoint(event.clientX, event.clientY);

            // Check if it's a sector/path/circle in your SVG
            if (el && svgRef.current && svgRef.current.contains(el)) {
                const data = el.id.split('-');
                if (data.length !== 2) {
                    setHover(null);
                } else {
                    const hoverData = {
                        faction: data[0],
                        id: data[1],
                    };
                    setHover(hoverData);
                }
            } else {
                setHover(null);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
        //#endregion
    }, []);

    // useEffect(() => {
    //     //calculate data
    //     console.log(map, json);
    // }, [json]);

    if (!hover) return null;

    return (
        <div
            id="map__hover"
            role="tooltip"
            className={
                'pointer-events-none absolute z-50 flex flex-col items-start justify-center gap-1 bg-purple-500 p-2'
            }
            style={{ left: mousePos.x + 5, top: mousePos.y - 55 }}
        >
            <div className="flex items-center gap-2">
                <img
                    src={`/icons/factions/${hover?.faction}.webp`}
                    alt="Logo of Helldivers Bot, which is a cartoon depiction of a spy sattelite"
                    width={20}
                    height={20}
                />
                <span> {map[hover?.faction][hover?.id]}</span>
            </div>
            <progress value="70" max="100"></progress>
        </div>
    );
}

function generateScore(points, points_max) {
    const sector = [];
    const sections = 10;
    const sectionSize = points_max / sections;

    sector.push('spacer'); //the 0 position, which is the theoretically superearth.

    let lastActiveIndex = -1;

    for (let i = 1; i <= sections; i++) {
        if (points >= i * sectionSize) {
            sector.push('active');
            lastActiveIndex = i;
        } else {
            sector.push('lost');
        }
    }

    // Change the last 'active' to 'in_progress' if there was at least one active
    // if (lastActiveIndex !== -1) {
    //     sector[lastActiveIndex] = 'in_progress';
    // }

    if (points === points_max) {
        sector.push('active');
    } else {
        sector.push('lost');
        if (lastActiveIndex !== -1) {
            sector[lastActiveIndex] = 'in_progress';
        }
    }
    return sector;
}
