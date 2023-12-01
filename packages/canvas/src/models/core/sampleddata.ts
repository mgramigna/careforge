import { z } from 'zod';

import { QuantitySchema } from './quantity';

export const SampledDataSchema = z.object({
  origin: QuantitySchema,
  period: z.number(),
  factor: z.number().optional(),
  lowerLimit: z.number().optional(),
  upperLimit: z.number().optional(),
  dimensions: z.number(),
  data: z.string().optional(),
});
