'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import { UserPlus, Mail, Lock, User as UserIcon, LogIn } from 'lucide-react';
import AuthFormLayout from '@/components/auth/AuthFormLayout';
import Link from 'next/link';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function RegisterPage() {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    await signup(data);
  };

  return (
    <AuthFormLayout
      title="Create Account"
      icon={UserPlus}
      iconBgColor="bg-green-50"
      iconColor="text-green-600"
      footerText="Already have an account?"
      footerLinkText="Sign in instead"
      footerLinkHref="/login"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-6 p-4 bg-green-50/50 border border-green-100 rounded-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 bg-green-600 rounded-lg flex items-center justify-center text-white">
                <LogIn className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-bold text-green-900">Demo Account Available</span>
            </div>
            <div className="space-y-1 text-sm text-green-700/80 font-medium">
              <p>Email: <span className="text-green-900 font-bold">demo@example.com</span></p>
              <p>Pass: <span className="text-green-900 font-bold">password123</span></p>
            </div>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-500/20 transition-all"
          >
            Sign in now
          </Link>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              {...register('name')}
              id="name"
              type="text"
              placeholder="John Doe"
              className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-all focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10 sm:text-sm"
              aria-invalid={errors.name ? 'true' : 'false'}
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-xs text-red-500 font-bold flex items-center ml-1">
              <span className="h-1 w-1 bg-red-500 rounded-full mr-1.5" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="name@company.com"
              className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-all focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10 sm:text-sm"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-xs text-red-500 font-bold flex items-center ml-1">
              <span className="h-1 w-1 bg-red-500 rounded-full mr-1.5" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              {...register('password')}
              id="password"
              type="password"
              placeholder="••••••••"
              className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-all focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10 sm:text-sm"
              aria-invalid={errors.password ? 'true' : 'false'}
            />
          </div>
          {errors.password && (
            <p className="mt-2 text-xs text-red-500 font-bold flex items-center ml-1">
              <span className="h-1 w-1 bg-red-500 rounded-full mr-1.5" />
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative flex w-full justify-center rounded-2xl border border-transparent bg-green-600 py-4 text-sm font-bold text-white shadow-xl shadow-green-500/20 transition-all hover:bg-green-700 hover:shadow-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="mr-3 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Creating Account...
          </span>
        ) : (
          'Join EventTracker'
        )}
      </button>
    </AuthFormLayout>
  );
}
