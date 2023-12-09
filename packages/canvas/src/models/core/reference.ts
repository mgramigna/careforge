import { z } from 'zod';

import { IdentifierSchema } from './identifier';

export const ReferenceSchema = z.object({
  reference: z.string().optional(),
  type: z.string().optional(),
  identifier: IdentifierSchema.optional(),
  display: z.string().optional(),
});
