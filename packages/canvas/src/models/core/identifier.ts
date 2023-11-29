import { z } from 'zod';

export const IdentifierSchema = z.object({
  use: z.enum(['usual', 'official', 'temp', 'secondary', 'old']).optional(),
  system: z.string(),
  value: z.string(),
  // TODO: period, assigner
});
