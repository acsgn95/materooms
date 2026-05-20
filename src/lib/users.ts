import { callApi } from './api';
import type { AuthUser } from '@/types/api';

export type UserProfileUpdatePayload = Partial<{
  full_name: string;
  age: number;
  gender: string;
  city: string;
  neighborhood: string;
  occupation: string;
  budget_min: number;
  budget_max: number;
  bio: string;
  sleep_schedule: string;
  cleanliness_level: string;
  smoking: boolean;
  pets: boolean;
  guests: string;
  noise_tolerance: string;
}>;

export function getMe() {
  return callApi<AuthUser>({
    method: 'GET',
    url: '/users/me',
  });
}

export function updateMyProfile(payload: UserProfileUpdatePayload) {
  return callApi<AuthUser>({
    method: 'PATCH',
    url: '/users/me/profile',
    data: payload,
  });
}

export function deleteMyAccount() {
  return callApi<{ message: string }>({
    method: 'DELETE',
    url: '/users/me',
  });
}

export function getUser(userId: string) {
  return callApi<AuthUser>({
    method: 'GET',
    url: `/users/${userId}`,
  });
}
