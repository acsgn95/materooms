'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Phone } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useI18n } from '@/i18n/I18nProvider';

type AuthMethod = 'phone' | 'email';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const { t } = useI18n();

  const [step, setStep] = useState<'contact' | 'otp'>('contact');
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const contactValue = authMethod === 'phone' ? phone : email;
  const contactTarget = t(`auth.contactTarget.${authMethod}`, { value: contactValue });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setStep('otp');
      setLoading(false);
    }, 500);
  };

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    const next = [...otp];
    digits.forEach((d, i) => {
      next[i] = d;
    });
    setOtp(next);
    otpRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({
        id: 'u1',
        phone: authMethod === 'phone' ? phone : '',
        email: authMethod === 'email' ? email : undefined,
        name: 'Ahmet Yılmaz',
        city: 'İstanbul',
        verificationBadges: authMethod === 'phone' ? ['phone_verified', 'id_verified'] : ['id_verified'],
        flatmateScore: 720,
      }, 'mock-token-xyz');
      router.push('/dashboard');
    }, 500);
  };

  const resetToContactStep = () => {
    setOtp(['', '', '', '', '', '']);
    setStep('contact');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="h-0.5 bg-secondary" />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <Link href="/" className="block text-center text-white font-bold tracking-[0.3em] text-xs uppercase mb-12 hover:text-secondary transition">
            MateRooms
          </Link>

          <h1 className="text-3xl font-serif font-light text-white mb-2">{t('auth.welcome')}</h1>
          <p className="text-white/40 mb-8 text-sm">{t('auth.loginSubtitle')}</p>

          {step === 'contact' && (
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-2 rounded-full bg-white/5 p-1">
                {(['phone', 'email'] as AuthMethod[]).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setAuthMethod(method)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      authMethod === method ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {t(`auth.methods.${method}`)}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">
                  {t(`auth.fields.${authMethod}`)}
                </label>
                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-800 px-4 transition-all focus-within:border-transparent focus-within:ring-2 focus-within:ring-[#E8192C]">
                  {authMethod === 'phone'
                    ? <Phone className="flex-shrink-0 text-white/30" size={18} />
                    : <Mail className="flex-shrink-0 text-white/30" size={18} />}
                  <input
                    type={authMethod === 'phone' ? 'tel' : 'email'}
                    placeholder={authMethod === 'phone' ? '+90 5XX XXX XXXX' : t('auth.placeholders.email')}
                    value={contactValue}
                    onChange={(e) => authMethod === 'phone' ? setPhone(e.target.value) : setEmail(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent py-3 text-white placeholder:text-white/30 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-40">
                {loading ? t('auth.buttons.sending') : t('auth.buttons.sendOtp')}
              </button>
              <p className="text-center text-sm text-white/40">
                {t('auth.links.noAccount')}{' '}
                <Link href="/auth/register" className="text-secondary hover:underline">{t('auth.links.signup')}</Link>
              </p>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">{t('auth.fields.otp')}</label>
                <p className="text-white/40 text-sm mb-4">{t('auth.otpSent', { target: contactTarget })}</p>
                <div className="grid grid-cols-6 gap-2" onPaste={handleOtpPaste}>
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="input-field text-center text-xl font-bold p-2"
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="btn-primary w-full disabled:opacity-40"
              >
                {loading ? t('auth.buttons.loggingIn') : t('auth.buttons.login')}
              </button>
              <button type="button" onClick={resetToContactStep} className="w-full text-secondary text-sm hover:underline">
                {t('auth.buttons.backLogin')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
