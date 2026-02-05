'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { ApiResponse, DashboardData } from '@/types';
import { EventCardSkeleton } from '@/components/Skeleton';
import { Calendar, MapPin, Share2, MoreVertical, Search, Filter, Plus } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function EventsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get<ApiResponse<DashboardData>>(`events?page=1&limit=50`);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = data?.events.filter(event => 
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.location.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const copyShareLink = (token: string | null) => {
    if (!token) return;
    const url = `${window.location.origin}/events/share/${token}`;
    navigator.clipboard.writeText(url);
    toast.success('Share link copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Events</h1>
          <p className="text-gray-500">View and manage all your events in one place</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full sm:w-64"
            />
          </div>
          <Link 
            href="/dashboard/events/new"
            className="hidden sm:flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Event Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-28"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-16"></div></td>
                    <td className="px-6 py-4 text-right"><div className="h-4 bg-gray-100 rounded w-8 ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <p className="text-gray-500">No events found matching your search</p>
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/events/${event.id}`} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {event.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(event.dateTime)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {event.location}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider",
                        new Date(event.dateTime) > new Date() ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      )}>
                        {new Date(event.dateTime) > new Date() ? 'Upcoming' : 'Past'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => copyShareLink(event.shareToken)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Copy Share Link"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <Link
                          href={`/dashboard/events/${event.id}`}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
