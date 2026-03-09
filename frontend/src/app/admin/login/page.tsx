'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json();
        setError(body.error || 'Invalid password');
        return;
      }
      const { token } = await res.json();
      localStorage.setItem('admin_token', token);
      router.push('/admin');
    } catch {
      setError('Could not reach server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0f0f0f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'DM Mono, monospace',
    }}>
      <div style={{ width: '100%', maxWidth: 380, padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#c4572a', marginBottom: 12,
          }}>
            — Admin Access
          </div>
          <h1 style={{
            fontSize: '1.6rem', fontWeight: 300, color: '#f2ede6',
            letterSpacing: '-0.02em',
          }}>
            junaidtafader.com
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <label style={{
              display: 'block', fontSize: '0.52rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(242,237,230,0.3)', marginBottom: 10,
            }}>
              Password
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              style={{
                width: '100%', background: '#1a1a1a',
                border: '1px solid #2a2a2a', padding: '12px 14px',
                fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
                color: '#f2ede6', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#c4572a'; }}
              onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#2a2a2a'; }}
            />
          </div>

          {error && (
            <p style={{ fontSize: '0.6rem', color: '#c4572a', letterSpacing: '0.06em' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 0', background: loading ? 'transparent' : '#c4572a',
              color: loading ? 'rgba(242,237,230,0.4)' : '#f2ede6',
              border: '1px solid #c4572a',
              fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              cursor: loading ? 'default' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Authenticating...' : 'Enter →'}
          </button>
        </form>

        <div style={{
          marginTop: 48, fontSize: '0.52rem', letterSpacing: '0.1em',
          color: 'rgba(242,237,230,0.15)',
        }}>
          Protected route · JWT auth
        </div>
      </div>
    </div>
  );
}
