import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ─── Reusable Input ─────────────────────────────────────────────────────────── */
function AuthInput({ label, id, type = 'text', value, onChange, placeholder, error, autoComplete }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-label-md text-label-md text-on-surface dark:text-surface-white/80"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full px-4 py-3 rounded-xl bg-surface-container-low dark:bg-white/5 border ${
            error
              ? 'border-error dark:border-error focus:ring-error/40'
              : 'border-outline-variant dark:border-white/10 focus:border-coral-pulse dark:focus:border-coral-pulse'
          } text-on-surface dark:text-surface-white placeholder:text-on-surface-variant/50 dark:placeholder:text-surface-white/30 focus:outline-none focus:ring-2 focus:ring-coral-pulse/30 transition-all duration-200 text-body-md pr-${isPassword ? '12' : '4'}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-surface-white/40 hover:text-coral-pulse transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>
      {error && (
        <p className="text-error text-label-sm flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">error</span>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Floating career badges (decorative) ────────────────────────────────────── */
function FloatingBadge({ icon, label, className }) {
  return (
    <div
      className={`absolute flex items-center gap-2 bg-surface-white dark:bg-deep-indigo rounded-2xl px-4 py-2.5 shadow-lg dark:shadow-2xl border border-surface-variant/50 dark:border-white/10 pointer-events-none select-none ${className}`}
    >
      <span className="material-symbols-outlined text-coral-pulse text-[18px]">{icon}</span>
      <span className="font-title-md text-label-sm text-deep-indigo dark:text-surface-white font-semibold whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════════════════════════════════════════ */
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  function validate() {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.password) errs.password = 'Password is required.';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setServerError('');
    setLoading(true);
    try {
      await login({ email: form.email, password: form.password });
      navigate('/');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-deep-indigo flex transition-colors duration-300">
      {/* ── Left panel – form ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-16 relative z-10">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5 mb-10 self-start lg:self-center"
        >
          <span className="font-display-lg text-title-md font-bold text-deep-indigo dark:text-surface-white tracking-tight flex items-center">
            <span className="text-coral-pulse">Un</span>Charted
            <span className="material-symbols-outlined ml-1 text-coral-pulse text-[18px] animate-pulse">
              arrow_forward_ios
            </span>
          </span>
        </Link>

        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-indigo dark:text-surface-white mb-2">
              Welcome back 👋
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant/80">
              Log in to continue your career journey.
            </p>
          </div>

          {/* Server error banner */}
          {serverError && (
            <div className="mb-5 flex items-center gap-2 bg-error-container dark:bg-error/20 text-error dark:text-on-error px-4 py-3 rounded-xl border border-error/30 text-label-md">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <AuthInput
              label="Email"
              id="login-email"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@example.com"
              error={errors.email}
              autoComplete="email"
            />
            <AuthInput
              label="Password"
              id="login-password"
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="••••••••"
              error={errors.password}
              autoComplete="current-password"
            />

            {/* Forgot password */}
            <div className="flex justify-end -mt-2">
              <a
                href="#"
                className="text-label-sm text-coral-pulse hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="sunrise-gradient text-on-primary font-label-md text-label-md py-3.5 rounded-xl hover:shadow-lg sunrise-shadow transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-1"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  Signing in…
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-surface-variant dark:bg-white/10" />
            <span className="text-label-sm text-on-surface-variant dark:text-surface-white/30">or</span>
            <div className="flex-1 h-px bg-surface-variant dark:bg-white/10" />
          </div>

          {/* Switch to Sign Up */}
          <p className="text-center text-body-md text-on-surface-variant dark:text-surface-variant/80">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-coral-pulse font-semibold hover:underline transition-colors"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right panel – decorative ──────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-deep-indigo items-center justify-center">
        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-coral-pulse/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-glow/15 rounded-full blur-3xl" />

        {/* Central card */}
        <div className="relative z-10 text-center px-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl sunrise-gradient mb-6 shadow-2xl sunrise-shadow">
            <span className="material-symbols-outlined text-[40px] text-white">explore</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-surface-white mb-3">
            Chart your path
          </h2>
          <p className="font-body-md text-body-md text-surface-white/60 max-w-sm mx-auto">
            Take a 2-minute quiz and get AI-powered career recommendations tailored just for you.
          </p>
        </div>

        {/* Floating badges */}
        <FloatingBadge icon="design_services" label="UI Designer" className="top-20 left-10 animate-float-slow" />
        <FloatingBadge icon="trending_up" label="Product Manager" className="bottom-24 left-6 animate-float-medium" />
        <FloatingBadge icon="psychology" label="Data Scientist" className="top-32 right-8 animate-float-medium" />
        <FloatingBadge icon="code" label="Full Stack Dev" className="bottom-16 right-12 animate-float-slow" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SIGNUP PAGE
═══════════════════════════════════════════════════════════════════════════════ */
export function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // Password strength
  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'bg-error', 'bg-amber-glow', 'bg-tertiary', 'bg-primary-container'][strength];

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (!form.confirm) errs.confirm = 'Please confirm your password.';
    else if (form.confirm !== form.password) errs.confirm = 'Passwords do not match.';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setServerError('');
    setLoading(true);
    try {
      await register({ name: form.name.trim(), email: form.email, password: form.password });
      navigate('/');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-deep-indigo flex transition-colors duration-300">
      {/* ── Left panel – decorative (reversed for visual variety) ─────────────── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-deep-indigo items-center justify-center">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-tertiary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-coral-pulse/15 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl sunrise-gradient mb-6 shadow-2xl sunrise-shadow">
            <span className="material-symbols-outlined text-[40px] text-white">rocket_launch</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-surface-white mb-3">
            Your future starts here
          </h2>
          <p className="font-body-md text-body-md text-surface-white/60 max-w-sm mx-auto">
            Join thousands of students who discovered their perfect career path with UnCharted.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {[['10k+', 'Students'], ['95%', 'Satisfaction'], ['2 min', 'Quiz']].map(([num, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="font-headline-lg text-title-md font-bold text-coral-pulse">{num}</div>
                <div className="text-label-sm text-surface-white/50">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <FloatingBadge icon="school" label="Class XII Student" className="top-16 right-8 animate-float-slow" />
        <FloatingBadge icon="check_circle" label="Career Clarity" className="bottom-20 left-8 animate-float-medium" />
        <FloatingBadge icon="star" label="Top Match Found" className="top-36 left-6 animate-float-medium" />
      </div>

      {/* ── Right panel – form ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-16 relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 mb-8 self-start lg:self-center">
          <span className="font-display-lg text-title-md font-bold text-deep-indigo dark:text-surface-white tracking-tight flex items-center">
            <span className="text-coral-pulse">Un</span>Charted
            <span className="material-symbols-outlined ml-1 text-coral-pulse text-[18px] animate-pulse">
              arrow_forward_ios
            </span>
          </span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-7">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-indigo dark:text-surface-white mb-2">
              Create your account ✨
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant/80">
              Free forever. No credit card needed.
            </p>
          </div>

          {serverError && (
            <div className="mb-5 flex items-center gap-2 bg-error-container dark:bg-error/20 text-error dark:text-on-error px-4 py-3 rounded-xl border border-error/30 text-label-md">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <AuthInput
              label="Full Name"
              id="signup-name"
              type="text"
              value={form.name}
              onChange={set('name')}
              placeholder="Arjun Sharma"
              error={errors.name}
              autoComplete="name"
            />
            <AuthInput
              label="Email"
              id="signup-email"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@example.com"
              error={errors.email}
              autoComplete="email"
            />
            <div className="flex flex-col gap-1.5">
              <AuthInput
                label="Password"
                id="signup-password"
                type="password"
                value={form.password}
                onChange={set('password')}
                placeholder="Min. 8 characters"
                error={errors.password}
                autoComplete="new-password"
              />
              {/* Strength bar */}
              {form.password && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((s) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          s <= strength ? strengthColor : 'bg-surface-variant dark:bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-label-sm text-on-surface-variant dark:text-surface-white/50 w-10">
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>
            <AuthInput
              label="Confirm Password"
              id="signup-confirm"
              type="password"
              value={form.confirm}
              onChange={set('confirm')}
              placeholder="••••••••"
              error={errors.confirm}
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={loading}
              className="sunrise-gradient text-on-primary font-label-md text-label-md py-3.5 rounded-xl hover:shadow-lg sunrise-shadow transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  Creating account…
                </>
              ) : (
                <>
                  <span>Create Free Account</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </>
              )}
            </button>

            <p className="text-label-sm text-center text-on-surface-variant dark:text-surface-white/30 mt-1">
              By signing up you agree to our{' '}
              <a href="#" className="text-coral-pulse hover:underline">Terms</a> &amp;{' '}
              <a href="#" className="text-coral-pulse hover:underline">Privacy Policy</a>.
            </p>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-surface-variant dark:bg-white/10" />
            <span className="text-label-sm text-on-surface-variant dark:text-surface-white/30">or</span>
            <div className="flex-1 h-px bg-surface-variant dark:bg-white/10" />
          </div>

          <p className="text-center text-body-md text-on-surface-variant dark:text-surface-variant/80">
            Already have an account?{' '}
            <Link to="/login" className="text-coral-pulse font-semibold hover:underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

