import { z } from 'zod';

export const MoneySchema = z.object({
  value: z.number().optional(),
  currency: z.string().optional(),
});
