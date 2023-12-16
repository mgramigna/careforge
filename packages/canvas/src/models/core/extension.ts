import { z } from 'zod';

import { CodingSchema } from './coding';

const BaseExtensionSchema = z.object({
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
  valueCoding: CodingSchema.optional(),
  // TODO: other value[x]
});

export const ExtensionSchema = BaseExtensionSchema.extend({
  extension: z.lazy(() => BaseExtensionSchema.array().optional()),
});
