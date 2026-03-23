'use client';

import { useEffect, useState, useCallback } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { LECTURE_MAP, LECTURES, Slide, VisualCard } from '@/lib/teachingData';

// ─── Slide Renderers ──────────────────────────────────────────────────────────

function TitleSlide({ slide, lecture }: { slide: Slide; lecture: { num: number; theme: string } }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--ink)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'flex-start',
      padding: 'clamp(40px, 6vw, 96px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Big background number */}
      <span style={{
        position: 'absolute', right: '-0.1em', bottom: '-0.15em',
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: 'clamp(12rem, 28vw, 22rem)', lineHeight: 1,
        color: 'rgba(255,255,255,0.04)', userSelect: 'none',
        letterSpacing: '-0.04em',
      }}>
        {String(lecture.num).padStart(2, '0')}
      </span>

      <div style={{
        fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--accent)', marginBottom: 32,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ display: 'block', width: 32, height: 1, background: 'var(--accent)' }} />
        Robotics · School 241
      </div>

      <h1 style={{
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 1.0,
        letterSpacing: '-0.03em', color: '#f2ede6',
        whiteSpace: 'pre-line', marginBottom: 28, position: 'relative', zIndex: 1,
      }}>
        {slide.heading}
      </h1>

      <div style={{
        width: 'clamp(40px, 8vw, 64px)', height: 1,
        background: 'rgba(255,255,255,0.15)', marginBottom: 20,
      }} />

      <p style={{
        fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(242,237,230,0.45)',
      }}>
        {lecture.theme}
      </p>
    </div>
  );
}

function QuestionSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--cream)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(40px, 6vw, 96px)',
    }}>
      <div style={{
        fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--accent)', marginBottom: 28,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
        {slide.label ?? '— Question of the Day'}
      </div>

      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
        lineHeight: 1.1, letterSpacing: '-0.02em',
        color: 'var(--ink)', marginBottom: 32,
      }}>
        <em style={{ fontStyle: 'italic', color: 'var(--ink-light)' }}>{slide.heading}</em>
      </h2>

      {slide.body && (
        <p style={{
          fontSize: '0.78rem', lineHeight: 1.9, color: 'var(--ink-light)',
          maxWidth: 640, fontWeight: 300, marginBottom: slide.items ? 28 : 0,
        }}>
          {slide.body}
        </p>
      )}

      {slide.items && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 600 }}>
          {slide.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <span style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.52rem',
                color: 'var(--accent)', marginTop: 3, minWidth: 20,
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p style={{ fontSize: '0.72rem', lineHeight: 1.7, color: 'var(--ink-light)', fontWeight: 300 }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RulesSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--cream-dark)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(40px, 5vw, 80px)',
      overflow: 'auto',
    }}>
      <div style={{
        fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--accent)', marginBottom: 32,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
        {slide.label ?? '— Class Rules'}
      </div>

      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
        letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 40,
      }}>
        Rules
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 12,
      }}>
        {(slide.items ?? []).map((rule, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 16,
            background: 'var(--cream)', padding: '16px 20px',
            border: '1px solid var(--ink-faint)',
          }}>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
              fontSize: '1.6rem', lineHeight: 1, color: 'var(--accent)',
              minWidth: 28,
            }}>
              {i + 1}
            </span>
            <p style={{ fontSize: '0.65rem', lineHeight: 1.65, color: 'var(--ink-light)', fontWeight: 300 }}>
              {rule}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConceptSlide({ slide }: { slide: Slide }) {
  const manyItems = (slide.items?.length ?? 0) > 4;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--cream)',
      display: 'flex', flexDirection: 'column',
      justifyContent: manyItems ? 'flex-start' : 'center',
      padding: manyItems ? 'clamp(28px, 4vw, 64px) clamp(40px, 6vw, 96px)' : 'clamp(40px, 6vw, 96px)',
      overflow: 'auto',
    }}>
      {slide.label && (
        <div style={{
          fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12,
          flexShrink: 0,
        }}>
          <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
          {slide.label}
        </div>
      )}

      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: manyItems ? 'clamp(1.6rem, 3vw, 2.8rem)' : 'clamp(2rem, 4.5vw, 4.2rem)',
        lineHeight: 1.05, letterSpacing: '-0.02em',
        color: 'var(--ink)', marginBottom: manyItems ? 16 : 32,
        maxWidth: manyItems ? '100%' : '16ch',
        flexShrink: 0,
      }}>
        {slide.heading}
      </h2>

      {slide.body && (
        <p style={{
          fontSize: '0.75rem', lineHeight: 1.8, color: 'var(--ink-light)',
          maxWidth: 680, fontWeight: 300, marginBottom: slide.items ? 24 : 0,
          flexShrink: 0,
        }}>
          {slide.body}
        </p>
      )}

      {slide.items && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: manyItems ? 10 : 16, maxWidth: 760 }}>
          {slide.items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 16,
              padding: manyItems ? '10px 16px' : '14px 20px',
              borderLeft: '2px solid var(--ink-faint)',
              background: manyItems ? 'rgba(0,0,0,0.015)' : 'transparent',
            }}>
              <p style={{ fontSize: manyItems ? '0.68rem' : '0.72rem', lineHeight: 1.65, color: 'var(--ink-light)', fontWeight: 300 }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExamplesSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--cream-dark)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(40px, 6vw, 96px)',
    }}>
      {slide.label && (
        <div style={{
          fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
          {slide.label}
        </div>
      )}

      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: 'clamp(2rem, 4vw, 3.8rem)',
        lineHeight: 1.05, letterSpacing: '-0.02em',
        color: 'var(--ink)', marginBottom: 28,
      }}>
        {slide.heading}
      </h2>

      {slide.body && (
        <p style={{
          fontSize: '0.75rem', lineHeight: 1.9, color: 'var(--ink-light)',
          maxWidth: 580, fontWeight: 300, marginBottom: slide.items ? 36 : 0,
        }}>
          {slide.body}
        </p>
      )}

      {slide.items && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {slide.items.map((item, i) => (
            <span key={i} style={{
              fontSize: '0.62rem', padding: '8px 16px',
              border: '1px solid var(--ink-faint)', color: 'var(--ink-light)',
              letterSpacing: '0.04em', background: 'var(--cream)',
            }}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function VideoSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--ink)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(40px, 6vw, 96px)',
    }}>
      <div style={{
        fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--accent)', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
        {slide.label ?? '— Videos'}
      </div>

      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: 'clamp(2rem, 4vw, 3.8rem)',
        lineHeight: 1.05, letterSpacing: '-0.02em',
        color: '#f2ede6', marginBottom: slide.body ? 20 : 40,
      }}>
        {slide.heading}
      </h2>

      {slide.body && (
        <p style={{
          fontSize: '0.72rem', lineHeight: 1.8, color: 'rgba(242,237,230,0.5)',
          maxWidth: 560, fontWeight: 300, marginBottom: 40,
        }}>
          {slide.body}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 560 }}>
        {(slide.videos ?? []).map((v, i) => (
          <a
            key={i}
            href={v.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 20,
              padding: '18px 24px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              color: '#f2ede6', textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(196, 87, 42, 0.15)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(196, 87, 42, 0.5)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <span style={{
              width: 32, height: 32, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.65rem', color: 'var(--accent)', flexShrink: 0,
            }}>▶</span>
            <div>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.06em', color: '#f2ede6' }}>
                {v.label}
              </div>
              <div style={{ fontSize: '0.52rem', letterSpacing: '0.08em', color: 'rgba(242,237,230,0.3)', marginTop: 3 }}>
                {v.url.replace('https://', '').replace('www.', '').split('/')[0]}
              </div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ProjectSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--cream)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(40px, 6vw, 96px)',
    }}>
      {slide.label && (
        <div style={{
          fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
          {slide.label}
        </div>
      )}

      <div style={{
        border: '1px solid var(--ink-faint)',
        borderLeft: '4px solid var(--accent)',
        padding: 'clamp(28px, 4vw, 56px)',
        background: 'rgba(196, 87, 42, 0.02)',
        maxWidth: 700,
      }}>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
          fontSize: 'clamp(2rem, 4vw, 3.6rem)',
          lineHeight: 1.05, letterSpacing: '-0.02em',
          color: 'var(--ink)', marginBottom: 20,
        }}>
          {slide.heading}
        </h2>

        {slide.body && (
          <p style={{
            fontSize: '0.7rem', lineHeight: 1.9, color: 'var(--ink-light)',
            fontWeight: 300, marginBottom: 32,
            letterSpacing: '0.02em',
          }}>
            {slide.body}
          </p>
        )}

        {slide.projectLink && (
          <a
            href={slide.projectLink.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '12px 24px',
              background: 'var(--ink)', color: 'var(--cream)',
              fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
              letterSpacing: '0.1em', textDecoration: 'none',
              transition: 'background 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--ink)'; }}
          >
            {slide.projectLink.label} ↗
          </a>
        )}
      </div>
    </div>
  );
}

function ChallengeSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--ink)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(40px, 6vw, 96px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background challenge number */}
      {slide.challengeNum && (
        <span style={{
          position: 'absolute', right: '-0.05em', bottom: '-0.1em',
          fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
          fontSize: 'clamp(10rem, 24vw, 20rem)', lineHeight: 1,
          color: 'rgba(255,255,255,0.04)', userSelect: 'none',
          letterSpacing: '-0.04em',
        }}>
          {String(slide.challengeNum).padStart(2, '0')}
        </span>
      )}

      <div style={{
        fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--accent)', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
        {slide.label ?? `— Challenge ${slide.challengeNum ?? ''}`}
        {slide.challengeNum && (
          <span style={{
            border: '1px solid var(--accent)', padding: '2px 8px',
            fontSize: '0.5rem', letterSpacing: '0.18em',
          }}>
            {String(slide.challengeNum).padStart(2, '0')}
          </span>
        )}
      </div>

      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: 'clamp(2.2rem, 5vw, 4.8rem)',
        lineHeight: 1.0, letterSpacing: '-0.02em',
        color: '#f2ede6', marginBottom: 32,
        position: 'relative', zIndex: 1, maxWidth: '20ch',
      }}>
        {slide.heading}
      </h2>

      <p style={{
        fontSize: '0.78rem', lineHeight: 1.9,
        color: 'rgba(242,237,230,0.65)',
        maxWidth: 600, fontWeight: 300,
        position: 'relative', zIndex: 1,
      }}>
        {slide.body}
      </p>
    </div>
  );
}

function VisualSlide({ slide }: { slide: Slide }) {
  const cards = slide.cards ?? [];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--cream)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(40px, 6vw, 96px)',
      overflow: 'auto',
    }}>
      {slide.label && (
        <div style={{
          fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
          {slide.label}
        </div>
      )}

      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
        fontSize: 'clamp(1.8rem, 4vw, 3.6rem)',
        lineHeight: 1.05, letterSpacing: '-0.02em',
        color: 'var(--ink)', marginBottom: slide.body ? 16 : 36,
      }}>
        {slide.heading}
      </h2>

      {slide.body && (
        <p style={{
          fontSize: '0.72rem', lineHeight: 1.9, color: 'var(--ink-light)',
          maxWidth: 620, fontWeight: 300, marginBottom: 40,
        }}>
          {slide.body}
        </p>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: cards.length <= 4
          ? `repeat(${cards.length}, 1fr)`
          : 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 14,
        maxWidth: cards.length <= 4 ? 900 : 1100,
      }}>
        {cards.map((card: VisualCard, i: number) => (
          <div key={i} style={{
            background: 'var(--cream-dark)',
            border: '1px solid var(--ink-faint)',
            borderTop: '3px solid var(--accent)',
            padding: '24px 20px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <span style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1 }}>{card.icon}</span>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 400,
              fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
              color: 'var(--ink)', letterSpacing: '-0.01em',
            }}>
              {card.title}
            </div>
            {card.body && (
              <p style={{
                fontSize: '0.62rem', lineHeight: 1.7, color: 'var(--ink-light)',
                fontWeight: 300, marginTop: 4,
              }}>
                {card.body}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideRenderer({ slide, lectureNum, lectureTheme }: {
  slide: Slide;
  lectureNum: number;
  lectureTheme: string;
}) {
  switch (slide.type) {
    case 'title':
      return <TitleSlide slide={slide} lecture={{ num: lectureNum, theme: lectureTheme }} />;
    case 'question':
      return <QuestionSlide slide={slide} />;
    case 'rules':
      return <RulesSlide slide={slide} />;
    case 'concept':
      return <ConceptSlide slide={slide} />;
    case 'examples':
      return <ExamplesSlide slide={slide} />;
    case 'video':
      return <VideoSlide slide={slide} />;
    case 'project':
      return <ProjectSlide slide={slide} />;
    case 'challenge':
      return <ChallengeSlide slide={slide} />;
    case 'visual':
      return <VisualSlide slide={slide} />;
    default:
      return <ConceptSlide slide={slide} />;
  }
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LecturePage() {
  const { lectureId } = useParams<{ lectureId: string }>();
  const lecture = LECTURE_MAP[lectureId];
  if (!lecture) notFound();

  const [slideIndex, setSlideIndex] = useState(0);

  const go = useCallback((delta: number) => {
    setSlideIndex(prev => Math.max(0, Math.min(lecture.slides.length - 1, prev + delta)));
  }, [lecture.slides.length]);

  useEffect(() => {
    setSlideIndex(0);
  }, [lectureId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  const slide = lecture.slides[slideIndex];
  const isFirst = slideIndex === 0;
  const isLast = slideIndex === lecture.slides.length - 1;
  const prevLecture = LECTURES[lecture.num - 1];
  const nextLecture = LECTURES[lecture.num + 1];

  // Nav bar color depends on current slide background
  const darkSlide = slide.type === 'title' || slide.type === 'video' || slide.type === 'challenge';

  const navBg = darkSlide ? 'rgba(15,15,15,0.95)' : 'rgba(242,237,230,0.95)';
  const navColor = darkSlide ? 'rgba(242,237,230,0.6)' : 'var(--ink-light)';
  const navAccent = darkSlide ? '#f2ede6' : 'var(--ink)';
  const navBorder = darkSlide ? 'rgba(255,255,255,0.08)' : 'var(--ink-faint)';

  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'DM Mono, monospace',
    }}>
      {/* ── Fixed Top Nav ── */}
      <nav style={{
        height: 52,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(16px, 3vw, 40px)',
        background: navBg,
        borderBottom: `1px solid ${navBorder}`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 10, flexShrink: 0,
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        {/* Left: back + lesson label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, overflow: 'hidden' }}>
          <Link href="/teaching/241" style={{
            fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: navColor, textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'color 0.2s', flexShrink: 0,
          }}>
            ← All
          </Link>
          <span style={{ width: 1, height: 16, background: navBorder, flexShrink: 0 }} />
          <span style={{
            fontSize: '0.55rem', letterSpacing: '0.1em', color: navColor,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {String(lecture.num).padStart(2, '0')} · {lecture.title}
          </span>
        </div>

        {/* Center: progress + dots */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        }}>
          <span style={{ fontSize: '0.5rem', letterSpacing: '0.16em', color: navColor }}>
            {slideIndex + 1} / {lecture.slides.length}
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {lecture.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                style={{
                  width: i === slideIndex ? 16 : 5,
                  height: 5, borderRadius: 3,
                  background: i === slideIndex ? 'var(--accent)' : navBorder,
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'width 0.25s, background 0.25s',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: prev/next buttons */}
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={() => go(-1)}
            disabled={isFirst}
            style={{
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: `1px solid ${navBorder}`,
              color: isFirst ? 'rgba(128,128,128,0.3)' : navAccent,
              fontSize: '0.9rem', cursor: isFirst ? 'default' : 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { if (!isFirst) (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = navBorder; }}
          >
            ←
          </button>
          <button
            onClick={() => go(1)}
            disabled={isLast}
            style={{
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isLast ? 'transparent' : 'var(--accent)',
              border: `1px solid ${isLast ? navBorder : 'var(--accent)'}`,
              color: isLast ? 'rgba(128,128,128,0.3)' : '#f2ede6',
              fontSize: '0.9rem', cursor: isLast ? 'default' : 'pointer',
              transition: 'background 0.2s, border-color 0.2s',
            }}
          >
            →
          </button>
        </div>
      </nav>

      {/* ── Slide Area ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <div
          key={slideIndex}
          style={{
            position: 'absolute', inset: 0,
            animation: 'slideIn 0.28s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
          }}
        >
          <SlideRenderer
            slide={slide}
            lectureNum={lecture.num}
            lectureTheme={lecture.theme}
          />
        </div>
      </div>

      {/* ── End-of-deck overlay ── */}
      {isLast && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 20,
          background: 'rgba(26, 24, 20, 0.92)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 32,
          animation: 'fadeOverlay 0.4s ease forwards',
        }}>
          <div style={{
            fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
            End of Lesson {String(lecture.num).padStart(2, '0')}
          </div>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.02em', color: '#f2ede6', textAlign: 'center',
          }}>
            {lecture.title}
          </h2>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setSlideIndex(0)}
              style={{
                padding: '12px 24px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(242,237,230,0.6)',
                fontFamily: 'DM Mono, monospace', fontSize: '0.58rem',
                letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.5)';
                (e.currentTarget as HTMLButtonElement).style.color = '#f2ede6';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(242,237,230,0.6)';
              }}
            >
              ↺ Restart
            </button>

            {nextLecture && (
              <Link
                href={`/teaching/241/${nextLecture.id}`}
                onClick={() => setSlideIndex(0)}
                style={{
                  padding: '12px 24px', background: 'var(--accent)',
                  border: '1px solid var(--accent)', color: '#f2ede6',
                  fontFamily: 'DM Mono, monospace', fontSize: '0.58rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  textDecoration: 'none', display: 'inline-block',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#a8481f'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'; }}
              >
                Lesson {nextLecture.num}: {nextLecture.title} →
              </Link>
            )}

            <Link
              href="/teaching/241"
              style={{
                padding: '12px 24px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(242,237,230,0.4)',
                fontFamily: 'DM Mono, monospace', fontSize: '0.58rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none', display: 'inline-block',
              }}
            >
              ← All Lectures
            </Link>
          </div>

          {/* Dismiss */}
          <button
            onClick={() => go(-1)}
            style={{
              marginTop: 16, background: 'none', border: 'none',
              color: 'rgba(242,237,230,0.25)', fontSize: '0.52rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            ← Back to last slide
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
