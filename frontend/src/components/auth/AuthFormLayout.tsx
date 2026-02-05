'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface AuthFormLayoutProps {
  children: ReactNode;
  title: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AuthFormLayout({
  children,
  title,
  icon: Icon,
  iconBgColor,
  iconColor,
  footerText,
  footerLinkText,
  footerLinkHref,
  onSubmit,
}: AuthFormLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl shadow-2xl shadow-gray-200 border border-gray-100">
        <div className="text-center">
          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${iconBgColor} ${iconColor} shadow-inner`}>
            <Icon className="h-7 w-7" />
          </div>
          <h2 className="mt-8 text-3xl font-extrabold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-3 text-sm text-gray-500 font-medium">
            {footerText}{' '}
            <Link href={footerLinkHref} className="font-bold text-blue-600 hover:text-blue-500 underline-offset-4 hover:underline transition-all">
              {footerLinkText}
            </Link>
          </p>
        </div>
        
        <form className="mt-10 space-y-6" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
