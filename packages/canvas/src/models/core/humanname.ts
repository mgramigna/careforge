import { z } from 'zod';

import { PeriodSchema } from './period';

export const HumanNameSchema = z.object({
  use: z.enum(['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden']).optional(),
  text: z.string().optional(),
  family: z.string().optional(),
  given: z.string().array().optional(),
  prefix: z.string().array().optional(),
  suffix: z.string().array().optional(),
  period: PeriodSchema.optional(),
});
