import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initDB(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id          SERIAL PRIMARY KEY,
      type        TEXT NOT NULL,
      data        JSONB NOT NULL DEFAULT '{}',
      ip          TEXT,
      user_agent  TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS events_type_idx       ON events (type);
    CREATE INDEX IF NOT EXISTS events_created_at_idx ON events (created_at);
    CREATE INDEX IF NOT EXISTS events_ip_idx         ON events (ip);
  `);
}
