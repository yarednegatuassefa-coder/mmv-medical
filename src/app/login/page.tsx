'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const router = useRouter();

  // Initialize the native client browser using the existing verified packages
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Execute security authorization verification against Supabase Auth records
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        // Validation check approved. Advance straight into the coordinator command center.
        router.push('/app/dashboard');
        router.refresh();
      }
    } catch (err) {
      setErrorMessage('An unexpected authorization interruption occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        
        {/* Header Branding Label */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-white tracking-tight">MMV Security Spine</h1>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Authorized Clinic Personnel Only</p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-medium text-red-400 text-center">
            ⚠️ Authorization Failure: {errorMessage}
          </div>
        )}

        {/* Input Credential Matrix Form */}
        <form onSubmit={handleStaffLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Staff Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@clinic.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Private Access Key</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl transition text-sm shadow-lg mt-2"
          >
            {isProcessing ? 'Verifying Credentials...' : 'Unlock System Access'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800/60">
          <p className="text-[10px] text-slate-500">
            Session activity is logged and monitored for compliance data safety.
          </p>
        </div>
      </div>
    </div>
  );
}
