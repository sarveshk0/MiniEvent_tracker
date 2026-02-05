export interface User {
  id: number;
  email: string;
  name: string | null;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AppEvent {
  id: number;
  title: string;
  description: string | null;
  dateTime: string;
  location: string;
  shareToken: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    email: string;
    name: string | null;
  };
}

export interface DashboardData {
  events: AppEvent[];
  total: number;
}
