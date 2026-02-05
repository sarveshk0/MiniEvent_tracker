'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { ApiResponse, AppEvent } from '@/types';
import { Calendar, MapPin, User, Loader2, Share2, Info } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Skeleton from '@/components/Skeleton';
import toast from 'react-hot-toast';

export default function PublicSharePage() {
  const { token } = useParams();
  const [event, setEvent] = useState<AppEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get<ApiResponse<AppEvent>>(`events/share/${token}`);
        if (response.data.success) {
          setEvent(response.data.data);
        }
      } catch (error) {
        toast.error('Event not found or shared link is invalid');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchEvent();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading shared event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-4">
          <Info className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Event Not Found</h1>
        <p className="text-gray-500 mt-2">The link might have expired or been deleted.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-12 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                Shared Event
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
              {event.title}
            </h1>
            <p className="text-blue-100 text-lg opacity-90 italic">
              "Invite to join the special gathering"
            </p>
          </div>

          <div className="p-8 sm:p-12 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">When</p>
                  <p className="text-gray-900 font-semibold">{formatDate(event.dateTime)}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-12 w-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">Where</p>
                  <p className="text-gray-900 font-semibold">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">Hosted By</p>
                  <p className="text-gray-900 font-semibold">{event.user?.name || 'Anonymous'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Event Description
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {event.description || 'No description available for this event.'}
              </p>
            </div>

            <button
              onClick={() => {
                navigator.share({
                  title: event.title,
                  text: event.description || '',
                  url: window.location.href,
                }).catch(() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Link copied to clipboard!');
                });
              }}
              className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center group"
            >
              <Share2 className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              Share this Event
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-gray-400 text-sm">
          Powered by <span className="font-bold text-gray-600">EventTracker</span>
        </p>
      </div>
    </div>
  );
}
