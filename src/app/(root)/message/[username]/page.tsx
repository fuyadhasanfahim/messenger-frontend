'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'recipient';
    timestamp: Date;
    files?: File[];
}

export default function MessagePage() {
    const { username } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const initialMessages: Message[] = [
            {
                id: '1',
                content: 'Hey there! How are you doing?',
                sender: 'recipient',
                timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            },
            {
                id: '2',
                content: `I'm good, thanks for asking! Just working on this new project.`,
                sender: 'user',
                timestamp: new Date(Date.now() - 3500000),
            },
            {
                id: '3',
                content: 'That sounds interesting. What kind of project is it?',
                sender: 'recipient',
                timestamp: new Date(Date.now() - 3400000),
            },
            {
                id: '4',
                content: `It's a messaging app with a modern UI. I'm using Next.js and shadcn components.`,
                sender: 'user',
                timestamp: new Date(Date.now() - 3300000),
            },
        ];
        setMessages(initialMessages);
    }, []);

    // Format timestamp
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Get initial for avatar fallback
    const getInitial = (name: string) => {
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className="flex-1 p-4">
            <div className="space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.sender === 'user'
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                    >
                        <div className="flex gap-2 max-w-[80%]">
                            {message.sender === 'recipient' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                                    />
                                    <AvatarFallback>
                                        {getInitial(username as string)}
                                    </AvatarFallback>
                                </Avatar>
                            )}

                            <div
                                className={`flex flex-col ${
                                    message.sender === 'user'
                                        ? 'items-end'
                                        : 'items-start'
                                }`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-2xl ${
                                        message.sender === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                    }`}
                                >
                                    <p>{message.content}</p>
                                    {message.files &&
                                        message.files.length > 0 && (
                                            <div className="mt-2 space-y-1">
                                                {message.files.map(
                                                    (file, index) => (
                                                        <div
                                                            key={index}
                                                            className="text-sm flex items-center gap-1"
                                                        >
                                                            <span className="truncate">
                                                                {file.name}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                </div>
                                <span className="text-xs text-muted-foreground mt-1">
                                    {formatTime(message.timestamp)}
                                </span>
                            </div>

                            {message.sender === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    </div>
                ))}

                {/* Date separator */}
                <div className="relative">
                    <Separator className="my-4" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                        Today
                    </div>
                </div>
            </div>

            {/* Add extra space at bottom to ensure messages aren't hidden behind the input */}
            <div className="h-4" />
        </div>
    );
}
