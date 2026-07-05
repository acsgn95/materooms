'use client';

import { auth } from './firebase';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';

let confirmationResult: ConfirmationResult | null = null;
let recaptchaVerifier: RecaptchaVerifier | null = null;

export async function sendFirebaseOtp(phone: string): Promise<void> {
  if (recaptchaVerifier) {
    try { recaptchaVerifier.clear(); } catch {}
    recaptchaVerifier = null;
  }

  const container = document.getElementById('recaptcha-container');
  if (container) container.innerHTML = '';

  recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    size: 'invisible',
    callback: () => {},
  });

  confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
}

export async function verifyFirebaseOtp(code: string): Promise<string> {
  if (!confirmationResult) throw new Error('Önce OTP gönderin');
  const result = await confirmationResult.confirm(code);
  const idToken = await result.user.getIdToken();
  return idToken;
}
