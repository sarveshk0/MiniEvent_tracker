'use client';

import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Calendar, LogOut, Menu, X, Plus } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Events', href: '/dashboard/events', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              EventTracker
            </span>
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                  pathname === item.href 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5",
                  pathname === item.href ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                )} />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center p-3 mb-4 rounded-xl bg-gray-50">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {user?.name?.[0] || 'U'}
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-end">
            <Link 
              href="/dashboard/events/new"
              className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
