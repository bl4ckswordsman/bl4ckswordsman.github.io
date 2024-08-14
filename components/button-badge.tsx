import React from 'react';
import {Button} from "@nextui-org/button";
import {LinkedInLogoIcon, GitHubLogoIcon} from "@radix-ui/react-icons";
import {FaGoogleScholar} from "react-icons/fa6";

type IconKey = 'linkedin' | 'github' | 'googlescholar' | string;

const iconMap: Record<IconKey, React.ReactNode> = {
    linkedin: <LinkedInLogoIcon/>,
    github: <GitHubLogoIcon/>,
    googlescholar: <FaGoogleScholar/>,
    // Other icons here
};

const buttonClasses: Record<IconKey, string> = {
    linkedin: 'bg-gradient-to-tr from-blue-700 to-blue-500',
    github: 'bg-gradient-to-tr from-gray-800 to-gray-600',
    googlescholar: 'bg-gradient-to-tr from-blue-600 to-blue-400',
    default: 'bg-gradient-to-tr from-blue-500 to-gray-300'
};

interface BadgeButtonProps {
    title: string;
    link: string;
    iconKey: IconKey;
}

const BadgeButton: React.FC<BadgeButtonProps> = ({title, link, iconKey}) => {
    const Icon = iconMap[iconKey] || null;
    const buttonClass = buttonClasses[iconKey] || buttonClasses.default;

    return (
        <Button
            variant="shadow"
            radius="full"
            className={`${buttonClass} text-white shadow-lg`}
            startContent={Icon}
            onClick={() => window.open(link, '_blank')}
        >
            {title}
        </Button>
    );
}

export default BadgeButton;