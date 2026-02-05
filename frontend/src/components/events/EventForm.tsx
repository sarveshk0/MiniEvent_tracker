'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, MapPin, Type, AlignLeft, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  dateTime: z.string().min(1, 'Date and time are required'),
  location: z.string().min(3, 'Location is required'),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  initialData?: Partial<EventFormValues>;
  onSubmit: (data: EventFormValues) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export default function EventForm({ initialData, onSubmit, isLoading, submitLabel = 'Save Event' }: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
            Event Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Type className="h-5 w-5" />
            </div>
            <input
              {...register('title')}
              id="title"
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none",
                errors.title && "border-red-300 focus:ring-red-500/10 focus:border-red-500"
              )}
              placeholder="Summer Tech Conference"
              aria-invalid={errors.title ? 'true' : 'false'}
            />
          </div>
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="dateTime" className="block text-sm font-semibold text-gray-700 mb-1">
              Date & Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Calendar className="h-5 w-5" />
              </div>
              <input
                {...register('dateTime')}
                id="dateTime"
                type="datetime-local"
                className={cn(
                  "w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none",
                  errors.dateTime && "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                )}
                aria-invalid={errors.dateTime ? 'true' : 'false'}
              />
            </div>
            {errors.dateTime && <p className="mt-1 text-xs text-red-500">{errors.dateTime.message}</p>}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <MapPin className="h-5 w-5" />
              </div>
              <input
                {...register('location')}
                id="location"
                className={cn(
                  "w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none",
                  errors.location && "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                )}
                placeholder="Central Park, NY"
                aria-invalid={errors.location ? 'true' : 'false'}
              />
            </div>
            {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <div className="relative">
            <div className="absolute top-3 left-4 pointer-events-none text-gray-400">
              <AlignLeft className="h-5 w-5" />
            </div>
            <textarea
              {...register('description')}
              id="description"
              rows={4}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
              placeholder="Tell us more about the event..."
            />
          </div>
        </div>

      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
        {submitLabel}
      </button>
    </form>
  );
}
