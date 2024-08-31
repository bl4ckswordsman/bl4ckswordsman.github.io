import { parseString } from 'xml2js';

interface GraphData {
    title: string;
    dates: string[];
    counts: number[];
}

function interpolateDates(startDate: string, endDate: string, count: number): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray: string[] = [];

    const step = (end.getTime() - start.getTime()) / (count - 1);

    for (let i = 0; i < count; i++) {
        const date = new Date(start.getTime() + (step * i));
        dateArray.push(date.toISOString().split('T')[0]);
    }

    return dateArray;
}

export function parseSVG(svgString: string): Promise<GraphData> {
    return new Promise((resolve, reject) => {
        parseString(svgString, (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            const graphData: GraphData = {
                title: '',
                dates: [],
                counts: []
            };

            const textElements = result.svg.text || [];
            console.log('All text elements:', textElements);

            // Extract title (last text element)
            graphData.title = textElements[textElements.length - 1]._;

            // Extract x-axis data (dates)
            const dateTexts = textElements.slice(0, 5).map((text: any) => text._);
            graphData.dates = interpolateDates(dateTexts[0], dateTexts[4], 30);

            // Extract max y-axis value (second last text element)
            const maxValue = parseFloat(textElements[textElements.length - 2]._);
            console.log('Calculated max value:', maxValue);

            // Extract y-axis data (counts)
            const pathElements = result.svg.path || [];
            const dataPath = pathElements.find((path: any) =>
                path.$.style && path.$.style.includes('fill:rgba(0,116,217,0.3)')
            );

            if (dataPath) {
                const pathData = dataPath.$.d;
                const points = pathData.split('L').slice(1, -3);  // Exclude the last three points (closing the path)
                graphData.counts = points.map((point: string) => {
                    const [, y] = point.trim().split(' ');
                    return Math.floor((273 - parseFloat(y)) / (273 - 11) * maxValue);
                });
                console.log('Calculated counts:', graphData.counts);
            } else {
                console.log('No data path found');
            }

            resolve(graphData);
        });
    });
}