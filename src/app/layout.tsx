import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store/app-store';
import { RoleSwitcherBar } from '@/components/common/RoleSwitcherBar';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { MobileBottomNav } from '@/components/common/MobileBottomNav';

export const metadata: Metadata = {
  title: 'ShramSetu | Cooperative-First Digital Public Service Operating System',
  description: 'Connecting households, communities, and cooperatives with verified workers, guaranteed protected wage floors, and transparent digital settlements.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white pb-16 md:pb-0">
        <AppProvider>
          {/* Top Sticky Demo Role Switcher */}
          <RoleSwitcherBar />
          
          {/* Main App Header */}
          <Header />
          
          {/* Page Content */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          
          {/* Global Civic Footer */}
          <Footer />

          {/* Persistent Mobile Bottom Navigation Dock */}
          <MobileBottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
