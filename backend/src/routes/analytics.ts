import { Router, Request, Response } from 'express';
import { pool } from '../db/index';
import { requireAuth } from '../middleware/auth';

const router = Router();

// All analytics routes require JWT
router.use(requireAuth);

// GET /api/analytics
router.get('/', async (_req: Request, res: Response) => {
  const [
    totalVisits,
    uniqueVisitors,
    liveVisitors,
    topClicks,
    avgDuration,
    byDay,
    recent,
    topIPs,
  ] = await Promise.all([
    // Total visit count
    pool.query(`SELECT COUNT(*) AS count FROM events WHERE type = 'visit'`),

    // Unique visitors by IP
    pool.query(`SELECT COUNT(DISTINCT ip) AS count FROM events WHERE type = 'visit' AND ip IS NOT NULL`),

    // Live visitors — unique IPs with any event in last 5 minutes
    pool.query(`SELECT COUNT(DISTINCT ip) AS count FROM events WHERE created_at >= NOW() - INTERVAL '5 minutes' AND ip IS NOT NULL`),

    // Most clicked elements
    pool.query(`
      SELECT data->>'element' AS element, COUNT(*) AS count
      FROM events
      WHERE type = 'click' AND data->>'element' IS NOT NULL
      GROUP BY element
      ORDER BY count DESC
      LIMIT 10
    `),

    // Average session duration (in seconds)
    pool.query(`
      SELECT ROUND(AVG((data->>'duration')::numeric), 2) AS avg_seconds
      FROM events
      WHERE type = 'duration' AND data->>'duration' IS NOT NULL
    `),

    // Events grouped by day (last 30 days)
    pool.query(`
      SELECT
        DATE(created_at) AS day,
        COUNT(*) FILTER (WHERE type = 'visit')    AS visits,
        COUNT(*) FILTER (WHERE type = 'click')    AS clicks,
        COUNT(*) FILTER (WHERE type = 'scroll')   AS scrolls,
        COUNT(*) FILTER (WHERE type = 'hover')    AS hovers,
        COUNT(*) FILTER (WHERE type = 'duration') AS durations
      FROM events
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY day
      ORDER BY day ASC
    `),

    // Recent 20 visit events with full detail
    pool.query(`
      SELECT id, type, data, ip, user_agent, created_at
      FROM events
      WHERE type = 'visit'
      ORDER BY created_at DESC
      LIMIT 20
    `),

    // Top IPs by visit count
    pool.query(`
      SELECT ip, COUNT(*) AS count
      FROM events
      WHERE type = 'visit' AND ip IS NOT NULL
      GROUP BY ip
      ORDER BY count DESC
      LIMIT 10
    `),
  ]);

  res.json({
    totalVisits: parseInt(totalVisits.rows[0].count, 10),
    uniqueVisitors: parseInt(uniqueVisitors.rows[0].count, 10),
    liveVisitors: parseInt(liveVisitors.rows[0].count, 10),
    topClicks: topClicks.rows,
    avgSessionDuration: avgDuration.rows[0].avg_seconds ?? 0,
    byDay: byDay.rows,
    recentEvents: recent.rows,
    topIPs: topIPs.rows,
  });
});

export default router;
