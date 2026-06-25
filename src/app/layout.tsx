import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { headers } from 'next/headers';
import Link from 'next/link';
import './globals.css';

import { AppSidebar } from '@/components/app-sidebar';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NexusRealm',
  description: 'Tools for D&D 5e.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <AppSidebar user={session ? session.user : undefined} />
            <SidebarInset>
              <header className="fixed bg-background flex h-14 items-center w-full gap-2 border-b px-4">
                <SidebarTrigger />
                <AppBreadcrumb />
                <Button variant="outline" className="ml-auto">
                  <Link href="https://github.com/StormbringerDev/nexusrealm" target="_blank">
                    Source Code
                  </Link>
                </Button>
                <ModeToggle />
              </header>
              <main className="flex-1 p-4 mt-14">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
