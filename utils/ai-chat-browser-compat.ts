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

interface CanCreateTextSessionResponse {
    isReadily: boolean;
    status: string | Error;
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

export async function checkCanCreateTextSession(): Promise<CanCreateTextSessionResponse> {
    try {
        // @ts-ignore
        const status = await window.ai.canCreateTextSession();
        return {
            isReadily: status === 'readily',
            status: status,
        };
    } catch (error) {
        return {
            isReadily: false,
            status: error instanceof Error ? error : new Error('An unknown error occurred.'),
        };
    }
}
