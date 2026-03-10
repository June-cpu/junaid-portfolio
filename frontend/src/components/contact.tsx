'use client';

import { useEffect, useState } from 'react';
import { track } from '@/lib/tracker';

const useBreakpoint = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isLargeDesktop: width >= 1440,
  };
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.12)',
  padding: '12px 0',
  fontFamily: 'DM Mono, monospace',
  fontSize: '0.68rem',
  letterSpacing: '0.06em',
  color: '#f2ede6',
  outline: 'none',
  transition: 'border-color 0.2s',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const { isMobile, isTablet, isLargeDesktop } = useBreakpoint();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      track('click', { element: 'contact-form-submit', subject: form.subject });
    } catch {
      setStatus('error');
    }
  };

  const sidePad = isMobile ? '24px' : isTablet ? '40px' : '56px';
  const contentGap = isMobile ? 0 : isTablet ? 40 : 80;

  return (
    <section id="contact" style={{
      minHeight: '100vh', background: 'var(--ink)',
      padding: `80px ${sidePad}`, position: 'relative',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ maxWidth: isLargeDesktop ? 1600 : undefined, margin: isLargeDesktop ? '0 auto' : undefined, width: '100%' }}>
        {/* Corner markers */}
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', top: 20, left: 24 }}>04</span>
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', top: 20, right: 24 }}>Contact</span>

        {/* Top — section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: isMobile ? 40 : 0 }}>
          <span style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(196, 87, 42, 0.9)',
          }}>— Get In Touch</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* Center — main content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: contentGap,
          alignItems: 'start',
          marginTop: isMobile ? 0 : 80,
          marginBottom: isMobile ? 48 : 0,
        }}>

          {/* Left — headline */}
          <div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
              fontSize: isMobile
                ? 'clamp(2.4rem, 10vw, 3.2rem)'
                : isTablet
                  ? 'clamp(2.4rem, 6vw, 4rem)'
                  : 'clamp(3rem, 5vw, 5.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em', color: '#f2ede6',
              marginBottom: 32,
            }}>
              Let's<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(242,237,230,0.4)' }}>work</em><br />
              together.
            </h2>
            <p style={{
              fontSize: '0.7rem', lineHeight: 1.9, color: 'rgba(242,237,230,0.45)',
              maxWidth: 320, fontWeight: 300,
            }}>
              Open to internships, freelance work, and interesting projects.
              Reach out — I read every message.
            </p>
          </div>

          {/* Right — contact form */}
          <div style={{ paddingTop: isMobile ? 32 : 8 }}>
            <div style={{
              fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(196, 87, 42, 0.7)', marginBottom: 36,
            }}>
              — Send a Message
            </div>

            {status === 'sent' ? (
              <div style={{ padding: '48px 0' }}>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                  fontSize: '1.8rem', color: '#f2ede6', marginBottom: 12,
                }}>Message sent.</p>
                <p style={{ fontSize: '0.68rem', color: 'rgba(242,237,230,0.4)', letterSpacing: '0.04em' }}>
                  I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                {/* Name */}
                <div>
                  <label style={{
                    display: 'block', fontSize: '0.52rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8,
                  }}>Name</label>
                  <input
                    type="text" required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(196, 87, 42, 0.7)'; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{
                    display: 'block', fontSize: '0.52rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8,
                  }}>Email</label>
                  <input
                    type="email" required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(196, 87, 42, 0.7)'; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label style={{
                    display: 'block', fontSize: '0.52rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8,
                  }}>Subject</label>
                  <input
                    type="text" required
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="What's this about?"
                    style={inputStyle}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(196, 87, 42, 0.7)'; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={{
                    display: 'block', fontSize: '0.52rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8,
                  }}>Message</label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="What's on your mind?"
                    style={{ ...inputStyle, resize: 'none', display: 'block', lineHeight: 1.7 }}
                    onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(196, 87, 42, 0.7)'; }}
                    onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ fontSize: '0.6rem', color: 'rgba(196, 87, 42, 0.9)', letterSpacing: '0.06em' }}>
                    Something went wrong. Try emailing me directly at junaidcpu01@gmail.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '13px 28px',
                    minHeight: 44,
                    background: status === 'sending' ? 'transparent' : '#f2ede6',
                    color: status === 'sending' ? 'rgba(242,237,230,0.4)' : 'var(--ink)',
                    border: '1px solid rgba(242,237,230,0.2)',
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.62rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: status === 'sending' ? 'default' : 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (status !== 'sending') (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)';
                  }}
                  onMouseLeave={e => {
                    if (status !== 'sending') (e.currentTarget as HTMLButtonElement).style.background = '#f2ede6';
                  }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom — footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24,
        marginTop: 40,
      }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)' }}>
          Junaid Tafader
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)' }}>
          ©2025 · New York City
        </span>
      </div>
    </section>
  );
}
