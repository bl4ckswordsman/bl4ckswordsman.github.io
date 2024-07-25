/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UVAY0uS4jlV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import RootLayout from "@/app/layout";
import {sendMessage} from "@/lib/send-telegram-message";
import React, {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

const Guestbook = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [showNameEmail, setShowNameEmail] = useState(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendMessage({name, email, message, isPublic, showNameEmail});
        setName("");
        setEmail("");
        setMessage("");
        setIsPublic(true);
        setShowNameEmail(true);
        // TODO: Optional UI feedback (e.g., showing a success message)
    };

    return (
        <div className="m-4">
            <div className="w-full max-w-4xl mx-auto py-12 md:py-16">
                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Guestbook</h1>
                        <p className="mt-3 text-lg text-muted-foreground">Leave a message and share your thoughts
                            with
                            us.</p>
                    </div>
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
                                <Textarea required id="message" rows={4} placeholder="Enter your message"
                                          value={message}
                                          onChange={(e) => setMessage(e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is-public"
                                    checked={isPublic}
                                    onCheckedChange={(checked) => setIsPublic(checked as boolean)}
                                />
                                <Label htmlFor="is-public">Make message public</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="show-name-email"
                                    checked={showNameEmail}
                                    onCheckedChange={(checked) => setShowNameEmail(checked as boolean)}
                                />
                                <Label htmlFor="show-name-email">Make name and email public</Label>
                            </div>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Messages (placeholder)</h2> {/*TODO: Placeholder*/}
                        <div className="space-y-4">
                            <Card>
                                <CardContent className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium">John Doe</h3>
                                            <p className="text-muted-foreground">john@example.com</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">2023-07-24</p>
                                    </div>
                                    <p className="mt-4">This is a great website! I really enjoyed my visit.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium">Jane Smith</h3>
                                            <p className="text-muted-foreground">jane@example.com</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">2023-07-23</p>
                                    </div>
                                    <p className="mt-4">Awesome job on the design! Keep up the great work.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function GuestbookPage() {
    return (
        <RootLayout titleKey={"guestbook"}>
            <Guestbook/>
        </RootLayout>
    );
}