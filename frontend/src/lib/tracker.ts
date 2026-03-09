const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export function track(type: string, data: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  fetch(`${BACKEND}/api/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data, timestamp: Date.now() }),
  }).catch(() => {});
}
