'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GAMING_SESSIONS } from '@/lib/gamingData';

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
    isLargeDesktop: width >= 1440,
  };
};

const PHASE_LABELS: Record<string, { label: string; color: string }> = {
  'Apr': { label: 'In-Person · Spring Break', color: 'var(--accent)' },
  'Async': { label: 'Async · Self-Paced', color: '#5b7fa6' },
  'May': { label: 'Virtual · Saturday', color: '#4a8c6f' },
};

function getPhase(theme: string) {
  if (theme.startsWith('Apr')) return PHASE_LABELS['Apr'];
  if (theme.startsWith('Async')) return PHASE_LABELS['Async'];
  return PHASE_LABELS['May'];
}

export default function GamingIndex() {
  const { isMobile, isTablet, isLargeDesktop } = useBreakpoint();
  const sidePad = isMobile ? '24px' : isTablet ? '40px' : '64px';
  const gridCols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr';

  const inPerson = GAMING_SESSIONS.filter(s => s.theme.startsWith('Apr'));
  const async_ = GAMING_SESSIONS.filter(s => s.theme.startsWith('Async'));
  const saturdays = GAMING_SESSIONS.filter(s => s.theme.startsWith('May'));

  const phases = [
    { title: 'Spring Break Sprint', subtitle: 'April 6–9 · In-Person · Lehman College', sessions: inPerson },
    { title: 'Async Work', subtitle: 'Self-Paced · Between Sessions', sessions: async_ },
    { title: 'Saturday Build Sessions', subtitle: 'May 2–23 · Virtual · Zoom', sessions: saturdays },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--cream)',
      fontFamily: 'DM Mono, monospace',
      color: 'var(--ink)',
    }}>
      <div style={{
        maxWidth: isLargeDesktop ? 1600 : undefined,
        margin: isLargeDesktop ? '0 auto' : undefined,
        padding: `64px ${sidePad} 80px`,
      }}>

        {/* Back link */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--ink-light)', marginBottom: 64,
          borderBottom: '1px solid var(--ink-faint)', paddingBottom: 1,
        }}>
          ← Portfolio
        </Link>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16 }}>
          <span style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--accent)',
          }}>— Game Design & Coding · UAU / Lehman STEP</span>
          <div style={{ flex: 1, height: 1, background: 'var(--ink-faint)', opacity: 0.4 }} />
        </div>

        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: isMobile ? 48 : 64, flexWrap: 'wrap', gap: 16,
        }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: isMobile ? 'clamp(2.4rem, 10vw, 3.2rem)' : 'clamp(2.8rem, 4vw, 4.5rem)',
            letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1,
          }}>
            Gaming<br />
            <em style={{ fontStyle: 'italic', color: 'var(--ink-light)' }}>Bootcamp</em>
          </h1>
          <p style={{
            fontSize: '0.68rem', lineHeight: 1.8, color: 'var(--ink-light)',
            maxWidth: 300, fontWeight: 300,
          }}>
            {GAMING_SESSIONS.length} sessions · Godot Engine · Grades 7–12 · 20 hours total
          </p>
        </div>

        {/* Phases */}
        {phases.map((phase) => (
          <div key={phase.title} style={{ marginBottom: 64 }}>
            {/* Phase header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              marginBottom: 20, paddingBottom: 16,
              borderBottom: '1px solid var(--ink-faint)',
            }}>
              <div>
                <div style={{
                  fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--ink)', fontWeight: 500,
                }}>
                  {phase.title}
                </div>
                <div style={{
                  fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-light)', marginTop: 3,
                }}>
                  {phase.subtitle}
                </div>
              </div>
            </div>

            {/* Session grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: gridCols,
              gap: 1,
              background: 'var(--ink-faint)',
              border: '1px solid var(--ink-faint)',
            }}>
              {phase.sessions.map((session) => {
                const phaseInfo = getPhase(session.theme);
                return (
                  <Link
                    key={session.id}
                    href={`/teaching/gaming/${session.id}`}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: 16,
                      background: 'var(--cream)',
                      padding: isMobile ? '24px 20px' : '32px 36px',
                      borderLeft: '3px solid transparent',
                      transition: 'background 0.2s, border-color 0.2s',
                      textDecoration: 'none', color: 'inherit',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'var(--cream-dark)';
                      (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = phaseInfo.color;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'var(--cream)';
                      (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '0.55rem', color: 'var(--ink-faint)', letterSpacing: '0.1em',
                      }}>
                        {String(session.num).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: phaseInfo.color, fontFamily: 'DM Mono, monospace',
                      }}>
                        {session.slides.length} slides
                      </span>
                    </div>

                    <div>
                      <h2 style={{
                        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                        fontSize: isMobile ? 'clamp(1.2rem, 5vw, 1.5rem)' : 'clamp(1.3rem, 1.8vw, 1.6rem)',
                        color: 'var(--ink)', letterSpacing: '-0.01em', marginBottom: 6,
                      }}>
                        {session.title}
                      </h2>
                      <p style={{
                        fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--ink-light)',
                        textTransform: 'uppercase',
                      }}>
                        {session.theme}
                      </p>
                    </div>

                    <div style={{
                      fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: 'var(--ink-light)', marginTop: 'auto',
                    }}>
                      Open →
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div style={{
          marginTop: 16, paddingTop: 24, borderTop: '1px solid var(--ink-faint)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)',
          flexWrap: 'wrap', gap: 8,
        }}>
          <span>Junaid Tafader · UAU Game Design & Coding Bootcamp</span>
          <span>Use ← → keys to navigate slides</span>
        </div>
      </div>
    </div>
  );
}
