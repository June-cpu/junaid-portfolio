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

const SERVICES = [
  {
    num: '01',
    title: 'Custom Websites',
    icon: '◻',
    description:
      'A professional web presence built around your business — not a template. Fast, mobile-first, and designed to convert visitors into customers. From landing pages to full multi-page sites.',
    deliverables: ['Landing pages', 'Business sites', 'E-commerce', 'Brand refresh'],
  },
  {
    num: '02',
    title: 'Data & Web Apps',
    icon: '◈',
    description:
      'Custom internal tools that centralize what your business does — replacing scattered spreadsheets and manual processes with one platform built specifically for you. Dashboards, booking systems, CRMs, client portals, inventory trackers.',
    deliverables: ['Operations dashboards', 'Customer portals', 'Booking systems', 'Internal tools'],
  },
  {
    num: '03',
    title: 'Data Collection & Growth',
    icon: '◎',
    description:
      'Most businesses are sitting on untapped data. I help you instrument your product or website to capture the right signals, then surface insights that actually drive decisions — not just charts for the sake of charts.',
    deliverables: ['Analytics setup', 'Growth reporting', 'KPI dashboards', 'Funnel analysis'],
  },
];

export default function Services() {
  const { isMobile, isTablet, isLargeDesktop } = useBreakpoint();

  const sidePad = isMobile ? '24px' : isTablet ? '40px' : '56px';

  return (
    <section
      id="services"
      style={{
        minHeight: '100vh',
        background: 'var(--ink)',
        padding: `80px ${sidePad}`,
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: isLargeDesktop ? 1600 : undefined, margin: isLargeDesktop ? '0 auto' : undefined }}>
        {/* Corner markers */}
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', top: 20, left: 24 }}>03</span>
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', top: 20, right: 24 }}>Services</span>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: isMobile ? 48 : 72 }}>
          <span style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--accent)',
          }}>— For Businesses</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: isMobile ? 'clamp(1.6rem, 7vw, 2.2rem)' : 'clamp(2rem, 3.5vw, 3rem)',
            color: 'var(--cream)', letterSpacing: '-0.02em',
          }}>Build with me</h2>
        </div>

        {/* Pitch statement */}
        <div style={{
          maxWidth: 640,
          marginBottom: isMobile ? 56 : 80,
          paddingLeft: isMobile ? 0 : 2,
        }}>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: isMobile ? 'clamp(1.2rem, 5vw, 1.6rem)' : 'clamp(1.4rem, 2.2vw, 2rem)',
            color: 'var(--cream)',
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
            marginBottom: 20,
          }}>
            Your business generates data every day. Most of it goes unused.
          </p>
          <p style={{
            fontSize: '0.72rem',
            lineHeight: 1.9,
            color: 'rgba(242,237,230,0.55)',
            fontWeight: 300,
            maxWidth: 520,
          }}>
            I build websites and custom software that help businesses collect the right data, streamline their
            operations, and make better decisions — all in one place. No bloated SaaS. No off-the-shelf
            template. Just a solution shaped around your exact problem.
          </p>
        </div>

        {/* Service cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
          gap: 1,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: isMobile ? 56 : 80,
        }}>
          {SERVICES.map((s) => (
            <div
              key={s.num}
              style={{
                background: 'var(--ink)',
                padding: isMobile ? '32px 24px' : '44px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                borderRight: '1px solid rgba(255,255,255,0.06)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#242018'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--ink)'; }}
            >
              {/* Number + icon */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
                  {s.num}
                </span>
                <span style={{ fontSize: '1.1rem', color: 'var(--accent)', opacity: 0.8 }}>{s.icon}</span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: isMobile ? 'clamp(1.3rem, 5vw, 1.6rem)' : 'clamp(1.4rem, 2vw, 1.8rem)',
                color: 'var(--cream)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}>
                {s.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.68rem',
                lineHeight: 1.85,
                color: 'rgba(242,237,230,0.5)',
                fontWeight: 300,
                flex: 1,
              }}>
                {s.description}
              </p>

              {/* Deliverables */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 4 }}>
                  Examples
                </span>
                {s.deliverables.map((d) => (
                  <span
                    key={d}
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: '0.06em',
                      color: 'rgba(242,237,230,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span style={{ color: 'var(--accent)', opacity: 0.6, fontSize: '0.5rem' }}>—</span>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Process strip */}
        <div style={{
          border: '1px solid rgba(255,255,255,0.08)',
          padding: isMobile ? '28px 20px' : '36px 44px',
          marginBottom: isMobile ? 56 : 80,
        }}>
          <div style={{
            fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)', marginBottom: 28,
          }}>
            — How it works
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? 24 : 0,
          }}>
            {['Understand your problem', 'Scope a custom solution', 'Build & iterate with you', 'Ship & hand off cleanly'].map((step, i) => (
              <div
                key={step}
                style={{
                  display: 'flex',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  gap: 16,
                  paddingRight: isMobile ? 0 : 32,
                  borderRight: (!isMobile && i < 3) ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  paddingLeft: (!isMobile && i > 0) ? 32 : 0,
                  flexDirection: isMobile ? 'row' : 'column',
                }}
              >
                <span style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.5rem',
                  letterSpacing: '0.12em',
                  color: 'var(--accent)',
                  opacity: 0.7,
                  flexShrink: 0,
                }}>
                  0{i + 1}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  lineHeight: 1.6,
                  color: 'rgba(242,237,230,0.45)',
                  fontWeight: 300,
                }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: 24,
          padding: isMobile ? '28px 20px' : '36px 44px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderLeft: '3px solid var(--accent)',
          background: 'rgba(196, 87, 42, 0.04)',
        }}>
          <div>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontSize: isMobile ? 'clamp(1.1rem, 5vw, 1.4rem)' : 'clamp(1.2rem, 2vw, 1.6rem)',
              color: 'var(--cream)',
              letterSpacing: '-0.01em',
              marginBottom: 8,
            }}>
              Have a problem worth solving?
            </p>
            <p style={{ fontSize: '0.64rem', color: 'rgba(242,237,230,0.35)', fontWeight: 300 }}>
              Tell me what your business needs — I'll tell you if I can build it.
            </p>
          </div>
          <a
            href="#contact"
            onClick={() => track('click', { element: 'services-cta' })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: isMobile ? '12px 24px' : '14px 32px',
              background: 'var(--accent)',
              color: 'var(--cream)',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily: 'DM Mono, monospace',
              transition: 'opacity 0.2s',
              flexShrink: 0,
              minHeight: 44,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
          >
            Let's talk ↓
          </a>
        </div>
      </div>
    </section>
  );
}
