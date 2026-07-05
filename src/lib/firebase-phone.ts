'use client';

import { auth } from './firebase';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';

let confirmationResult: ConfirmationResult | null = null;

export function setupRecaptcha(containerId: string): RecaptchaVerifier {
  if ((window as any).recaptchaVerifier) {
    (window as any).recaptchaVerifier.clear();
  }
  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {},
  });
  (window as any).recaptchaVerifier = verifier;
  return verifier;
}

export async function sendFirebaseOtp(phone: string): Promise<void> {
  const verifier = setupRecaptcha('recaptcha-container');
  confirmationResult = await signInWithPhoneNumber(auth, phone, verifier);
}

export async function verifyFirebaseOtp(code: string): Promise<string> {
  if (!confirmationResult) throw new Error('Önce OTP gönderin');
  const result = await confirmationResult.confirm(code);
  const idToken = await result.user.getIdToken();
  return idToken;
}
