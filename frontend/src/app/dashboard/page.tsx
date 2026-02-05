'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { ApiResponse, DashboardData, AppEvent } from '@/types';
import { EventCardSkeleton } from '@/components/Skeleton';
import { Calendar, MapPin, Share2, MoreVertical, Search, Filter } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const typeParam = filter === 'all' ? '' : `&type=${filter}`;
      const response = await api.get<ApiResponse<DashboardData>>(`events?page=1&limit=20${typeParam}`);
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
  }, [filter]);

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
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Manage and track your events</p>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl w-fit">
          <button
            onClick={() => setFilter('upcoming')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all",
              filter === 'upcoming' ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all",
              filter === 'past' ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Past
          </button>
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all",
              filter === 'all' ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => <EventCardSkeleton key={i} />)
        ) : data?.events.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No events found</h3>
            <p className="text-gray-500 mb-6">Start by creating your first event</p>
            <Link 
              href="/dashboard/events/new"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Create Event
            </Link>
          </div>
        ) : (
          data?.events.map((event: AppEvent) => (
            <div key={event.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <Link href={`/dashboard/events/${event.id}`} className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate pr-4">
                    {event.title}
                  </h3>
                  <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider",
                    new Date(event.dateTime) > new Date() ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  )}>
                    {new Date(event.dateTime) > new Date() ? 'Soon' : 'Past'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-6 min-h-[40px]">
                  {event.description || 'No description provided.'}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500 font-medium">
                    <Calendar className="h-4 w-4 mr-3 text-blue-500" />
                    {formatDate(event.dateTime)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 font-medium">
                    <MapPin className="h-4 w-4 mr-3 text-red-400" />
                    {event.location}
                  </div>
                </div>
              </Link>

              <div className="px-6 pb-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    copyShareLink(event.shareToken);
                  }}
                  className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 p-2 -ml-2 rounded-lg hover:bg-blue-50 transition-all"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                <Link
                  href={`/dashboard/events/${event.id}`}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
