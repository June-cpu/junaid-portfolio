'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LECTURES } from '@/lib/teachingData';

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

export default function Teaching241() {
  const { isMobile, isTablet, isLargeDesktop } = useBreakpoint();
  const sidePad = isMobile ? '24px' : isTablet ? '40px' : '64px';
  const gridCols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr';

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
        position: 'relative',
      }}>

        {/* Back link */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--ink-light)', marginBottom: 64,
          borderBottom: '1px solid var(--ink-faint)', paddingBottom: 1,
          transition: 'color 0.2s',
        }}>
          ← Portfolio
        </Link>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16 }}>
          <span style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--accent)',
          }}>— Robotics · School 241</span>
          <div style={{ flex: 1, height: 1, background: 'var(--ink-faint)', opacity: 0.4 }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 48 : 64, flexWrap: 'wrap', gap: 16 }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: isMobile ? 'clamp(2.4rem, 10vw, 3.2rem)' : 'clamp(2.8rem, 4vw, 4.5rem)',
            letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1,
          }}>
            Lecture<br />
            <em style={{ fontStyle: 'italic', color: 'var(--ink-light)' }}>Index</em>
          </h1>
          <p style={{
            fontSize: '0.68rem', lineHeight: 1.8, color: 'var(--ink-light)',
            maxWidth: 300, fontWeight: 300,
          }}>
            {LECTURES.length} lessons · LEGO SPIKE Prime · Robotics
          </p>
        </div>

        {/* Lecture grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          gap: 1,
          background: 'var(--ink-faint)',
          border: '1px solid var(--ink-faint)',
        }}>
          {LECTURES.map((lecture) => (
            <Link
              key={lecture.id}
              href={`/teaching/241/${lecture.id}`}
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
                (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = 'var(--accent)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--cream)';
                (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = 'transparent';
              }}
            >
              {/* Lesson number */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.55rem', color: 'var(--ink-faint)', letterSpacing: '0.1em',
                }}>
                  {String(lecture.num).padStart(2, '0')}
                </span>
                <span style={{
                  fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--accent)', fontFamily: 'DM Mono, monospace',
                }}>
                  {lecture.slides.length} slides
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                  fontSize: isMobile ? 'clamp(1.2rem, 5vw, 1.5rem)' : 'clamp(1.3rem, 1.8vw, 1.6rem)',
                  color: 'var(--ink)', letterSpacing: '-0.01em', marginBottom: 6,
                }}>
                  {lecture.title}
                </h2>
                <p style={{
                  fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--ink-light)',
                  textTransform: 'uppercase',
                }}>
                  {lecture.theme}
                </p>
              </div>

              {/* Open link */}
              <div style={{
                fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--ink-light)', marginTop: 'auto',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                Open →
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--ink-faint)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)',
          flexWrap: 'wrap', gap: 8,
        }}>
          <span>Junaid Tafader · Robotics 241</span>
          <span>Use ← → keys to navigate slides</span>
        </div>
      </div>
    </div>
  );
}
