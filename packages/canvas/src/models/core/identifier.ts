import { z } from 'zod';

import { CodeableConceptSchema } from './codeableconcept';
import { PeriodSchema } from './period';

export const IdentifierSchema = z.object({
  use: z.enum(['usual', 'official', 'temp', 'secondary', 'old']).optional(),
  type: CodeableConceptSchema.optional(),
  system: z.string().optional(),
  value: z.string().optional(),
  period: PeriodSchema.optional(),
});
