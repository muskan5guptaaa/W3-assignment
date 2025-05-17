import { Request, Response } from 'express';
import { db } from '../config/db';
import { tasks } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

// Extend Express Request interface to include 'user'
declare module 'express-serve-static-core' {
  interface Request {
    user: { id: number }; // Adjust the type as needed
  }
}

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.users?.id);
  if(!userId)
return;
  const userTasks = await db.select().from(tasks).where(eq(tasks.userId, userId));
  res.json(userTasks);
};

export const createTask = async (req: Request, res: Response) => {
const userId = (req.users?.id);
  if(!userId)
return;  const { content } = req.body;
  const task = await db.insert(tasks).values({ userId, content }).returning();
  res.status(201).json(task[0]);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, completed } = req.body;
  const updated = await db.update(tasks).set({ content, completed }).where(eq(tasks.id, id)).returning();
  res.json(updated[0]);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.delete(tasks).where(eq(tasks.id, id));
  res.status(204).send();
};
