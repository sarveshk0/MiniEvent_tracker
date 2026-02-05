'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { ApiResponse, AppEvent } from '@/types';
import { Calendar, MapPin, Share2, ArrowLeft, Trash2, Edit, Users, Clock } from 'lucide-react';
import { formatDate, cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<AppEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get<ApiResponse<AppEvent>>(`events/${id}`);
        if (response.data.success) {
          setEvent(response.data.data);
        }
      } catch (error) {
        toast.error('Event not found');
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const response = await api.delete<ApiResponse<any>>(`events/${id}`);
      if (response.data.success) {
        toast.success('Event deleted successfully');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const copyShareLink = () => {
    if (!event?.shareToken) return;
    const url = `${window.location.origin}/events/share/${event.shareToken}`;
    navigator.clipboard.writeText(url);
    toast.success('Share link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link 
        href="/dashboard"
        className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 sm:p-12 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider",
                  new Date(event.dateTime) > new Date() ? "text-green-100" : "text-gray-100"
                )}>
                  {new Date(event.dateTime) > new Date() ? 'Upcoming' : 'Past Event'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold">{event.title}</h1>
              <p className="text-blue-100/90 max-w-2xl text-lg">
                {event.description || 'No description provided.'}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/dashboard/events/${id}/edit`}
                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-sm font-semibold transition-all"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
              <button
                onClick={copyShareLink}
                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-sm font-semibold transition-all"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center px-4 py-2 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-md border border-red-500/20 rounded-xl text-sm font-semibold text-white transition-all"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">Event Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Date</p>
                    <p className="text-gray-900 font-semibold">{formatDate(event.dateTime)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Location</p>
                    <p className="text-gray-900 font-semibold">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Last Updated</p>
                    <p className="text-gray-900 font-semibold">{formatDate(event.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">Engagement</h2>
              
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-gray-900 text-lg">Attendees</span>
                  </div>
                  <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600">
                    0 Registered
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Attendee tracking is coming soon. You'll be able to see who's joining your event here.
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2">Share your event!</h4>
                <p className="text-sm text-blue-700/80 mb-4">
                  Copy the share link and send it to your guests so they can view the event details.
                </p>
                <button
                  onClick={copyShareLink}
                  className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl shadow-sm hover:shadow-md transition-all border border-blue-100"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
