import { z } from 'zod';

export const CodingSchema = z.object({
  code: z.string().optional(),
  display: z.string().optional(),
  system: z.string().optional(),
  userSelected: z.boolean().optional(),
  version: z.string().optional(),
});
