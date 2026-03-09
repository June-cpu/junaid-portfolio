import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

let hashedAdminPassword: string | null = null;

async function getHashedPassword(): Promise<string> {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD env var is not set');
  }
  if (!hashedAdminPassword) {
    hashedAdminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  }
  return hashedAdminPassword;
}

router.post('/login', async (req: Request, res: Response) => {
  const { password } = req.body as { password?: string };

  if (!password) {
    res.status(400).json({ error: 'Password is required' });
    return;
  }

  try {
    const hashed = await getHashedPassword();
    const match = await bcrypt.compare(password, hashed);

    if (!match) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET env var is not set');
    }

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error', detail: String(err) });
  }
});

export default router;