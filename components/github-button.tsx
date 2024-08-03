import {GitHubLogoIcon} from "@radix-ui/react-icons"
import {Button} from "@/components/ui/button"

interface GithubButtonProps {
    link: string;
}

export function GithubButton({link}: GithubButtonProps) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
                <GitHubLogoIcon className="h-4 w-4"/>
            </Button>
        </a>
    )
}