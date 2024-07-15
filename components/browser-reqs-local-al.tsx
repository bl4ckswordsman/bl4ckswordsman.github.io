import {ReactElement} from "react";
import {Link} from "@nextui-org/react";


const aiDocsLink = 'https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/mobilebasic';
const chromeDevLink = 'https://www.google.com/chrome/dev/';
const chromeCanaryLink = 'https://www.google.com/chrome/canary/';
const chromeFlag1Link = 'chrome://flags/#optimization-guide-on-device-model';
const chromeFlag2Link = 'chrome://flags/#prompt-api-for-gemini-nano';
const chromeComponentsLink = 'chrome://components/';

export const OtherReqs = (): ReactElement => (
    <>
        Detailed requirements and instructions can be found in this <Link isExternal showAnchorIcon
                                                                          style={{color: 'blue'}}
                                                                          href={aiDocsLink}>document</Link>.
    </>
);

export const RequirementsSummary = (): ReactElement => {
    return (
        <div>
            <p>You can download either Chrome Dev <Link isExternal showAnchorIcon
                                                        className="text-blue-600 hover:text-blue-800"
                                                        href={chromeDevLink}>here</Link> or Chrome Canary from <Link
                isExternal showAnchorIcon className="text-blue-600 hover:text-blue-800"
                href={chromeCanaryLink}>here</Link>.</p>

            <p className="mt-2">Then, you need to change the following flags in Chrome:</p>
            <ul className="list-disc pl-5">
                <li>Change <span
                    className="text-gray-900 bg-gray-100 text-sm font-mono rounded px-1">{chromeFlag1Link}</span> to &apos;Enabled
                    BypassPerfRequirement&apos;</li>
                <li>Change <span
                    className="text-gray-900 bg-gray-100 text-sm font-mono rounded px-1">{chromeFlag2Link}</span> to &apos;Enabled&apos;
                </li>
            </ul>

            <p className="mt-2">You can verify if the feature is ready to use by visiting <span
                className="text-gray-900 bg-gray-100 text-sm font-mono rounded px-1">{chromeComponentsLink}</span> and
                ensuring &apos;Optimization Guide On Device Model&apos; is present with a version greater or equal to
                2024.5.21.1031.</p>
        </div>
    );
};