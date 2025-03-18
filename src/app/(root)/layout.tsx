import { AppSidebar } from '@/components/shared/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
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
                    <div className="p-4">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </section>
    );
}
