import { z } from "zod";

export const counterSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(50),
  value: z.number().int().min(0).default(0),
  createdAt: z.date().default(() => new Date()),
});

export type Counter = z.infer<typeof counterSchema>;
export type CreateCounter = Omit<Counter, 'id' | 'createdAt'>;
