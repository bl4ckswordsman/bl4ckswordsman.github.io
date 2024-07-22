import {ImageResponse} from '@vercel/og';
import {firstBase, getTitle, MetadataKeys} from '@/app/metadata';
import React from "react";


export const config = {
    runtime: 'edge',
};

export default async function handler(request: { url: string | URL; }) {
    const {searchParams} = new URL(request.url);
    const titleKey = searchParams.get('titleKey') as MetadataKeys | null;
    const fontData = await fetch(
        new URL('../../assets/BebasNeue-Regular.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());

    /*    const title = titleKey && titleKey in metadata.titles ? metadata.titles[titleKey] : 'bl4ckswordsman';
        const description = titleKey && titleKey in metadata.descriptions ? metadata.descriptions[titleKey] : '';*/

    return new ImageResponse(
        (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 40,
                color: 'white',
                background: 'black',
                width: '100%',
                height: '100%',
                padding: '50px 200px',
                textAlign: 'center',
            }}>
                <picture>
                    <img
                        alt={"Berserk logo"}
                        height={200}
                        width={232}
                        src="data:image/svg+xml,%3Csvg width='48' height='48' fill='#d50000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M37,13L29,3l5.5,10L25,22V5l1-2l-1.5,0.5L24,1l-0.5,2.5L22,3l1,2v17l-9.5-9L19,3l-8,10l11,10.5L11,34	l12,12l1,1l1-1l12-12L26,23.5L37,13z M14.5,34l8.5-8.5v17.447L14.5,34z M33.5,34L25,42.947V25.5L33.5,34z' /%3E%3C/svg%3E"
                        style={{margin: '0 30px'}}
                    />
                </picture>
                <h1>{titleKey ? getTitle(titleKey) : firstBase}</h1>
                <h2>{firstBase}</h2>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    data: fontData,
                    name: 'Bebas Neue',
                    style: 'normal',
                },
            ]
        },
    );
}