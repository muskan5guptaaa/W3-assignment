import { Request, Response } from 'express';
import { db } from '../config/db';
import { users } from '../../drizzle/schema';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { eq } from 'drizzle-orm';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashed = await hashPassword(password);
  await db.insert(users).values({ email, password: hashed });
  res.status(201).json({ message: 'User created' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await db.select().from(users).where(eq(users.email, email)).then(r => r[0]);
  if (!user || !(await comparePassword(password, user.password))) return res.status(401).json({ message: 'Invalid' });
  const token = generateToken({ id: user.id });
  res.json({ token });
};
