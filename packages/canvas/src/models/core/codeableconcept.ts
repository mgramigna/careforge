import { z } from 'zod';

import { CodingSchema } from './coding';

export const CodeableConceptSchema = z.object({
  coding: z.array(CodingSchema).optional(),
  text: z.string().optional(),
});
