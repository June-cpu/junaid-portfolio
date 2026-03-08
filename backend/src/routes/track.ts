import { Router, Request, Response } from 'express';
import { pool } from '../db/index';

const router = Router();

const ALLOWED_TYPES = new Set(['visit', 'click', 'scroll', 'hover', 'duration']);

// POST /api/track
router.post('/', async (req: Request, res: Response) => {
  const { type, data } = req.body as { type?: string; data?: Record<string, unknown> };

  if (!type || !ALLOWED_TYPES.has(type)) {
    res.status(400).json({ error: 'Invalid event type' });
    return;
  }

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    null;

  const userAgent = req.headers['user-agent'] || null;

  await pool.query(
    `INSERT INTO events (type, data, ip, user_agent) VALUES ($1, $2, $3, $4)`,
    [type, JSON.stringify(data ?? {}), ip, userAgent]
  );

  res.status(204).end();
});

export default router;
