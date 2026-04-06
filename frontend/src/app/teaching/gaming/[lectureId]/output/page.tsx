'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { REFERENCE_CODE } from '@/lib/gamingReferenceCode';

const ACCENT = '#c4572a';

const DAY_HINTS: Record<string, string[]> = {
  day1: ['Arrow keys do nothing yet — that\'s Day 2', 'Check every row has exactly 21 numbers', 'All outer border cells must be 1 (wall)'],
  day2: ['Arrow keys move Pacman', 'Walk into a wall — Pacman should stop', 'Collect pellets — score should count up', 'Press R to restart'],
  day3: ['Ghosts should roam on their own', 'Eat a power pellet — ghosts turn blue', 'Touch a blue ghost — it respawns', 'Touch a normal ghost — Game Over', 'Press R to restart'],
  day4: ['You have 3 lives — die and respawn', 'Clear all pellets — level counter goes up', 'Each level the ghosts speed up', 'HUD shows score, level, and lives', 'Press R to restart'],
};

export default function OutputPage() {
  const { lectureId } = useParams<{ lectureId: string }>();
  const ref = REFERENCE_CODE[lectureId];

  if (!ref) notFound();

  const dayNum = lectureId.replace('day', '');
  const hints  = DAY_HINTS[lectureId] ?? [];
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
          Live Output
        </span>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {allDays.map(d => (
            <Link key={d} href={`/teaching/gaming/${d}/output`} style={{
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

      {/* ── Main layout: game left, checklist right ── */}
      <div style={{
        padding: 'clamp(24px, 4vw, 48px) clamp(20px, 5vw, 64px)',
        display: 'flex',
        gap: 'clamp(24px, 4vw, 48px)',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>

        {/* ── Game iframe ── */}
        <div style={{ flex: '0 0 auto' }}>
          <div style={{
            fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: ACCENT, marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'block', width: 20, height: 1, background: ACCENT }} />
            Day {dayNum} — {ref.title.split('—')[1]?.trim()}
          </div>

          <div style={{
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 4,
            overflow: 'hidden',
            background: '#000',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}>
            <iframe
              src={`/pacman-reference/${lectureId}.html`}
              width={420}
              height={lectureId === 'day4' ? 444 : 420}
              style={{ display: 'block', border: 'none' }}
              title={`Day ${dayNum} output`}
            />
          </div>

          {/* Code link below game */}
          <div style={{ marginTop: 12, textAlign: 'center' }}>
            <Link href={`/teaching/gaming/${lectureId}/code`} style={{
              fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(232,226,217,0.35)', textDecoration: 'none',
            }}>
              {'</>'} View code
            </Link>
          </div>
        </div>

        {/* ── Instructor checklist ── */}
        <div style={{ flex: '1 1 280px', minWidth: 240 }}>
          <div style={{
            fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(232,226,217,0.35)', marginBottom: 16,
          }}>
            What to test
          </div>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {hints.map((h, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <span style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 20, height: 20, flexShrink: 0,
                  border: `1px solid rgba(196,87,42,0.4)`,
                  borderRadius: 2,
                  color: ACCENT, fontSize: '0.6rem',
                }}>
                  {i + 1}
                </span>
                <span style={{
                  fontSize: '0.7rem', lineHeight: 1.6,
                  color: 'rgba(232,226,217,0.65)',
                }}>
                  {h}
                </span>
              </li>
            ))}
          </ul>

          {/* Concepts from this day */}
          <div style={{ marginTop: 28 }}>
            <div style={{
              fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(232,226,217,0.25)', marginBottom: 12,
            }}>
              New concepts
            </div>
            {ref.newConcepts.map((c, i) => (
              <div key={i} style={{
                fontSize: '0.65rem', lineHeight: 1.6,
                color: 'rgba(232,226,217,0.45)',
                padding: '5px 0',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
