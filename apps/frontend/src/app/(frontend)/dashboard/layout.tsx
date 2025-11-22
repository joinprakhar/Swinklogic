'use client';

// import type { Metadata } from "next";
import { useState } from "react";
import Header from "./_dashboardComponents/Header";
import Navigation from "./_dashboardComponents/Navigation";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Navigation
          isOpen={isMobileMenuOpen}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
        />
        <main className="flex-1 p-6 overflow-y-auto lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}
