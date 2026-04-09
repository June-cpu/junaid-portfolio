'use client';

import { useState, useEffect } from 'react';
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
        description: 'A Pacman-based bootcamp teaching how games store data, player movement, enemy AI, and polish — students ship a working game.',
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
    children: [
      {
        id: 'syep',
        label: 'NYC SYEP Program',
        meta: 'NYC Dept. of Youth & Community Development · Staten Island',
        description:
          'Supervising a team of Worksite Monitors within the Summer Youth Employment Program — recruiting host sites, conducting compliance audits, and mentoring youth participants.',
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
function LeafNode({ leaf }: {
  leaf: { id: string; label: string; href: string | null; external?: boolean };
}) {
  const [hover, setHover] = useState(false);

  if (!leaf.href) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0' }}>
        <div style={{ width: 16, height: 1, background: 'var(--ink-faint)', opacity: 0.25 }} />
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.06em', color: 'var(--ink-faint)', opacity: 0.5 }}>
          {leaf.label}
        </span>
      </div>
    );
  }

  const inner = (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{
        width: 16, height: 1,
        background: hover ? 'var(--accent)' : 'var(--ink-faint)',
        opacity: hover ? 1 : 0.3,
        transition: 'background 0.2s, opacity 0.2s',
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.06em',
        color: hover ? 'var(--accent)' : 'var(--ink-light)',
        transition: 'color 0.2s',
      }}>
        {leaf.label} {leaf.external ? '↗' : '→'}
      </span>
    </div>
  );

  return leaf.external ? (
    <a href={leaf.href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}
      onClick={() => track('click', { element: 'tree-leaf', id: leaf.id })}>
      {inner}
    </a>
  ) : (
    <Link href={leaf.href} style={{ textDecoration: 'none' }}
      onClick={() => track('click', { element: 'tree-leaf', id: leaf.id })}>
      {inner}
    </Link>
  );
}

/* ─────────────────────── sub-branch ─────────────────────── */
function SubBranch({ branch, isMobile }: {
  branch: {
    id: string; label: string; meta: string; description: string;
    leaves?: { id: string; label: string; href: string | null; external?: boolean }[];
    groups?: { label: string; leaves: { id: string; label: string; href: string | null; external?: boolean }[] }[];
  };
  isMobile: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 0, marginBottom: 4 }}>
      {/* Sub-trunk */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0 }}>
        <div style={{ width: 1, flex: '0 0 12px', background: 'var(--ink-faint)', opacity: 0.2 }} />
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: hover || expanded ? 'var(--accent)' : 'var(--ink-faint)',
          opacity: hover || expanded ? 1 : 0.35,
          transition: 'background 0.2s, opacity 0.2s',
          flexShrink: 0,
        }} />
        {expanded && <div style={{ width: 1, flex: 1, minHeight: 8, background: 'var(--ink-faint)', opacity: 0.2 }} />}
      </div>

      <div style={{ flex: 1 }}>
        <button
          onClick={() => { setExpanded(e => !e); track('click', { element: 'tree-subbranch', id: branch.id }); }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0 6px 16px', width: '100%', textAlign: 'left' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 1,
              background: hover || expanded ? 'var(--accent)' : 'var(--ink-faint)',
              opacity: hover || expanded ? 1 : 0.3,
              transition: 'background 0.2s, opacity 0.2s',
              flexShrink: 0,
            }} />
            <div>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                fontSize: isMobile ? '1.05rem' : '1.2rem',
                color: hover || expanded ? 'var(--ink)' : 'var(--ink-light)',
                letterSpacing: '-0.01em',
                transition: 'color 0.2s',
              }}>
                {branch.label}
              </span>
              <span style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.52rem',
                color: 'var(--ink-faint)', marginLeft: 10, opacity: 0.5,
              }}>
                {expanded ? '−' : '+'}
              </span>
              <div style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.52rem',
                letterSpacing: '0.06em', color: 'var(--accent)', opacity: 0.75, marginTop: 3,
              }}>
                {branch.meta}
              </div>
            </div>
          </div>
        </button>

        <div style={{
          overflow: 'hidden',
          maxHeight: expanded ? '2000px' : '0',
          transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <div style={{ paddingLeft: 44, paddingTop: 8, paddingBottom: 16 }}>
            <p style={{
              fontSize: '0.65rem', lineHeight: 1.9, color: 'var(--ink-light)',
              fontWeight: 300, maxWidth: 560, marginBottom: 16, opacity: 0.8,
            }}>
              {branch.description}
            </p>
            {branch.leaves && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {branch.leaves.map(leaf => <LeafNode key={leaf.id} leaf={leaf} />)}
              </div>
            )}
            {branch.groups && branch.groups.map((group, gi) => (
              <div key={gi} style={{ marginBottom: 16 }}>
                <div style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.49rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--ink-faint)', marginBottom: 6, opacity: 0.45,
                }}>
                  {group.label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {group.leaves.map(leaf => <LeafNode key={leaf.id} leaf={leaf} />)}
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
function MainBranch({ branch, isLast, isMobile }: {
  branch: (typeof TREE)[0];
  isLast: boolean;
  isMobile: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: 0 }}>
      {/* Trunk */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 2, flexShrink: 0 }}>
        <div style={{ width: 2, flex: '0 0 32px', background: 'var(--ink)', opacity: 0.1 }} />
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: expanded || hover ? 'var(--accent)' : 'var(--ink)',
          opacity: expanded || hover ? 1 : 0.2,
          transition: 'background 0.25s, opacity 0.25s',
          flexShrink: 0, zIndex: 1,
        }} />
        {!isLast && <div style={{ width: 2, flex: 1, minHeight: 40, background: 'var(--ink)', opacity: 0.1 }} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 0 }}>
        <button
          onClick={() => { setExpanded(e => !e); track('click', { element: 'tree-branch', id: branch.id }); }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '0 0 6px 0', width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center',
          }}
        >
          {/* Horizontal arm */}
          <div style={{
            width: 40, height: 2,
            background: hover || expanded ? 'var(--accent)' : 'var(--ink)',
            opacity: hover || expanded ? 1 : 0.15,
            transition: 'background 0.25s, opacity 0.25s',
            flexShrink: 0, marginTop: 1,
          }} />

          <div style={{ paddingLeft: 20 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                fontSize: isMobile ? 'clamp(1.5rem, 5.5vw, 2rem)' : 'clamp(1.8rem, 2.5vw, 2.4rem)',
                color: 'var(--ink)',
                letterSpacing: '-0.02em', margin: 0,
                opacity: hover || expanded ? 1 : 0.65,
                transition: 'opacity 0.2s',
              }}>
                {branch.label}
              </h3>
              <span style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.52rem',
                letterSpacing: '0.1em', color: 'var(--ink-faint)', opacity: 0.45,
              }}>
                {expanded ? '−' : '+'}
              </span>
            </div>
            <div style={{
              fontFamily: 'DM Mono, monospace', fontSize: '0.54rem',
              letterSpacing: '0.08em', color: 'var(--accent)',
              opacity: hover || expanded ? 0.85 : 0.4,
              transition: 'opacity 0.2s', marginTop: 4,
            }}>
              {branch.meta}
            </div>
          </div>
        </button>

        {/* Children */}
        <div style={{
          overflow: 'hidden',
          maxHeight: expanded ? '5000px' : '0',
          transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          paddingLeft: 60,
          marginTop: expanded ? 16 : 0,
        }}>
          {branch.children.map(sub => (
            <SubBranch key={sub.id} branch={sub as any} isMobile={isMobile} />
          ))}
        </div>

        <div style={{ height: expanded ? 40 : 8, transition: 'height 0.3s' }} />
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
    const t = setTimeout(() => setMounted(true), 80);
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
      }}
    >
      <div style={{ maxWidth: isLargeDesktop ? 1600 : undefined, margin: isLargeDesktop ? '0 auto' : undefined, width: '100%' }}>

        {/* Corner markers */}
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', top: 20, left: 24 }}>03</span>
        <span style={{ position: 'absolute', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink-faint)', top: 20, right: 24 }}>About</span>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: isMobile ? 40 : 56 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>— About Me</span>
          <div style={{ flex: 1, height: 1, background: 'var(--ink-faint)', opacity: 0.4 }} />
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: isMobile ? 'clamp(1.6rem, 7vw, 2.2rem)' : 'clamp(2rem, 3.5vw, 3rem)',
            color: 'var(--ink)', letterSpacing: '-0.02em',
          }}>What I Do</h2>
        </div>

        {/* ── Top row: bio + resume ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
          gap: isMobile ? 32 : 64,
          marginBottom: isMobile ? 56 : 80,
          paddingBottom: isMobile ? 40 : 56,
          borderBottom: '1px solid var(--ink-faint)',
          opacity: 0.9,
        }}>
          {/* Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32 }}>
            <p style={{ fontSize: '0.72rem', lineHeight: 2.0, color: 'var(--ink-light)', fontWeight: 300, maxWidth: 540 }}>
              I'm a CS student at Hunter College who splits his time between writing software,
              teaching others, and helping people find work. I believe in learning by building —
              whether that's a data pipeline, a classroom lesson, or a career path for someone
              who needs it.
            </p>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--ink-faint)', opacity: 0.6 }}>
              B.S. Computer Science · Hunter College, CUNY · Expected 2026
            </div>
          </div>

          {/* Resume */}
          <div style={{
            border: '1px solid var(--ink-faint)',
            borderLeft: '3px solid var(--accent)',
            padding: isMobile ? '20px 20px' : '24px 28px',
            background: 'var(--cream)',
            alignSelf: 'start',
          }}>
            <div style={{ fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 10 }}>
              — Resume
            </div>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
              fontSize: '1.25rem', color: 'var(--ink)', letterSpacing: '-0.01em', marginBottom: 18,
            }}>
              Junaid Tafader
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="/Junaid_1.pdf" target="_blank" rel="noreferrer"
                onClick={() => track('click', { element: 'resume-view' })}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '9px 16px', background: 'var(--ink)', color: 'var(--cream)',
                  fontFamily: 'DM Mono, monospace', fontSize: '0.57rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s', cursor: 'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--ink)'; }}
              >
                View PDF ↗
              </a>
              <a href="/Junaid_1.pdf" download
                onClick={() => track('click', { element: 'resume-download' })}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '9px 16px', border: '1px solid var(--ink-faint)',
                  color: 'var(--ink-light)', textDecoration: 'none',
                  fontFamily: 'DM Mono, monospace', fontSize: '0.57rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', transition: 'color 0.2s, border-color 0.2s', cursor: 'none',
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

        {/* ── Tree ── */}
        <div style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          {/* Root label */}
          <div style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.5rem',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', opacity: 0.35, marginBottom: 20,
            paddingLeft: 2,
          }}>
            Junaid Tafader
          </div>

          {/* Root dot + trunk + branches */}
          <div style={{ display: 'flex' }}>
            {/* Root node */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 2, flexShrink: 0 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--ink)', opacity: 0.18, flexShrink: 0 }} />
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

          {/* Hint */}
          <div style={{
            marginTop: 40,
            fontFamily: 'DM Mono, monospace', fontSize: '0.49rem',
            letterSpacing: '0.12em', color: 'var(--ink-faint)', opacity: 0.3,
            paddingLeft: 2,
          }}>
            click a branch to explore →
          </div>
        </div>
      </div>
    </section>
  );
}
