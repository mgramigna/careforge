import { z } from 'zod';

export const QuantitySchema = z.object({
  value: z.number().optional(),
  comparator: z.enum(['<', '<=', '>=', '>']).optional(),
  unit: z.string().optional(),
  system: z.string().optional(),
  code: z.string().optional(),
});
