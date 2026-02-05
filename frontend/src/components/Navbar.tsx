"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await api.get('/auth/me');
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setIsLoggedIn(false);
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Event Tracker
        </Link>
        <div className="space-x-4">
          {!loading && (
            isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-red-500 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Register
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
