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

export async function loginWithFirebaseToken(idToken: string, profileData?: { full_name?: string; city?: string; kvkk_consent?: boolean }): Promise<AuthResponse> {
  const auth = await callApi<AuthResponse>({
    method: 'POST',
    url: '/auth/firebase/phone',
    data: { id_token: idToken, ...profileData },
  });
  tokenStorage.set(auth.access_token, auth.refresh_token);
  return auth;
}

export function sendEmailOtp(email: string, purpose: OtpPurpose) {
  return callApi<{ expires_in: number }>({
    method: 'POST',
    url: '/auth/send-otp/email',
    data: { email, purpose },
  });
}

export function verifyEmailOtp(email: string, code: string, purpose: OtpPurpose) {
  return callApi<VerifyOtpResponse>({
    method: 'POST',
    url: '/auth/verify-otp/email',
    data: { email, code, purpose },
  });
}

export async function loginWithEmail(email: string, password: string): Promise<AuthResponse> {
  const auth = await callApi<AuthResponse>({
    method: 'POST',
    url: '/auth/login/email',
    data: { email, password },
  });
  tokenStorage.set(auth.access_token, auth.refresh_token);
  return auth;
}

export async function registerWithEmail(
  tempToken: string,
  password: string,
  passwordConfirm: string,
  payload: RegisterPayload
): Promise<AuthResponse> {
  const auth = await callApi<AuthResponse>({
    method: 'POST',
    url: '/auth/register/email',
    data: { password, password_confirm: passwordConfirm, ...payload },
    headers: authHeader(tempToken),
  });
  tokenStorage.set(auth.access_token, auth.refresh_token);
  return auth;
}

export function requestPasswordReset(email: string) {
  return callApi<{ message: string }>({
    method: 'POST',
    url: '/auth/password-reset/request',
    data: { email },
  });
}

export function confirmPasswordReset(token: string, password: string) {
  return callApi<{ message: string }>({
    method: 'POST',
    url: '/auth/password-reset/confirm',
    data: { token, password },
  });
}

export function logout() {
  tokenStorage.clear();
}
