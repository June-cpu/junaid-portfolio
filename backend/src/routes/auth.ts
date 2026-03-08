import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

// Store the hashed password lazily so we hash once on first request
let hashedAdminPassword: string | null = null;

async function getHashedPassword(): Promise<string> {
  if (!hashedAdminPassword) {
    hashedAdminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 10);
  }
  return hashedAdminPassword;
}

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { password } = req.body as { password?: string };

  if (!password) {
    res.status(400).json({ error: 'Password is required' });
    return;
  }

  const hashed = await getHashedPassword();
  const match = await bcrypt.compare(password, hashed);

  if (!match) {
    res.status(401).json({ error: 'Invalid password' });
    return;
  }

  const token = jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET as string,
    { expiresIn: '8h' }
  );

  res.json({ token });
});

export default router;
