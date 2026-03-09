import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function initDB(): Promise<void> {
  try {
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
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialise database:', error);
    throw error;
  }
}