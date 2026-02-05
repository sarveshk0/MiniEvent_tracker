'use client';

import EventForm from '@/components/events/EventForm';
import api from '@/lib/api';
import { ApiResponse } from '@/types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post<ApiResponse<any>>('events', data);
      if (response.data.success) {
        toast.success('Event created successfully!');
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link 
        href="/dashboard"
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </Link>

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create New Event</h1>
        <p className="text-gray-500 mb-10">Fill in the details to schedule your next event.</p>
        
        <EventForm onSubmit={onSubmit} isLoading={loading} submitLabel="Create Event" />
      </div>
    </div>
  );
}
