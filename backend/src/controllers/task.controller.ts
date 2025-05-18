import { Request, Response } from 'express';
import { db } from '../config/db';
import { tasks } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { GoogleGenerativeAI } from "@google/generative-ai";



const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);



export const generateTasksWithGemini = async (req: Request, res: Response): Promise<void> => {
try {
const { topic } = req.body;
if (!topic) {
 res.status(400).json({ success: false, message: "Topic is required" });
 return
}
const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `Generate a list of 5 concise, actionable tasks to learn about ${topic}. Return only the tasks, no numbering or formatting.`;

const result = await model.generateContent(prompt);
const text = await result.response.text();

const tasks = text
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

res.status(200).json({ success: true, topic, tasks });
} catch (error) {
console.error("Gemini API Error:", error);
res.status(500).json({ success: false, message: "Failed to generate tasks" });
}
};




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
