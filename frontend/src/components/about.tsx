'use client';

import { track } from '@/lib/tracker';

const ROLES = [
  {
    num: '01',
    title: 'Employment Specialist',
    org: 'United Activities Unlimited - Part-time',
    description:
      'Supervising a team of Worksite Monitors within the NYC Summer Youth Employment Program (SYEP). Recruiting and onboarding host worksites, conducting site visits, auditing compliance paperwork, and mentoring youth participants — all under the NYC Dept. of Youth & Community Development.',
    tags: ['Workforce Development', 'SYEP', 'Youth Services', 'Staten Island, NY'],
  },
  {
    num: '02',
    title: 'Lead Teacher',
    org: 'Stem Action NYC - Part-time',
    description:
      'Teaching science and technology concepts to students, making complex ideas accessible and engaging. Building a foundation for the next generation of problem solvers.',
    tags: ['Education', 'STEM', 'Curriculum'],
  },
  {
    num: '03',
    title: 'Math Tutor',
    org: 'Private',
    description:
      'One-on-one tutoring from foundational math through Calculus. Helping students build confidence and genuine understanding — not just memorizing steps.',
    tags: ['Calculus', 'Algebra', 'Statistics', 'Private'],
  },
];

export default function About() {
  return (
    <section id="about" style={{
      minHeight: '100vh', background: 'var(--cream-dark)',
      padding: '80px 56px', position: 'relative',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* Corner markers */}
      <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', top: 20, left: 24 }}>03</span>
      <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', top: 20, right: 24 }}>About</span>

      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 64 }}>
        <span style={{
          fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--accent)',
        }}>— About Me</span>
        <div style={{ flex: 1, height: 1, background: 'var(--ink-faint)', opacity: 0.4 }} />
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
          fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--ink)', letterSpacing: '-0.02em',
        }}>What I Do</h2>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, flex: 1 }}>

        {/* Left — bio + resume */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <p style={{
              fontSize: '0.72rem', lineHeight: 2.0, color: 'var(--ink-light)',
              fontWeight: 300, maxWidth: 420, marginBottom: 40,
            }}>
              I'm a CS student at Hunter College who splits his time between writing software,
              teaching others, and helping people find work. I believe in learning by building —
              whether that's a data pipeline, a classroom lesson, or a career path for someone
              who needs it.
            </p>

            {/* Resume block */}
            <div style={{
              border: '1px solid var(--ink-faint)',
              borderLeft: '3px solid var(--accent)',
              padding: '28px 32px',
              background: 'var(--cream)',
              marginBottom: 32,
            }}>
              <div style={{
                fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--ink-faint)', marginBottom: 12,
              }}>
                — Resume
              </div>
              <p style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                fontSize: '1.3rem', color: 'var(--ink)', letterSpacing: '-0.01em',
                marginBottom: 20,
              }}>
                Junaid Tafader
              </p>
              <div style={{ display: 'flex', gap: 16 }}>
                <a
                  href="/Junaid_1.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track('click', { element: 'resume-view' })}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px', background: 'var(--ink)', color: 'var(--cream)',
                    fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', transition: 'background 0.2s',
                    cursor: 'none',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--ink)'; }}
                >
                  View PDF ↗
                </a>
                <a
                  href="/Junaid_1.pdf"
                  download
                  onClick={() => track('click', { element: 'resume-download' })}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px', border: '1px solid var(--ink-faint)',
                    color: 'var(--ink-light)',
                    fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', transition: 'color 0.2s, border-color 0.2s',
                    cursor: 'none',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-light)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--ink-faint)';
                  }}
                >
                  Download ↓
                </a>
              </div>
            </div>
          </div>

          {/* Education note */}
          <div style={{
            fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--ink-faint)',
            borderTop: '1px solid var(--ink-faint)', paddingTop: 20, opacity: 0.6,
          }}>
            B.S. Computer Science · Hunter College, CUNY · Expected 2026
          </div>
        </div>

        {/* Right — roles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--ink-faint)' }}>
          {ROLES.map(role => (
            <div
              key={role.num}
              style={{
                background: 'var(--cream-dark)', padding: '32px 36px',
                display: 'flex', flexDirection: 'column', gap: 14,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--cream)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--cream-dark)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', color: 'var(--ink-faint)', letterSpacing: '0.1em' }}>
                  {role.num}
                </span>
                <span style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--accent)',
                }}>
                  {role.org}
                </span>
              </div>

              <div>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                  fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', color: 'var(--ink)',
                  letterSpacing: '-0.01em', marginBottom: 8,
                }}>{role.title}</h3>
                <p style={{ fontSize: '0.67rem', lineHeight: 1.8, color: 'var(--ink-light)', fontWeight: 300 }}>
                  {role.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {role.tags.map(t => (
                  <span key={t} style={{
                    fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '3px 8px', border: '1px solid var(--ink-faint)', color: 'var(--ink-faint)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
