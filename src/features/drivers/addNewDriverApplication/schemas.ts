import { z } from 'zod';

export const createDriverApplicationSchema = z.object({
  name: z
    .string({ required_error: 'Name required' })
    .trim()
    .min(1, 'Name required'),
});

export type CreateDriverApplicationSchema = z.infer<typeof createDriverApplicationSchema>;
