'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/tracker';

export default function Intro() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState(false);

  // Visit + session duration tracking
  useEffect(() => {
    track('visit', {
      page: 'home',
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    });
    const start = Date.now();
    return () => {
      track('duration', { duration: Math.round((Date.now() - start) / 1000) });
    };
  }, []);

  // Scroll section tracking
  useEffect(() => {
    const sections = ['work', 'about', 'contact'];
    const observers: IntersectionObserver[] = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null as unknown as IntersectionObserver;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) track('scroll', { section: id }); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 3.5 + 'px';
        cursorRef.current.style.top = e.clientY - 3.5 + 'px';
      }
    };

    const animateRing = () => {
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPosRef.current.x + 'px';
        ringRef.current.style.top = ringPosRef.current.y + 'px';
      }
      requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', onMove);
    animateRing();
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  const onEnter = () => {
    if (ringRef.current) { ringRef.current.style.width = '52px'; ringRef.current.style.height = '52px'; }
    if (cursorRef.current) cursorRef.current.style.transform = 'scale(1.6)';
  };

  const onLeave = () => {
    if (ringRef.current) { ringRef.current.style.width = '32px'; ringRef.current.style.height = '32px'; }
    if (cursorRef.current) cursorRef.current.style.transform = 'scale(1)';
  };

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} style={{
        width: 7, height: 7, background: 'var(--accent)', borderRadius: '50%',
        position: 'fixed', pointerEvents: 'none', zIndex: 9999,
        transition: 'transform 0.15s ease', mixBlendMode: 'multiply'
      }} />
      <div ref={ringRef} style={{
        width: 32, height: 32, border: '1px solid var(--accent)', borderRadius: '50%',
        position: 'fixed', pointerEvents: 'none', zIndex: 9998,
        transition: 'width 0.25s, height 0.25s', transform: 'translate(-50%, -50%)', opacity: 0.5
      }} />

      <div style={{
        width: '100vw', height: '100vh',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        position: 'relative', background: 'var(--cream)'
      }}>

        {/* Corner markers */}
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', top: 20, left: 24 }}>00</span>
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', top: 20, right: 24 }}>01</span>
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', bottom: 20, left: 24 }}>©2025</span>
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', bottom: 20, right: 24 }}>NYC</span>

        {/* Center divider */}
        <div style={{
          position: 'absolute', left: '50%', top: 48, bottom: 48,
          width: 1, background: 'var(--ink-faint)', opacity: 0.4, zIndex: 5
        }} />

        {/* LEFT PANEL */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '48px 56px', zIndex: 2
        }}>
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', fontWeight: 300,
              letterSpacing: '0.12em', color: 'var(--ink-light)',
              animation: 'fadeUp 0.8s ease forwards', opacity: 0, animationDelay: '0.1s'
            }}>Junaid Tafader</span>

            <nav style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
              animation: 'fadeUp 0.8s ease forwards', opacity: 0, animationDelay: '0.2s'
            }}>
              {['Work', 'About', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`}
                  onClick={() => track('click', { element: `nav-${link.toLowerCase()}` })}
                  onMouseEnter={onEnter} onMouseLeave={onLeave}
                  style={{
                    fontSize: '0.6rem', letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'var(--ink-light)', transition: 'color 0.2s'
                  }}>
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Main text */}
          <div style={{ paddingBottom: 8 }}>
            <div style={{
              fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10,
              animation: 'fadeUp 0.9s ease forwards', opacity: 0, animationDelay: '0.35s'
            }}>
              <span style={{ display: 'block', width: 28, height: 1, background: 'var(--accent)' }} />
              Software Engineer · Data Scientist
            </div>

            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
              fontSize: 'clamp(3.2rem, 5.5vw, 5.5rem)', lineHeight: 1.0,
              letterSpacing: '-0.02em', color: 'var(--ink)',
              animation: 'fadeUp 1s ease forwards', opacity: 0, animationDelay: '0.45s'
            }}>
              Code.<br />
              Data.<br />
              <em style={{ fontStyle: 'italic', color: 'var(--ink-light)' }}>Impact.</em>
            </h1>

            <p style={{
              marginTop: 28, fontSize: '0.72rem', lineHeight: 1.9,
              color: 'var(--ink-light)', maxWidth: 340, fontWeight: 300,
              animation: 'fadeUp 0.9s ease forwards', opacity: 0, animationDelay: '0.6s'
            }}>
              Aspiring Data Scientist and Software Engineer based in New York City
            </p>

            <div style={{
              marginTop: 40, display: 'flex', alignItems: 'center', gap: 28,
              animation: 'fadeUp 0.9s ease forwards', opacity: 0, animationDelay: '0.75s'
            }}>
              <a href="#work" onClick={() => track('click', { element: 'view_work_btn' })} onMouseEnter={onEnter} onMouseLeave={onLeave}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '13px 26px', background: 'var(--ink)', color: 'var(--cream)',
                  fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em',
                  transition: 'background 0.25s, transform 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = 'var(--accent)')}
                onMouseOut={e => (e.currentTarget.style.background = 'var(--ink)')}
              >
                View Work →
              </a>
              <a
                href="https://github.com/June-cpu"
                target="_blank" rel="noreferrer"
                onClick={() => track('click', { element: 'github_link' })}
                onMouseEnter={onEnter} onMouseLeave={onLeave}
                style={{
                  fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--ink-light)',
                  borderBottom: '1px solid var(--ink-faint)', paddingBottom: 1, transition: 'color 0.2s'
                }}>
                GitHub {'↗'}
              </a>
              <a
                href="https://www.linkedin.com/in/junaid-tafader/"
                target="_blank" rel="noreferrer"
                onClick={() => track('click', { element: 'linkedin-hero' })}
                onMouseEnter={onEnter} onMouseLeave={onLeave}
                style={{
                  fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--ink-light)',
                  borderBottom: '1px solid var(--ink-faint)', paddingBottom: 1, transition: 'color 0.2s'
                }}>
                LinkedIn {'↗'}
              </a>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            animation: 'fadeUp 0.8s ease forwards', opacity: 0, animationDelay: '0.9s'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--ink-light)'
            }}>
              <span style={{
                width: 6, height: 6, background: '#5a9a5a', borderRadius: '50%',
                animation: 'pulse 2.5s ease-in-out infinite', display: 'inline-block'
              }} />
              Available for opportunities
            </div>
            <div style={{
              fontSize: '0.58rem', letterSpacing: '0.12em',
              color: 'var(--ink-faint)', display: 'flex', alignItems: 'center', gap: 8
            }}>
              Scroll
              <span style={{
                display: 'block', width: 1, height: 32, background: 'var(--ink-faint)',
                animation: 'scrollLine 2s ease-in-out infinite'
              }} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            position: 'relative', overflow: 'hidden',
            animation: 'panelReveal 1.2s ease forwards', animationDelay: '0.05s'
          }}
          onMouseEnter={() => { setShowInfo(true); track('hover', { element: 'photo_panel' }); }}
          onMouseLeave={() => setShowInfo(false)}
        >
          {/* Photo */}
          <img
            src="/photo-junaid.jpeg"
            alt="Junaid Tafader"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Hover overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(26, 24, 20, 0.88)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '48px 44px', gap: 32,
            opacity: showInfo ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: showInfo ? 'auto' : 'none',
          }}>

            {/* Hobbies */}
            <div>
              <div style={{
                fontSize: '0.58rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12
              }}>
                — Hobbies
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Indoor Bouldering', 'Food Hunting', 'Badminton', 'Table Tennis'].map(h => (
                  <span key={h} style={{
                    fontSize: '0.68rem', padding: '5px 12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.75)', letterSpacing: '0.04em'
                  }}>{h}</span>
                ))}
              </div>
            </div>

            {/* Fun Facts */}
            <div>
              <div style={{
                fontSize: '0.58rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12
              }}>
                — Fun Facts
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'I was born in a village in bangladesh and moved to NYC at 7 years old',
                  'addicted to starting failing businesses — learning every time',
                  'I may just citi-bike more than use public transportation',
                ].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: 'var(--accent)', fontSize: '0.6rem', marginTop: 2 }}>✦</span>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div>
              <div style={{
                fontSize: '0.58rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12
              }}>
                — Currently Building Toward
              </div>
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            	Working towards focused data analytics and machine learning projects to help solve real world problems
              </p>
            </div>

          </div>

          {/* Vertical label — hides on hover */}
          <div style={{
            position: 'absolute', right: -10, top: '50%',
            transform: 'translateY(-50%) rotate(90deg)',
            fontSize: '0.55rem', letterSpacing: '0.22em', color: 'var(--ink-faint)',
            whiteSpace: 'nowrap', zIndex: 3, textTransform: 'uppercase',
            opacity: showInfo ? 0 : 1, transition: 'opacity 0.3s'
          }}>
            Python · Flask · PostgreSQL · TypeScript
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes panelReveal {
          0%   { clip-path: inset(0 100% 0 0); opacity: 1; }
          100% { clip-path: inset(0 0% 0 0);   opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes scrollLine {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50%       { transform: scaleY(0.4); opacity: 0.3; }
        }
      `}</style>
    </>
  );
}