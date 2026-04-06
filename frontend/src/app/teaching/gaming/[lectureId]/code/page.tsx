'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { REFERENCE_CODE } from '@/lib/gamingReferenceCode';
import { GAMING_SESSIONS } from '@/lib/gamingData';

const ACCENT = '#c4572a';
const INK    = '#1a1814';

export default function CodePage() {
  const { lectureId } = useParams<{ lectureId: string }>();
  const ref = REFERENCE_CODE[lectureId];
  const session = GAMING_SESSIONS.find(s => s.id === lectureId);

  if (!ref || !session) notFound();

  const dayNum = lectureId.replace('day', '');
  const allDays = Object.keys(REFERENCE_CODE).filter(k => k.startsWith('day'));

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0d0b',
      color: '#e8e2d9',
      fontFamily: 'system-ui, sans-serif',
    }}>

      {/* ── Top bar ── */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '14px clamp(20px, 5vw, 64px)',
        display: 'flex', alignItems: 'center', gap: 16,
        flexWrap: 'wrap',
      }}>
        <Link href={`/teaching/gaming/${lectureId}`} style={{
          fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(232,226,217,0.4)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ fontSize: '0.8rem' }}>←</span> Slides
        </Link>

        <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '0.7rem' }}>/</span>

        <span style={{
          fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: ACCENT,
        }}>
          Reference Code
        </span>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {allDays.map(d => (
            <Link key={d} href={`/teaching/gaming/${d}/code`} style={{
              fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: d === lectureId ? ACCENT : 'rgba(232,226,217,0.3)',
              textDecoration: 'none',
              padding: '4px 10px',
              border: `1px solid ${d === lectureId ? ACCENT : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 2,
            }}>
              Day {d.replace('day', '')}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ padding: 'clamp(24px, 5vw, 56px) clamp(20px, 5vw, 64px)' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: ACCENT, marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'block', width: 24, height: 1, background: ACCENT }} />
            Instructor Reference · Day {dayNum}
          </div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.05,
            letterSpacing: '-0.02em', color: '#f2ede6', marginBottom: 12,
          }}>
            {ref.title}
          </h1>
          <p style={{
            fontSize: '0.7rem', lineHeight: 1.8, color: 'rgba(232,226,217,0.55)',
            maxWidth: 640, marginBottom: 20,
          }}>
            {ref.summary}
          </p>

          {/* New concepts pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span style={{
              fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(232,226,217,0.3)', alignSelf: 'center', marginRight: 4,
            }}>
              New today:
            </span>
            {ref.newConcepts.map((c, i) => (
              <span key={i} style={{
                fontSize: '0.6rem', letterSpacing: '0.06em',
                color: 'rgba(232,226,217,0.6)',
                background: 'rgba(196,87,42,0.12)',
                border: '1px solid rgba(196,87,42,0.25)',
                padding: '3px 10px', borderRadius: 2,
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* ── Code block ── */}
        <div style={{
          background: '#111109',
          border: '1px solid rgba(255,255,255,0.07)',
          borderLeft: `3px solid ${ACCENT}`,
          borderRadius: 4,
          overflow: 'auto',
          position: 'relative',
        }}>
          {/* Output link in top-right of code block */}
          <div style={{
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '10px 18px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{
              fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(232,226,217,0.25)',
              textTransform: 'uppercase',
            }}>
              sketch.js
            </span>
            <Link href={`/teaching/gaming/${lectureId}/output`} style={{
              fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: ACCENT, textDecoration: 'none',
              padding: '4px 12px',
              border: `1px solid ${ACCENT}`,
              borderRadius: 2,
              opacity: 0.8,
            }}>
              ▶ Run Output
            </Link>
          </div>

          <pre style={{
            margin: 0,
            padding: '24px 20px',
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
            fontSize: '0.72rem',
            lineHeight: 1.7,
            color: '#c9c3b8',
            overflowX: 'auto',
            tabSize: 2,
          }}>
            <code>{ref.code}</code>
          </pre>
        </div>

        {/* ── Footer nav ── */}
        <div style={{
          marginTop: 32,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <Link href={`/teaching/gaming/${lectureId}`} style={{
            fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(232,226,217,0.35)', textDecoration: 'none',
          }}>
            ← Back to Slides
          </Link>
          <Link href={`/teaching/gaming/${lectureId}/output`} style={{
            fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: ACCENT, textDecoration: 'none',
            padding: '8px 20px',
            border: `1px solid ${ACCENT}`,
            borderRadius: 2,
          }}>
            Run This ▶
          </Link>
        </div>
      </div>
    </div>
  );
}
