import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './db/index';
import authRouter from './routes/auth';
import trackRouter from './routes/track';
import analyticsRouter from './routes/analytics';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://junaidtafader.com',
    'https://www.junaidtafader.com',
  ],
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/track', trackRouter);
app.use('/api/analytics', analyticsRouter);

// Start
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error('Failed to initialise database:', err);
    process.exit(1);
  });
