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

const WIP = {
  title: 'Rated Halal',
  description:
    'A halal restaurant discovery platform built for the Muslim community in NYC. Find, rate, and verify halal restaurants — with community halal verification, QR check-ins, masjid prayer times, gamified reviewing, and a full business portal with tiered analytics and Stripe-powered subscriptions.',
  tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
  link: 'https://ratedhalal.com',
};

const PROJECTS = [
  {
    num: '01',
    title: 'Python Final Project',
    description:
      'Web scraping + data viz app that pulls book data from Goodreads into PostgreSQL, runs BST-based analysis, and serves charts via a Flask API. Deployed on Render.',
    tags: ['Python', 'Flask', 'BeautifulSoup', 'Pandas', 'PostgreSQL'],
    github: 'https://github.com/June-cpu/python-final-project',
  },
  {
    num: '02',
    title: 'Library Project',
    description:
      'Flask library management system with a Binary Search Tree-backed catalog, member registration, and a full borrow/return workflow with a styled web UI.',
    tags: ['Python', 'Flask', 'BST', 'PostgreSQL', 'HTML/CSS'],
    github: 'https://github.com/June-cpu/Library-Project',
  },
  {
    num: '03',
    title: 'Halal Goodies',
    description:
      'A halal food delivery app built in Flutter. My co-founder went MIA mid-build — I shipped what I could and learned that vetting your co-founder matters more than the idea.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
    github: 'https://github.com/June-cpu/Halal-Goodies',
    note: 'RIP 🕊',
  },
  {
    num: '04',
    title: 'Simulated File System',
    description:
      'C++ implementation of a simulated file system with File and Folder classes, demonstrating move semantics, deep copy, and tree-based directory traversal.',
    tags: ['C++', 'Move Semantics', 'OOP', 'Data Structures'],
    github: 'https://github.com/June-cpu/Simulated-File-System',
  },
  {
    num: '05',
    title: 'NYC Payroll Analysis',
    description:
      'End-to-end analysis of 500K+ NYC payroll records across 88 agencies and 7 fiscal years. Cleaned and normalized salary data, ran overtime deep-dives, and surfaced findings like 454% payroll growth from FY2019–2025 and top 3 agencies driving 83% of total spend.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
    github: 'https://github.com/June-cpu/nyc-payroll-analysis',
  },
];

export default function Work() {
  const { isMobile, isTablet, isLargeDesktop } = useBreakpoint();

  const onEnter = (el: HTMLElement) => {
    el.style.color = 'var(--accent)';
    (el as HTMLAnchorElement).style.borderColor = 'var(--accent)';
  };
  const onLeave = (el: HTMLElement) => {
    el.style.color = 'var(--ink-light)';
    (el as HTMLAnchorElement).style.borderColor = 'var(--ink-faint)';
  };

  const sidePad = isMobile ? '24px' : isTablet ? '40px' : '56px';
  const gridCols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : isLargeDesktop ? '1fr 1fr 1fr' : '1fr 1fr';

  return (
    <section id="work" style={{
      minHeight: '100vh', background: 'var(--cream)',
      padding: `80px ${sidePad}`, position: 'relative',
    }}>
      <div style={{ maxWidth: isLargeDesktop ? 1600 : undefined, margin: isLargeDesktop ? '0 auto' : undefined }}>
        {/* Corner markers */}
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', top: 20, left: 24 }}>02</span>
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', top: 20, right: 24 }}>Work</span>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: isMobile ? 40 : 64 }}>
          <span style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--accent)',
          }}>— Selected Work</span>
          <div style={{ flex: 1, height: 1, background: 'var(--ink-faint)', opacity: 0.4 }} />
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: isMobile ? 'clamp(1.6rem, 7vw, 2.2rem)' : 'clamp(2rem, 3.5vw, 3rem)',
            color: 'var(--ink)', letterSpacing: '-0.02em',
          }}>Projects</h2>
        </div>

        {/* Currently Building spotlight */}
        <div style={{ marginBottom: isMobile ? 40 : 64 }}>
          <div style={{
            fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: 20,
          }}>
            — Currently Building
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
            gap: isMobile ? 24 : 48,
            padding: isMobile ? '24px 20px' : '40px 44px',
            border: '1px solid var(--ink-faint)',
            borderLeft: '3px solid var(--accent)',
            background: 'rgba(196, 87, 42, 0.03)',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                  fontSize: isMobile ? 'clamp(1.4rem, 6vw, 1.8rem)' : 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  color: 'var(--ink)', letterSpacing: '-0.01em',
                }}>{WIP.title}</h3>
                <span style={{
                  fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--accent)', border: '1px solid var(--accent)', padding: '3px 8px',
                }}>● In Progress</span>
              </div>
              <p style={{
                fontSize: '0.72rem', lineHeight: 1.85, color: 'var(--ink-light)',
                maxWidth: 560, fontWeight: 300, marginBottom: 24,
              }}>{WIP.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {WIP.tags.map(t => (
                  <span key={t} style={{
                    fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '4px 10px', border: '1px solid var(--ink-faint)', color: 'var(--ink-light)',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {!isMobile && (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', minWidth: 100 }}>
                <span style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem', fontWeight: 300,
                  color: 'var(--cream-dark)', lineHeight: 1, userSelect: 'none',
                }}>WIP</span>
                <a
                  href={WIP.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--accent)',
                    textTransform: 'uppercase', textDecoration: 'none',
                    borderBottom: '1px solid var(--accent)', paddingBottom: 1,
                  }}
                >
                  ratedhalal.com ↗
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Project grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: gridCols,
          gap: 1, background: 'var(--ink-faint)', border: '1px solid var(--ink-faint)',
        }}>
          {PROJECTS.map(p => (
            <div
              key={p.num}
              style={{
                background: 'var(--cream)',
                padding: isMobile ? '24px 20px' : '36px 40px',
                display: 'flex', flexDirection: 'column', gap: 20,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--cream-dark)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--cream)'; }}
            >
              {/* Number + note */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', color: 'var(--ink-faint)', letterSpacing: '0.1em' }}>
                  {p.num}
                </span>
                {'note' in p && p.note && (
                  <span style={{ fontSize: '0.62rem', color: 'var(--ink-faint)' }}>{p.note}</span>
                )}
              </div>

              {/* Title + description */}
              <div>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                  fontSize: isMobile ? 'clamp(1.2rem, 5vw, 1.5rem)' : 'clamp(1.3rem, 2vw, 1.7rem)',
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em', marginBottom: 10,
                }}>{p.title}</h3>
                <p style={{ fontSize: '0.68rem', lineHeight: 1.8, color: 'var(--ink-light)', fontWeight: 300 }}>
                  {p.description}
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '3px 8px', border: '1px solid var(--ink-faint)', color: 'var(--ink-faint)',
                  }}>{t}</span>
                ))}
              </div>

              {/* GitHub link */}
              <a
                href={p.github}
                target="_blank" rel="noreferrer"
                onClick={() => track('click', { element: 'github-project', project: p.title })}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--ink-light)', alignSelf: 'flex-start',
                  borderBottom: '1px solid var(--ink-faint)', paddingBottom: 1,
                  transition: 'color 0.2s, border-color 0.2s',
                  minHeight: 44,
                }}
                onMouseEnter={e => onEnter(e.currentTarget as HTMLElement)}
                onMouseLeave={e => onLeave(e.currentTarget as HTMLElement)}
              >
                View on GitHub ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
