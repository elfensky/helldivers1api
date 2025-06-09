'use client';
import { useRef } from 'react';
import Script from 'next/script';
import Map from '@/components/h1/Galaxy/Map';
import Tooltip from '@/components/h1/Galaxy/Tooltip';

export default function Galaxy({ data }) {
    const svgRef = useRef(null);
    const json = data?.data?.data?.json;

    return (
        <>
            <Map svgRef={svgRef} json={json} />
            <Tooltip svgRef={svgRef} json={json} />
            <Script src="/scripts/animateMap.js" strategy="lazyOnload" />
        </>
    );
}
