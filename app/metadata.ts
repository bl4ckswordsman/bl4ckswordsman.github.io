export const firstBase = "bl4ckswordsman";
const secondBase = "amarildo";
export const domainBase = "https://blackswordsman.vercel.app";

export const metadata = {
    titles: {
        home: '',
        portfolio: "Portfolio",
        github: "GitHub",
        aichat: "AI Chat Playground",
        stats: "GitHub Stats",
        guestbook: "Guestbook",
        repos: "GitHub Repositories",
        // Other page titles to be added here
    },
    descriptions: {
        home: `Welcome to ${firstBase} (aka ${secondBase})'s homepage!`,
        portfolio: `Discover ${firstBase}'s portfolio. A showcase of projects and skills.`,
        github: `Explore ${firstBase}'s GitHub related content.`,
        aichat: `Interact with the experimental Chrome built-in AI. Experience fast&local AI in action.`,
        stats: `View ${firstBase}'s GitHub stats like daily hits/visits and activity.`,
        guestbook: `Leave a message for ${firstBase} in the guestbook.`,
        repos: `Browse through ${firstBase}'s GitHub repositories.`,
        // Other page descriptions to be added here
    },
    generalDescription: `🚀 Explore the digital realm with ${firstBase} (aka ${secondBase})!
     Coding magic ✨, tech treasures 🖥️, and much more! (≧◡≦)`,
};

export type MetadataKeys = keyof typeof metadata.titles;

export function getTitle(pageKey: MetadataKeys): string {
    return metadata.titles[pageKey] || firstBase;
}

export function getFullTitle(pageKey: MetadataKeys): string {
    const pageTitle = metadata.titles[pageKey];
    return pageTitle ? `${firstBase} | ${pageTitle}` : firstBase;
}

export function getDescription(pageKey: MetadataKeys): string {
    return metadata.descriptions[pageKey] || "";
}