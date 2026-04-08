'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDebug('Signing in...');

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setDebug('ERROR: env vars missing');
      setLoading(false);
      return;
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, key);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setDebug('ERROR: ' + error.message);
      setLoading(false);
    } else if (data.session) {
      setDebug('SUCCESS - pushing to dashboard...');
      router.push('/app/dashboard');
    } else {
      setDebug('No session returned');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b' }}>
      <div style={{ background: '#18181b', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '420px', border: '1px solid #27272a' }}>
        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '600', textAlign: 'center', marginBottom: '32px' }}>
          MMV Medical
        </h1>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoComplete="email"
            style={{ width: '100%', background: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoComplete="current-password"
            style={{ width: '100%', background: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />

          {debug && (
            <div style={{ background: '#1c1c1e', border: '1px solid #3f3f46', borderRadius: '8px', padding: '10px 14px', color: '#a3e635', fontSize: '12px' }}>
              {debug}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#059669', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
