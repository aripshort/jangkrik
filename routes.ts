import { z } from 'zod';
import { insertChatSchema, chatHistory } from './schema';

export const errorSchemas = {
  internal: z.object({ message: z.string() }),
};

export const api = {
  chat: {
    history: {
      method: 'GET' as const,
      path: '/api/chat/history' as const,
      responses: {
        200: z.array(z.custom<typeof chatHistory.$inferSelect>()),
      },
    },
    message: {
      method: 'POST' as const,
      path: '/api/chat/message' as const,
      input: z.object({
        message: z.string(),
      }),
      responses: {
        200: z.object({
          response: z.string(),
        }),
        500: errorSchemas.internal,
      },
    },
    clear: {
      method: 'POST' as const,
      path: '/api/chat/clear' as const,
      responses: {
        200: z.object({ success: z.boolean() }),
      }
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
