import { ImageResponse } from '@vercel/og';
import { firstBase, getTitle, MetadataKeys } from '@/app/metadata';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: { url: string | URL; }) {
    const { searchParams } = new URL(request.url);
    const titleKey = searchParams.get('titleKey') as MetadataKeys | null;

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
                <h1>{titleKey ? getTitle(titleKey) : firstBase}</h1>
                <h2>{firstBase}</h2>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}