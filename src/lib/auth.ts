import { callApi, tokenStorage, authHeader } from './api';

export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.startsWith('90') && digits.length === 12) return `+${digits}`;
  if (digits.startsWith('0') && digits.length === 11) return `+90${digits.slice(1)}`;
  if (digits.length === 10) return `+90${digits}`;
  return `+${digits}`;
}

export function isValidTrPhone(input: string): boolean {
  return /^\+90[0-9]{10}$/.test(normalizePhone(input));
}

import type {
  AuthResponse,
  OtpPurpose,
  RegisterPayload,
  SendOtpResponse,
  VerifyOtpResponse,
} from '@/types/api';

export function sendOtp(phone: string, purpose: OtpPurpose) {
  return callApi<SendOtpResponse>({
    method: 'POST',
    url: '/auth/send-otp',
    data: { phone, purpose },
  });
}

export function verifyOtp(phone: string, code: string, purpose: OtpPurpose) {
  return callApi<VerifyOtpResponse>({
    method: 'POST',
    url: '/auth/verify-otp',
    data: { phone, code, purpose },
  });
}

export async function loginWithCode(phone: string, code: string): Promise<AuthResponse> {
  const auth = await callApi<AuthResponse>({
    method: 'POST',
    url: '/auth/login',
    data: { phone, code },
  });
  tokenStorage.set(auth.access_token, auth.refresh_token);
  return auth;
}

export async function registerWithTempToken(
  tempToken: string,
  payload: RegisterPayload
): Promise<AuthResponse> {
  const auth = await callApi<AuthResponse>({
    method: 'POST',
    url: '/auth/register',
    data: payload,
    headers: authHeader(tempToken),
  });
  tokenStorage.set(auth.access_token, auth.refresh_token);
  return auth;
}

export function logout() {
  tokenStorage.clear();
}
