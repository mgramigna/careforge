import { z } from 'zod';

import { QuantitySchema } from './quantity';

export const RatioSchema = z.object({
  numerator: QuantitySchema.optional(),
  denominator: QuantitySchema.optional(),
});
