import type {NextApiRequest} from 'next';

function escapeMarkdown(text: string): string {
    return text.replace(/[_*[\]()~`>#+-=|{}.!]/g, '\\$&');
}

export async function sendTelegramMessage(req: NextApiRequest) {
    const {name, email, message, isPublic, showNameEmail, browserInfo} = req.body;
    const ipAddress = (Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : req.headers['x-forwarded-for']) || req.socket.remoteAddress || 'Unknown IP';
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const threadId = 2;

    const text = `
*Message*
    *Name*: ${escapeMarkdown(name)}
    *Email*: ${escapeMarkdown(email)}
    *Message*: ${escapeMarkdown(message)}
    *Public Message*: ${isPublic ? 'Yes' : 'No'}
    *Public Name&Email*: ${showNameEmail ? 'Yes' : 'No'}
    
*Browser Info*
    • User Agent: ${escapeMarkdown(browserInfo.userAgent)}
    • Language: ${escapeMarkdown(browserInfo.language)}
    • Screen Size: ${escapeMarkdown(browserInfo.screenSize)}
    • Window Size: ${escapeMarkdown(browserInfo.windowSize)}
    • Timezone: ${escapeMarkdown(browserInfo.timezone)}
    
    *IP Address*: ${escapeMarkdown(ipAddress)}
    `.trim();

    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'MarkdownV2',
            message_thread_id: threadId,
        }),
    });

    return response.ok;
}