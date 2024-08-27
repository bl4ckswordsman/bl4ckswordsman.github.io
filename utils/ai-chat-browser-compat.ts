export const isCompatibleBrowser = (browserInfo: { browserName: string, browserVersion: string, os: string }): {
    isChromeOrChromium: boolean,
    isVersionCompatible: boolean,
    isOSCompatible: boolean
} => {
    const {browserName, browserVersion, os} = browserInfo;

    // Check if browser is Chrome or Chromium
    const isChromeOrChromium = browserName.toLowerCase().includes('chrome') || browserName.toLowerCase().includes('chromium');

    // Check if version is equal or higher than 128
    const version = parseInt(browserVersion);
    const isVersionCompatible = !isNaN(version) && version >= 128;

    // Check if OS is supported (Linux, Windows, macOS)
    const isOSCompatible = ['linux', 'windows', 'macos'].includes(os.toLowerCase());

    return {isChromeOrChromium, isVersionCompatible, isOSCompatible};
};

interface AIAvailabilityResponse {
    isAvailable: boolean;
    status: AICapabilityAvailability | Error;
}

export enum AICapabilityAvailability {
    READILY = "readily",
    AFTER_DOWNLOAD = "after-download",
    NO = "no"
}

export const aiUnavailableString: string =
    'Built-in local AI functionality is not supported on this device.  \n Please check the requirements.';
export const aiReadyString: string =
    'Built-in local AI functionality is ready to use.';
export const browserReqsString =
    'Local AI functionality requires Chrome Dev or Canary.';
export const browserVersionReqsString =
    'Chrome Dev or Canary version 128.0.6545.0 or newer is required.'
export const osReqsString =
    'Local AI functionality is supported on Linux, Windows, and macOS.';

export async function checkAIAvailability(): Promise<AIAvailabilityResponse> {
    try {
        // @ts-ignore
        if (window.ai && typeof window.ai.assistant.capabilities === 'function') {
            // @ts-ignore
            const capabilities = await window.ai.assistant.capabilities();
            return {
                isAvailable: capabilities.available !== AICapabilityAvailability.NO,
                status: capabilities.available,
            };
        } else {
            return {
                isAvailable: false,
                status: new Error('AI assistant capabilities not available'),
            };
        }
    } catch (error) {
        return {
            isAvailable: false,
            status: error instanceof Error ? error : new Error('An unknown error occurred.'),
        };
    }
}
