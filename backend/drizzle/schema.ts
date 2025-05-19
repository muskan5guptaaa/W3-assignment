import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core';



export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});