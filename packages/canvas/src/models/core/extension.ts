import { z } from 'zod';

import { CodingSchema } from './coding';

export const ExtensionSchema = z.object({
  // TODO: sub extensions?
  url: z.string(),
  valueBoolean: z.boolean().optional(),
  valueCode: z.string().optional(),
  valueCodeableConcept: z
    .object({
      coding: z.array(CodingSchema),
      text: z.string(),
    })
    .optional(),
  valueReference: z
    .object({
      display: z.string().optional(),
      reference: z.string(),
    })
    .optional(),
  valueString: z.string().optional(),
  // TODO: other value[x]
});
