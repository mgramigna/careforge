import { z } from 'zod';

export const NarrativeSchema = z.object({
  status: z.enum(['generated', 'extensions', 'additional', 'empty']),
  div: z.string(),
});
