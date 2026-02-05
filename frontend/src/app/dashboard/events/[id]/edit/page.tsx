'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { ApiResponse, AppEvent } from '@/types';
import EventForm from '@/components/events/EventForm';
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<AppEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      const response = await api.patch<ApiResponse<any>>(`events/${id}`, data);
      if (response.data.success) {
        toast.success('Event updated successfully!');
        router.push(`/dashboard/events/${id}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!event) return null;

  // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
  const date = new Date(event.dateTime);
  const formattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  const initialData = {
    title: event.title,
    description: event.description || '',
    location: event.location,
    dateTime: formattedDate,
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link 
        href={`/dashboard/events/${id}`}
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Event Details
      </Link>

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Edit Event</h1>
        <p className="text-gray-500 mb-10">Update your event details below.</p>
        
        <EventForm 
          initialData={initialData} 
          onSubmit={onSubmit} 
          isLoading={saving} 
          submitLabel="Update Event" 
        />
      </div>
    </div>
  );
}
