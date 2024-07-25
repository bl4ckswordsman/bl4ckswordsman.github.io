export async function getGuestbookEntries(): Promise<any[]> {
    try {
        const response = await fetch('/api/internal/get-guestbook-entry');
        if (!response.ok) {
            console.error('Failed to fetch guestbook entries');
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching guestbook entries:', error);
        return [];
    }
}