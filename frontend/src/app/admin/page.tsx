'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

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

// ─── Types ───────────────────────────────────────────────────────────────────

interface DayRow {
  day: string;
  visits: string;
  clicks: string;
  scrolls: string;
}

interface ClickRow {
  element: string;
  count: string;
}

interface EventRow {
  id: number;
  type: string;
  data: Record<string, string>;
  ip: string;
  user_agent: string;
  created_at: string;
}

interface IPRow {
  ip: string;
  count: string;
}

interface Analytics {
  totalVisits: number;
  uniqueVisitors: number;
  liveVisitors: number;
  avgSessionDuration: number;
  topClicks: ClickRow[];
  byDay: DayRow[];
  recentEvents: EventRow[];
  topIPs: IPRow[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseUA(ua: string): string {
  if (!ua) return 'Unknown';
  if (/Mobile|Android|iPhone/i.test(ua)) {
    if (/iPhone/i.test(ua)) return 'Mobile · Safari';
    if (/Android/i.test(ua)) return 'Mobile · Chrome';
    return 'Mobile';
  }
  if (/Chrome/i.test(ua) && !/Edge|OPR/i.test(ua)) return 'Desktop · Chrome';
  if (/Firefox/i.test(ua)) return 'Desktop · Firefox';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Desktop · Safari';
  if (/Edge/i.test(ua)) return 'Desktop · Edge';
  return 'Desktop';
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function fmtSeconds(s: number | null): string {
  if (!s) return '—';
  if (s < 60) return `${Math.round(s)}s`;
  return `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{
      background: '#1a1a1a', border: '1px solid #2a2a2a',
      padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(242,237,230,0.35)' }}>
        {label}
      </div>
      <div style={{ fontSize: '2.2rem', fontWeight: 300, color: '#f2ede6', letterSpacing: '-0.03em', lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(242,237,230,0.3)' }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function BarChart({ data }: { data: DayRow[] }) {
  const last7 = data.slice(-7);
  const max = Math.max(...last7.map(d => parseInt(d.visits, 10) || 0), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Bars */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
        {last7.map(d => {
          const visits = parseInt(d.visits, 10) || 0;
          const pct = (visits / max) * 100;
          return (
            <div
              key={d.day}
              title={`${d.day}: ${visits} visits`}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 4, height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <div style={{ fontSize: '0.48rem', color: 'rgba(242,237,230,0.4)', letterSpacing: '0.05em' }}>
                {visits || ''}
              </div>
              <div style={{
                width: '100%',
                height: `${Math.max(pct, 2)}%`,
                background: '#c4572a',
                opacity: 0.85,
                transition: 'height 0.3s ease',
              }} />
            </div>
          );
        })}
      </div>
      {/* X-axis labels */}
      <div style={{ display: 'flex', gap: 6 }}>
        {last7.map(d => (
          <div key={d.day} style={{
            flex: 1, textAlign: 'center',
            fontSize: '0.45rem', letterSpacing: '0.06em',
            color: 'rgba(242,237,230,0.3)', textTransform: 'uppercase',
          }}>
            {new Date(d.day + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
        ))}
      </div>
    </div>
  );
}

function TopClicks({ data }: { data: ClickRow[] }) {
  const max = Math.max(...data.map(d => parseInt(d.count, 10)), 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {data.map((row, i) => {
        const pct = (parseInt(row.count, 10) / max) * 100;
        return (
          <div key={row.element} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.6rem', color: 'rgba(242,237,230,0.7)', letterSpacing: '0.04em' }}>
                <span style={{ color: '#c4572a', marginRight: 8 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {row.element}
              </span>
              <span style={{ fontSize: '0.55rem', color: 'rgba(242,237,230,0.45)', letterSpacing: '0.08em' }}>
                {row.count}
              </span>
            </div>
            <div style={{ height: 2, background: '#2a2a2a', width: '100%' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: '#c4572a', opacity: 0.7 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<Analytics | null>(null);
  const [error, setError] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const { isMobile, isTablet } = useBreakpoint();

  const fetchData = useCallback(async (token: string) => {
    try {
      const res = await fetch(`${BACKEND}/api/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch');
      setData(await res.json());
      setLastRefresh(new Date());
    } catch {
      setError('Failed to load analytics data');
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    fetchData(token);
    const interval = setInterval(() => fetchData(token), 30_000);
    return () => clearInterval(interval);
  }, [router, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const handleRefresh = () => {
    const token = localStorage.getItem('admin_token');
    if (token) fetchData(token);
  };

  // ── Loading ──
  if (!data && !error) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0f0f0f',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'DM Mono, monospace',
      }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(242,237,230,0.3)', textTransform: 'uppercase' }}>
          Loading analytics...
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0f0f0f',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'DM Mono, monospace', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#c4572a' }}>{error}</div>
        <button
          onClick={handleRefresh}
          style={{
            padding: '10px 24px', background: 'transparent',
            border: '1px solid #2a2a2a', color: 'rgba(242,237,230,0.5)',
            fontFamily: 'DM Mono, monospace', fontSize: '0.58rem',
            letterSpacing: '0.12em', cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const statCardCols = isMobile || isTablet ? '1fr 1fr' : 'repeat(4, 1fr)';
  const chartsCols = isMobile ? '1fr' : '2fr 1fr';
  const bottomCols = isMobile ? '1fr' : '2fr 1fr';
  const navPad = isMobile ? '14px 20px' : '18px 40px';
  const tableHeaders = isMobile ? ['Time', 'IP', 'Page'] : ['Time', 'IP', 'Device', 'Page'];

  return (
    <div style={{
      minHeight: '100vh', background: '#0f0f0f',
      fontFamily: 'DM Mono, monospace', color: '#f2ede6',
    }}>

      {/* ── Nav ── */}
      <div style={{
        borderBottom: '1px solid #1e1e1e', padding: navPad,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, background: '#0f0f0f', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 20 }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.14em', color: '#f2ede6' }}>
            {isMobile ? 'jt.com' : 'junaidtafader.com'}
          </span>
          <span style={{ fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c4572a' }}>
            / Analytics
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 24 }}>
          {lastRefresh && !isMobile && (
            <span style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(242,237,230,0.25)' }}>
              Updated {timeAgo(lastRefresh.toISOString())}
            </span>
          )}
          <button
            onClick={handleRefresh}
            style={{
              background: 'transparent', border: 'none',
              fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(242,237,230,0.4)', cursor: 'pointer', padding: '4px 0',
              minHeight: 44,
            }}
          >
            Refresh
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent', border: '1px solid #2a2a2a',
              fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(242,237,230,0.4)', cursor: 'pointer', padding: '6px 14px',
              minHeight: 44,
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '24px 16px 64px' : '40px 40px 80px' }}>

        {/* ── Stat Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: statCardCols, gap: 1, marginBottom: 40 }}>
          <StatCard
            label="Total Visitors"
            value={data!.totalVisits.toLocaleString()}
            sub="All-time page visits"
          />
          <StatCard
            label="Unique Visitors"
            value={data!.uniqueVisitors.toLocaleString()}
            sub="Distinct IPs"
          />
          <StatCard
            label="Live Now"
            value={data!.liveVisitors}
            sub="Active in last 5 min"
          />
          <StatCard
            label="Avg Session"
            value={fmtSeconds(data!.avgSessionDuration)}
            sub="Time on site"
          />
        </div>

        {/* ── Charts row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: chartsCols, gap: 1, marginBottom: 1 }}>

          {/* Visits over time */}
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', padding: isMobile ? '20px 16px' : '28px 32px' }}>
            <div style={{
              fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(242,237,230,0.35)', marginBottom: 28,
            }}>
              — Visits · Last 7 Days
            </div>
            {data!.byDay.length > 0 ? (
              <BarChart data={data!.byDay} />
            ) : (
              <div style={{ fontSize: '0.6rem', color: 'rgba(242,237,230,0.2)', padding: '40px 0', textAlign: 'center' }}>
                No data yet
              </div>
            )}
          </div>

          {/* Top clicks */}
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', padding: isMobile ? '20px 16px' : '28px 32px' }}>
            <div style={{
              fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(242,237,230,0.35)', marginBottom: 28,
            }}>
              — Top Clicks
            </div>
            {data!.topClicks.length > 0 ? (
              <TopClicks data={data!.topClicks} />
            ) : (
              <div style={{ fontSize: '0.6rem', color: 'rgba(242,237,230,0.2)', padding: '40px 0', textAlign: 'center' }}>
                No click data yet
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: bottomCols, gap: 1, marginTop: 1 }}>

          {/* Recent visitors */}
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', padding: isMobile ? '20px 16px' : '28px 32px' }}>
            <div style={{
              fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(242,237,230,0.35)', marginBottom: 28,
            }}>
              — Recent Visitors
            </div>

            {data!.recentEvents.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.58rem' }}>
                  <thead>
                    <tr>
                      {tableHeaders.map(h => (
                        <th key={h} style={{
                          textAlign: 'left', padding: '0 0 12px',
                          fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                          color: 'rgba(242,237,230,0.25)', fontWeight: 400,
                          borderBottom: '1px solid #2a2a2a',
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data!.recentEvents.map(ev => (
                      <tr key={ev.id} style={{ borderBottom: '1px solid #1e1e1e' }}>
                        <td style={{ padding: '10px 0', color: 'rgba(242,237,230,0.45)', whiteSpace: 'nowrap', paddingRight: 24 }}>
                          {timeAgo(ev.created_at)}
                        </td>
                        <td style={{ padding: '10px 0', color: '#f2ede6', paddingRight: 24, whiteSpace: 'nowrap' }}>
                          {ev.ip || '—'}
                        </td>
                        {!isMobile && (
                          <td style={{ padding: '10px 0', color: 'rgba(242,237,230,0.55)', paddingRight: 24, whiteSpace: 'nowrap' }}>
                            {parseUA(ev.user_agent)}
                          </td>
                        )}
                        <td style={{ padding: '10px 0', color: 'rgba(242,237,230,0.4)' }}>
                          {(ev.data?.page as string) || '/'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ fontSize: '0.6rem', color: 'rgba(242,237,230,0.2)', padding: '40px 0', textAlign: 'center' }}>
                No visitors yet
              </div>
            )}
          </div>

          {/* Top IPs — hidden on mobile */}
          {!isMobile && (
            <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', padding: '28px 32px' }}>
              <div style={{
                fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(242,237,230,0.35)', marginBottom: 28,
              }}>
                — Top Visitors
              </div>

              {data!.topIPs.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {data!.topIPs.map((row, i) => (
                    <div key={row.ip} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: '0.48rem', color: '#c4572a', letterSpacing: '0.1em' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span style={{ fontSize: '0.58rem', color: 'rgba(242,237,230,0.65)', letterSpacing: '0.04em' }}>
                          {row.ip}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.52rem', color: 'rgba(242,237,230,0.4)',
                        background: '#111', padding: '2px 8px', letterSpacing: '0.08em',
                      }}>
                        {row.count}×
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '0.6rem', color: 'rgba(242,237,230,0.2)', padding: '40px 0', textAlign: 'center' }}>
                  No data yet
                </div>
              )}

              {/* Live indicator */}
              <div style={{
                marginTop: 32, paddingTop: 20, borderTop: '1px solid #2a2a2a',
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: '0.52rem', letterSpacing: '0.1em', color: 'rgba(242,237,230,0.3)',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: data!.liveVisitors > 0 ? '#5a9a5a' : '#444',
                  display: 'inline-block',
                  boxShadow: data!.liveVisitors > 0 ? '0 0 6px #5a9a5a' : 'none',
                }} />
                {data!.liveVisitors > 0
                  ? `${data!.liveVisitors} active right now`
                  : 'No active visitors'}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
