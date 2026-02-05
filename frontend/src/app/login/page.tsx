'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';
import AuthFormLayout from '@/components/auth/AuthFormLayout';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const fillDemoDetails = () => {
    setValue('email', 'demo@example.com');
    setValue('password', 'password123');
  };

  const onSubmit = async (data: LoginFormValues) => {
    await login(data);
  };

  return (
    <AuthFormLayout
      title="Welcome Back"
      icon={LogIn}
      iconBgColor="bg-blue-50"
      iconColor="text-blue-600"
      footerText="Don't have an account?"
      footerLinkText="Create one for free"
      footerLinkHref="/register"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-6 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-6 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <LogIn className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-bold text-blue-900">Demo Account</span>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-blue-700/80 font-medium">Email: <span className="text-blue-900 font-bold select-all">demo@example.com</span></p>
            <p className="text-blue-700/80 font-medium">Pass: <span className="text-blue-900 font-bold select-all">password123</span></p>
          </div>
        </div>
        <button
          type="button"
          onClick={fillDemoDetails}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
        >
          Quick Fill
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="name@company.com"
              className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:text-sm"
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
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              {...register('password')}
              id="password"
              type="password"
              placeholder="••••••••"
              className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:text-sm"
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
        className="group relative flex w-full justify-center rounded-2xl border border-transparent bg-blue-600 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="mr-3 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Authenticating...
          </span>
        ) : (
          'Sign in to Dashboard'
        )}
      </button>
    </AuthFormLayout>
  );
}
