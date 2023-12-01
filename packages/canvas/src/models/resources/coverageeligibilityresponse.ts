import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { MoneySchema } from '../core/money';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const CoverageEligibilityResponseSchema = createDomainResourceSchema(
  'CoverageEligibilityResponse',
).extend({
  status: z.enum(['active', 'draft', 'entered-in-error']),
  purpose: z.array(z.literal('benefits')),
  patient: ReferenceSchema,
  created: DateTimeSchema,
  request: ReferenceSchema,
  oucome: z.enum(['queued', 'complete', 'error', 'partial']),
  insurer: ReferenceSchema,
  insurance: z
    .array(
      z.object({
        coverage: ReferenceSchema,
        inforce: z.boolean().optional(),
        benefitPeriod: PeriodSchema.optional(),
        item: z.array(
          z.object({
            category: CodeableConceptSchema.optional(),
            productOrService: CodeableConceptSchema.optional(),
            modifier: CodeableConceptSchema.array().optional(),
            provider: ReferenceSchema.optional(),
            excluded: z.boolean(),
            name: z.string().optional(),
            description: z.string().optional(),
            network: CodeableConceptSchema.optional(),
            unit: CodeableConceptSchema.optional(),
            term: CodeableConceptSchema.optional(),
            benefit: z.array(
              z.object({
                type: CodeableConceptSchema,
                allowedUnsignedInt: z.number().optional(),
                allowedString: z.string().optional(),
                allowedMoney: MoneySchema.optional(),
                usedUnsignedInt: z.number().optional(),
                usedString: z.string().optional(),
                usedMoney: MoneySchema.optional(),
              }),
            ),
            authorizationRequired: z.boolean().optional(),
            authorizationSupporting: CodeableConceptSchema.array().optional(),
            authorizationUrl: z.string().optional(),
          }),
        ),
      }),
    )
    .optional(),
});

export type CoverageEligibilityResponse = z.infer<typeof CoverageEligibilityResponseSchema>;
