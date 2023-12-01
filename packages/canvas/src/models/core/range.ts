import { z } from 'zod';

import { QuantitySchema } from './quantity';

export const RangeSchema = z.object({
  low: QuantitySchema.optional(),
  high: QuantitySchema.optional(),
});
