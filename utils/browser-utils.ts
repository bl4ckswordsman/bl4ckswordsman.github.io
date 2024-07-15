export const getBrowserInfo = async () => {
    const navigatorUAData = (navigator as any).userAgentData;

    let browserName = "Unknown Browser";
    let browserVersion = "Unknown Version";
    let os = "Unknown OS";
    let browserVariant = "";

    if (navigatorUAData) {
        os = navigatorUAData.platform || "Unknown OS";

        const brand = navigatorUAData.brands.find((brand: any) => brand.brand !== "Not/A)Brand");
        if (brand) {
            browserName = brand.brand;
            browserVersion = brand.version;
        }

        if (navigator.userAgent.includes("Edg/")) {
            browserVariant = "Edge";
        } else if (navigator.userAgent.includes("Chrome/")) {
            if (navigator.userAgent.includes("Chrome/ Canary")) {
                browserVariant = "Canary";
            } else if (navigator.userAgent.includes("Chrome/ Dev")) {
                browserVariant = "Dev";
            }
        }
    } else {
        const userAgent = navigator.userAgent;

        const browserMatch = userAgent.match(/(Firefox|Chrome|Chromium|Safari|Edge|Opera|OPR|MSIE|Trident)\/?(\d+(\.\d+)?)/i);
        if (browserMatch) {
            browserName = browserMatch[1] === 'OPR' ? 'Opera' : browserMatch[1];
            browserVersion = browserMatch[2];
        }

        if (/Windows NT/.test(userAgent)) {
            os = "Windows";
        } else if (/Mac OS X/.test(userAgent)) {
            os = "macOS";
        } else if (/Android/.test(userAgent)) {
            os = "Android";
        } else if (/Linux/.test(userAgent)) {
            os = "Linux";
        } else if (/iOS/.test(userAgent) || /iPhone|iPad|iPod/.test(userAgent)) {
            os = "iOS";
        }

        if (userAgent.includes("Edg/")) {
            browserVariant = "Edge";
        } else if (userAgent.includes("Chrome/")) {
            if (userAgent.includes("Chrome/ Canary")) {
                browserVariant = "Canary";
            } else if (userAgent.includes("Chrome/ Dev")) {
                browserVariant = "Dev";
            }
        }
    }

    return {browserName, browserVersion, os, browserVariant};
};
