import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import Turnstile from "react-turnstile";
import {sendMessage} from "@/lib/send-guestbook-message";

interface GuestbookFormProps {
    onSuccess: () => void;
}

const GuestbookForm: React.FC<GuestbookFormProps> = ({onSuccess}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [showNameEmail, setShowNameEmail] = useState(true);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!turnstileToken) {
            alert("Please complete the CAPTCHA challenge.");
            return;
        }
        await sendMessage({name, email, message, isPublic, showNameEmail, turnstileToken});
        setName("");
        setEmail("");
        setMessage("");
        setIsPublic(true);
        setShowNameEmail(true);
        onSuccess();
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                        Name
                    </label>
                    <div className="mt-1">
                        <Input id="name" type="text" placeholder="Enter your name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                        Email
                    </label>
                    <div className="mt-1">
                        <Input id="email" type="email" placeholder="Enter your email" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
                    Message*
                </label>
                <div className="mt-1">
                    <Textarea required id="message" rows={4} placeholder="Enter your message" value={message}
                              onChange={(e) => setMessage(e.target.value)}/>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox id="is-public" checked={isPublic}
                              onCheckedChange={(checked) => setIsPublic(checked as boolean)}/>
                    <Label htmlFor="is-public">Make message public</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="show-name-email" checked={showNameEmail}
                              onCheckedChange={(checked) => setShowNameEmail(checked as boolean)}/>
                    <Label htmlFor="show-name-email">Make name and email public</Label>
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-between w-full">
                <Turnstile
                    sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onVerify={(token) => setTurnstileToken(token)}
                />
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
};

export default GuestbookForm;