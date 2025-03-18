'use client';

import { Label } from '@/components/ui/label';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
} from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { ComponentProps } from 'react';

const mails = [
    {
        name: 'Alice Smith',
        username: 'alicesmith',
        email: 'alicesmith@example.com',
        subject: 'Re: Project Update',
        date: 'Yesterday',
        teaser: "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
];

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar
            collapsible="icon"
            className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
            {...props}
        >
            <Sidebar collapsible="none" className="hidden flex-1 md:flex">
                <SidebarHeader className="gap-3.5 border-b p-4">
                    <div className="flex w-full items-center justify-between">
                        <div className="text-base font-medium text-foreground">
                            Inbox
                        </div>
                        <Label className="flex items-center gap-2 text-sm">
                            <span>Unreads</span>
                            <Switch className="shadow-none" />
                        </Label>
                    </div>
                    <SidebarInput placeholder="Type to search..." />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="px-0">
                        <SidebarGroupContent>
                            {mails.map(
                                (
                                    { date, name, subject, teaser, username },
                                    index
                                ) => (
                                    <a
                                        href={`/message/${username}`}
                                        key={index}
                                        className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    >
                                        <div className="flex w-full items-center gap-2">
                                            <span>{name}</span>
                                            <span className="ml-auto text-xs">
                                                {date}
                                            </span>
                                        </div>
                                        <span className="font-medium">
                                            {subject}
                                        </span>
                                        <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                                            {teaser}
                                        </span>
                                    </a>
                                )
                            )}
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </Sidebar>
    );
}
