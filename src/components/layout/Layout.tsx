
import React from 'react';
import AppSidebar from './AppSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="fixed w-64 sidebar-static">
        <AppSidebar />
      </div>
      
      <main className="flex-1 flex flex-col overflow-hidden ml-64">
        {children}
      </main>
    </div>
  );
}
