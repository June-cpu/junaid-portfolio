'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { track } from '@/lib/tracker';

/* ─────────────────────── breakpoint hook ─────────────────────── */
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

/* ─────────────────────── tree data ─────────────────────── */
const TREE = [
  {
    id: 'teaching',
    label: 'Teaching',
    meta: 'Lead Teacher · Stem Action NYC',
    color: 'var(--accent)',
    children: [
      {
        id: 'robotics',
        label: 'Robotics',
        meta: 'School 241 · LEGO SPIKE Prime · Grades 3–5',
        description: '13-lesson curriculum introducing robotics fundamentals — from basic programming concepts to autonomous navigation and sensor-based challenges.',
        leaves: [
          { id: 'lec0', label: '00 · Introduction to Robotics', href: '/teaching/241/lec0' },
          { id: 'lec1', label: '01 · Place Your Order', href: '/teaching/241/lec1' },
          { id: 'lec2', label: '02 · Brain Games', href: '/teaching/241/lec2' },
          { id: 'lec3', label: '03 · Veggie Love', href: '/teaching/241/lec3' },
          { id: 'lec4', label: '04 · Hopper Race', href: '/teaching/241/lec4' },
          { id: 'lec5', label: '05 · Training Camp: Driving Around', href: '/teaching/241/lec5' },
          { id: 'lec6', label: "06 · What's This?", href: '/teaching/241/lec6' },
          { id: 'lec7', label: '07 · Goal!', href: '/teaching/241/lec7' },
          { id: 'lec8', label: '08 · Fixing Broken Robots', href: '/teaching/241/lec8' },
          { id: 'lec9', label: '09 · Reacting to Lines', href: '/teaching/241/lec9' },
          { id: 'lec10', label: '10 · Time for an Upgrade', href: '/teaching/241/lec10' },
          { id: 'lec11', label: '11 · Robot Pet', href: '/teaching/241/lec11' },
          { id: 'lec12', label: '12 · Build a Vault', href: '/teaching/241/lec12' },
        ],
      },
      {
        id: 'gaming',
        label: 'Game Design Bootcamp',
        meta: 'UAU / Lehman STEP · p5.js · Grades 7–12 · 20 hrs',
        description: 'A Pacman-based game design bootcamp teaching how games store data, player movement, enemy AI, and polish — students ship a working game.',
        groups: [
          {
            label: 'Spring Break Sprint · In-Person',
            leaves: [
              { id: 'day1', label: 'Day 1 · How Games Store Data', href: '/teaching/gaming/day1' },
              { id: 'day2', label: 'Day 2 · Making Pacman Move', href: '/teaching/gaming/day2' },
              { id: 'day3', label: 'Day 3 · Ghosts', href: '/teaching/gaming/day3' },
              { id: 'day4', label: 'Day 4 · Lives, Levels & HUD', href: '/teaching/gaming/day4' },
            ],
          },
          {
            label: 'Async · Self-Paced',
            leaves: [
              { id: 'async1', label: 'Game Design Document', href: '/teaching/gaming/async1' },
              { id: 'async2', label: 'Playtest Log', href: '/teaching/gaming/async2' },
              { id: 'async3', label: 'Art & Assets', href: '/teaching/gaming/async3' },
            ],
          },
          {
            label: 'Saturday Sessions · Virtual',
            leaves: [
              { id: 'sat1', label: 'Sat 1 · Core Loop', href: '/teaching/gaming/sat1' },
              { id: 'sat2', label: 'Sat 2 · Levels & Polish', href: '/teaching/gaming/sat2' },
              { id: 'sat3', label: 'Sat 3 · Art & Story', href: '/teaching/gaming/sat3' },
              { id: 'sat4', label: 'Sat 4 · Final Showcase', href: '/teaching/gaming/sat4' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'workforce',
    label: 'Workforce Development',
    meta: 'Employment Specialist · United Activities Unlimited',
    color: 'var(--accent)',
    children: [
      {
        id: 'syep',
        label: 'NYC SYEP Program',
        meta: 'NYC Dept. of Youth & Community Development · Staten Island',
        description:
          'Supervising a team of Worksite Monitors within the Summer Youth Employment Program — recruiting host sites, conducting compliance audits, and mentoring youth participants across Staten Island.',
        leaves: [
          { id: 'syep-1', label: 'Worksite Monitor Supervision', href: null },
          { id: 'syep-2', label: 'Host Site Recruitment & Onboarding', href: null },
          { id: 'syep-3', label: 'Compliance Auditing', href: null },
          { id: 'syep-4', label: 'Youth Participant Mentorship', href: null },
        ],
      },
    ],
  },
  {
    id: 'tutoring',
    label: 'Math Tutoring',
    meta: 'Private · One-on-one · Remote & In-person',
    color: 'var(--accent)',
    children: [
      {
        id: 'math-private',
        label: 'Private Sessions',
        meta: 'Foundational Math → Calculus',
        description:
          "Building confidence and genuine understanding — not just memorizing steps. Students learn to think through problems, not around them.",
        leaves: [
          { id: 'm1', label: 'Pre-Algebra & Algebra', href: null },
          { id: 'm2', label: 'Pre-Calculus', href: null },
          { id: 'm3', label: 'Calculus I & II', href: null },
          { id: 'm4', label: 'Statistics', href: null },
        ],
      },
    ],
  },
  {
    id: 'software',
    label: 'Software',
    meta: 'CS Student · Hunter College, CUNY',
    color: 'var(--accent)',
    children: [
      {
        id: 'projects',
        label: 'Projects',
        meta: 'Full-Stack · Data · Systems',
        description: 'Building things that work — from restaurant discovery platforms to OS-level simulations and data pipelines.',
        leaves: [
          { id: 'p1', label: 'Rated Halal', href: 'https://rated-halal.vercel.app/get-started', external: true },
          { id: 'p2', label: 'Python Final Project', href: 'https://github.com/June-cpu/python-final-project', external: true },
          { id: 'p3', label: 'Library Project', href: 'https://github.com/June-cpu/Library-Project', external: true },
          { id: 'p4', label: 'Halal Goodies', href: 'https://github.com/June-cpu/Halal-Goodies', external: true },
          { id: 'p5', label: 'Simulated File System', href: 'https://github.com/June-cpu/Simulated-File-System', external: true },
          { id: 'p6', label: 'NYC Payroll Analysis', href: 'https://github.com/June-cpu/nyc-payroll-analysis', external: true },
        ],
      },
    ],
  },
];

/* ─────────────────────── leaf node ─────────────────────── */
function LeafNode({
  leaf,
  isMobile,
}: {
  leaf: { id: string; label: string; href: string | null; external?: boolean };
  isMobile: boolean;
}) {
  const [hover, setHover] = useState(false);

  if (!leaf.href) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '3px 0' }}>
        <div style={{ width: 1, height: 14, background: 'var(--ink-faint)', opacity: 0.3 }} />
        <span style={{
          fontFamily: 'DM Mono, monospace', fontSize: '0.56rem',
          letterSpacing: '0.06em', color: 'var(--ink-faint)', opacity: 0.6,
        }}>
          {leaf.label}
        </span>
      </div>
    );
  }

  const isExternal = leaf.external;
  const linkProps = isExternal
    ? { href: leaf.href, target: '_blank', rel: 'noreferrer' }
    : { href: leaf.href };

  const inner = (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '3px 0' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{
        width: 1, height: 14,
        background: hover ? 'var(--accent)' : 'var(--ink-faint)',
        opacity: hover ? 1 : 0.3,
        transition: 'background 0.2s, opacity 0.2s',
      }} />
      <span style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.56rem',
        letterSpacing: '0.06em',
        color: hover ? 'var(--accent)' : 'var(--ink-light)',
        transition: 'color 0.2s',
        cursor: 'pointer',
      }}>
        {leaf.label} {isExternal ? '↗' : '→'}
      </span>
    </div>
  );

  return isExternal ? (
    <a {...linkProps} style={{ textDecoration: 'none' }} onClick={() => track('click', { element: 'tree-leaf', id: leaf.id })}>
      {inner}
    </a>
  ) : (
    <Link href={leaf.href} style={{ textDecoration: 'none' }} onClick={() => track('click', { element: 'tree-leaf', id: leaf.id })}>
      {inner}
    </Link>
  );
}

/* ─────────────────────── sub-branch ─────────────────────── */
function SubBranch({
  branch,
  isMobile,
  depth,
}: {
  branch: {
    id: string;
    label: string;
    meta: string;
    description: string;
    leaves?: { id: string; label: string; href: string | null; external?: boolean }[];
    groups?: {
      label: string;
      leaves: { id: string; label: string; href: string | null; external?: boolean }[];
    }[];
  };
  isMobile: boolean;
  depth: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 0 }}>
      {/* Vertical connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
        <div style={{ width: 1, flex: 1, minHeight: 8, background: 'var(--ink-faint)', opacity: 0.25 }} />
        {/* Node dot */}
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: hover || expanded ? 'var(--accent)' : 'var(--ink-faint)',
          transition: 'background 0.2s',
          flexShrink: 0,
        }} />
        {expanded && <div style={{ width: 1, flex: 1, background: 'var(--ink-faint)', opacity: 0.25 }} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: expanded ? 20 : 6 }}>
        {/* Branch header */}
        <button
          onClick={() => {
            setExpanded(e => !e);
            track('click', { element: 'tree-subbranch', id: branch.id });
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px 0', width: '100%', textAlign: 'left',
          }}
        >
          {/* Horizontal connector */}
          <div style={{
            width: 20, height: 1,
            background: hover || expanded ? 'var(--accent)' : 'var(--ink-faint)',
            opacity: hover || expanded ? 1 : 0.4,
            transition: 'background 0.2s, opacity 0.2s',
            flexShrink: 0,
          }} />

          <div>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
              fontSize: isMobile ? '1rem' : '1.1rem',
              color: hover || expanded ? 'var(--ink)' : 'var(--ink-light)',
              letterSpacing: '-0.01em',
              transition: 'color 0.2s',
            }}>
              {branch.label}
              <span style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.55rem',
                letterSpacing: '0.1em', color: 'var(--ink-faint)',
                marginLeft: 10, opacity: 0.6,
              }}>
                {expanded ? '−' : '+'}
              </span>
            </div>
            <div style={{
              fontFamily: 'DM Mono, monospace', fontSize: '0.52rem',
              letterSpacing: '0.06em', color: 'var(--accent)',
              opacity: 0.8, marginTop: 2,
            }}>
              {branch.meta}
            </div>
          </div>
        </button>

        {/* Expandable content */}
        <div style={{
          overflow: 'hidden',
          maxHeight: expanded ? '2000px' : '0',
          transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <div style={{ paddingLeft: 32, paddingTop: 4, paddingBottom: 8 }}>
            {/* Description */}
            <p style={{
              fontSize: '0.65rem', lineHeight: 1.9, color: 'var(--ink-light)',
              fontWeight: 300, maxWidth: 480, marginBottom: 16, opacity: 0.8,
            }}>
              {branch.description}
            </p>

            {/* Flat leaves */}
            {branch.leaves && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {branch.leaves.map(leaf => (
                  <LeafNode key={leaf.id} leaf={leaf} isMobile={isMobile} />
                ))}
              </div>
            )}

            {/* Grouped leaves */}
            {branch.groups && branch.groups.map((group, gi) => (
              <div key={gi} style={{ marginBottom: 14 }}>
                <div style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.5rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--ink-faint)', marginBottom: 6, opacity: 0.5,
                }}>
                  {group.label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {group.leaves.map(leaf => (
                    <LeafNode key={leaf.id} leaf={leaf} isMobile={isMobile} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── main branch ─────────────────────── */
function MainBranch({
  branch,
  isMobile,
  isLast,
}: {
  branch: (typeof TREE)[0];
  isMobile: boolean;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 0, minHeight: 0 }}>
      {/* Trunk segment */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 2, flexShrink: 0, marginRight: 0 }}>
        <div style={{ width: 2, flex: '0 0 28px', background: 'var(--ink)', opacity: 0.12 }} />
        {/* Branch origin node */}
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: expanded || hover ? 'var(--accent)' : 'var(--ink)',
          opacity: expanded || hover ? 1 : 0.3,
          transition: 'background 0.25s, opacity 0.25s',
          flexShrink: 0,
          zIndex: 1,
        }} />
        {!isLast && (
          <div style={{ width: 2, flex: 1, minHeight: 20, background: 'var(--ink)', opacity: 0.12 }} />
        )}
      </div>

      {/* Branch content */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 0 }}>
        {/* Main branch header */}
        <button
          onClick={() => {
            setExpanded(e => !e);
            track('click', { element: 'tree-branch', id: branch.id });
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: 0,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 0, paddingBottom: 4, width: '100%', textAlign: 'left',
          }}
        >
          {/* Horizontal connector from trunk */}
          <div style={{
            width: 24, height: 2,
            background: hover || expanded ? 'var(--accent)' : 'var(--ink)',
            opacity: hover || expanded ? 1 : 0.18,
            transition: 'background 0.25s, opacity 0.25s',
            flexShrink: 0,
            marginTop: 1,
          }} />

          <div style={{ paddingLeft: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                fontSize: isMobile ? 'clamp(1.3rem, 5vw, 1.6rem)' : 'clamp(1.4rem, 2.2vw, 1.8rem)',
                color: hover || expanded ? 'var(--ink)' : 'var(--ink)',
                letterSpacing: '-0.02em', margin: 0,
                transition: 'color 0.2s',
                opacity: hover || expanded ? 1 : 0.75,
              }}>
                {branch.label}
              </h3>
              <span style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.52rem',
                letterSpacing: '0.1em', color: 'var(--ink-faint)',
                opacity: 0.5,
              }}>
                {expanded ? '−' : '+'}
              </span>
            </div>
            <div style={{
              fontFamily: 'DM Mono, monospace', fontSize: '0.53rem',
              letterSpacing: '0.08em', color: 'var(--accent)',
              opacity: hover || expanded ? 0.9 : 0.5,
              transition: 'opacity 0.2s',
              marginTop: 3,
            }}>
              {branch.meta}
            </div>
          </div>
        </button>

        {/* Expanded children */}
        <div style={{
          overflow: 'hidden',
          maxHeight: expanded ? '5000px' : '0',
          paddingLeft: 36,
          marginTop: expanded ? 12 : 0,
          transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), margin-top 0.3s',
        } as React.CSSProperties}>
          {branch.children.map(sub => (
            <SubBranch key={sub.id} branch={sub as any} isMobile={isMobile} depth={1} />
          ))}
        </div>

        {/* Spacing after branch */}
        <div style={{ height: expanded ? 24 : 4, transition: 'height 0.3s' }} />
      </div>
    </div>
  );
}

/* ─────────────────────── main export ─────────────────────── */
export default function About() {
  const { isMobile, isTablet, isLargeDesktop } = useBreakpoint();
  const sidePad = isMobile ? '24px' : isTablet ? '40px' : '56px';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay for mount animation
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        background: 'var(--cream-dark)',
        padding: `80px ${sidePad} 120px`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{
        maxWidth: isLargeDesktop ? 1600 : undefined,
        margin: isLargeDesktop ? '0 auto' : undefined,
        width: '100%',
      }}>
        {/* Corner markers */}
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', top: 20, left: 24 }}>03</span>
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', top: 20, right: 24 }}>About</span>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: isMobile ? 48 : 72 }}>
          <span style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--accent)',
          }}>— About Me</span>
          <div style={{ flex: 1, height: 1, background: 'var(--ink-faint)', opacity: 0.4 }} />
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: isMobile ? 'clamp(1.6rem, 7vw, 2.2rem)' : 'clamp(2rem, 3.5vw, 3rem)',
            color: 'var(--ink)', letterSpacing: '-0.02em',
          }}>What I Do</h2>
        </div>

        {/* Layout: bio left, tree right (or stacked on mobile) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile || isTablet ? '1fr' : '280px 1fr',
          gap: isMobile ? 48 : isTablet ? 48 : 80,
          alignItems: 'start',
        }}>

          {/* ── Left panel: bio + resume + education ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Bio */}
            <p style={{
              fontSize: '0.72rem', lineHeight: 2.0, color: 'var(--ink-light)',
              fontWeight: 300,
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
              padding: '24px 28px',
              background: 'var(--cream)',
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
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="/Junaid_1.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track('click', { element: 'resume-view' })}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 18px',
                    background: 'var(--ink)', color: 'var(--cream)',
                    fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    transition: 'background 0.2s',
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
                    padding: '10px 18px',
                    border: '1px solid var(--ink-faint)',
                    color: 'var(--ink-light)', textDecoration: 'none',
                    fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s, border-color 0.2s',
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

            {/* Education */}
            <div style={{
              fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--ink-faint)',
              borderTop: '1px solid var(--ink-faint)', paddingTop: 20, opacity: 0.6,
            }}>
              B.S. Computer Science · Hunter College, CUNY · Expected 2026
            </div>

            {/* Hint */}
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.5rem', letterSpacing: '0.1em',
              color: 'var(--ink-faint)', opacity: 0.4,
              borderTop: '1px solid var(--ink-faint)', paddingTop: 16,
            }}>
              click a branch to explore →
            </div>
          </div>

          {/* ── Right panel: tree ── */}
          <div style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'none' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            {/* Tree root label */}
            <div style={{
              fontFamily: 'DM Mono, monospace', fontSize: '0.52rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--ink-faint)', opacity: 0.4,
              marginBottom: 16, paddingLeft: 2,
            }}>
              Junaid Tafader
            </div>

            {/* Root stem + branches */}
            <div style={{ display: 'flex', gap: 0 }}>
              {/* The main vertical trunk */}
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', width: 2, flexShrink: 0,
              }}>
                {/* Root node */}
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: 'var(--ink)', opacity: 0.25, flexShrink: 0,
                }} />
                {/* Full trunk line is handled inside each MainBranch */}
              </div>

              {/* Branches */}
              <div style={{ flex: 1 }}>
                {TREE.map((branch, i) => (
                  <MainBranch
                    key={branch.id}
                    branch={branch}
                    isMobile={isMobile}
                    isLast={i === TREE.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Ground / root line */}
            <div style={{
              marginTop: 8, marginLeft: 2,
              width: 40, height: 2,
              background: 'var(--ink)', opacity: 0.08,
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
