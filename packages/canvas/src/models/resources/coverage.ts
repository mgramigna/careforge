import { z } from 'zod';

import { IdentifierSchema } from '..';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const CoverageSchema = createDomainResourceSchema('Coverage').extend({
  status: z.enum(['active', 'cancelled']),
  type: CodeableConceptSchema.optional(),
  subscriber: ReferenceSchema,
  subscriberId: z.string(),
  beneficiary: ReferenceSchema,
  relationship: CodeableConceptSchema,
  period: PeriodSchema.optional(),
  payor: z.union([IdentifierSchema, ReferenceSchema]).array(),
  class: z
    .array(
      z.object({
        type: CodeableConceptSchema,
        value: z.string(),
        name: z.string().optional(),
      }),
    )
    .optional(),
  order: z.number(),
});

export type Coverage = z.infer<typeof CoverageSchema>;
