import { z } from 'zod';

import { BundleSchema } from '.';
import { DateSchema } from '../core/date';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const CoverageEligibilityRequestSchema = createDomainResourceSchema(
  'CoverageEligibilityRequest',
).extend({
  status: z.literal('active'),
  purpose: z.array(z.literal('benefits')),
  patient: ReferenceSchema,
  created: DateSchema,
  insurer: ReferenceSchema,
  insurance: z.array(
    z.object({
      focal: z.boolean(),
      coverage: ReferenceSchema,
      businessArrangement: z.string().optional(),
    }),
  ),
});

export const CoverageEligibilityRequestSearchArgsSchema = z.object({});

export type CoverageEligibilityRequest = z.infer<typeof CoverageEligibilityRequestSchema>;
export type CoverageEligibilityRequestSearchArgs = z.infer<
  typeof CoverageEligibilityRequestSearchArgsSchema
>;

export const CoverageEligibilityRequestBundleSchema = BundleSchema(
  CoverageEligibilityRequestSchema,
);
export type CoverageEligibilityRequestBundle = z.infer<
  typeof CoverageEligibilityRequestBundleSchema
>;
