import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const chatHistory = pgTable("chat_history", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(), // 'user' or 'model'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChatSchema = createInsertSchema(chatHistory).omit({ id: true, createdAt: true });

export type ChatMessage = typeof chatHistory.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatSchema>;
