'use client';

import { AppSidebar } from '@/components/shared/app-sidebar';
import Header from '@/components/shared/Header';
import NavFooter from '@/components/shared/NavFooter';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            {pathname !== '/' ? (
                <section className="flex">
                    <SidebarProvider
                        style={
                            {
                                '--sidebar-width': '350px',
                            } as React.CSSProperties
                        }
                    >
                        <AppSidebar />
                        <SidebarInset>
                            <Header />
                            <ScrollArea className="h-[calc(100vh-140px)] w-full">
                                <section className="p-4">{children}</section>
                            </ScrollArea>
                            <NavFooter />
                        </SidebarInset>
                    </SidebarProvider>
                </section>
            ) : (
                <SidebarProvider
                    style={
                        {
                            '--sidebar-width': '350px',
                        } as React.CSSProperties
                    }
                >
                    <AppSidebar />
                    <SidebarInset>
                        <section className="p-4">
                            <div className="h-screen w-full flex items-center justify-center">
                                <h3 className="text-xl font-semibold">
                                    Select conversation to start chatting...
                                </h3>
                            </div>
                        </section>
                    </SidebarInset>
                </SidebarProvider>
            )}
        </>
    );
}
