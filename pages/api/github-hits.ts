import {NextApiRequest, NextApiResponse} from 'next';
import {parseSVG} from '@/lib/parse-svg';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {repo} = req.query;

    if (!repo || typeof repo !== 'string') {
        return res.status(400).json({error: 'Repository parameter is required'});
    }

    try {
        const url = `https://hits.seeyoufarm.com/api/count/graph/dailyhits.svg?url=https://github.com/${repo}`;
        console.log(`Fetching data from: ${url}`);

        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to fetch data from ${url}`);
            return res.status(500).json({error: `Failed to fetch data from ${url}`});
        }

        const svgText = await response.text();
        console.log('SVG data received:', svgText.substring(0, 100) + '...');

        const graphData = await parseSVG(svgText);

        if (!graphData.dates.length || !graphData.counts.length) {
            console.error('Parsed data is incomplete or invalid.');
            return res.status(500).json({error: 'Unable to parse SVG data properly'});
        }

        const parsedData = graphData.dates.map((date, index) => ({
            date,
            hits: graphData.counts[index],
        }));

        res.status(200).json(parsedData);
    } catch (error) {
        console.error('Error fetching or processing SVG data for' + repo + ':', error);
        res.status(500).json({error: 'Failed to fetch or process SVG data for ' + repo});
    }
}