import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';
import { BundleSchema } from './bundle';

export const GroupSchema = createDomainResourceSchema('Group').extend({
  type: z.enum(['person', 'animal', 'practitioner', 'device', 'medication', 'substance']),
  actual: z.boolean(),
  name: z.string().optional(),
  quantity: z.number().optional(),
  characteristic: z
    .array(
      z.object({
        code: CodeableConceptSchema,
        valueCodeableConcept: CodeableConceptSchema,
        exclude: z.boolean(),
        period: PeriodSchema.optional(),
      }),
    )
    .optional(),
  member: z
    .array(
      z.object({
        entity: ReferenceSchema,
        period: PeriodSchema.optional(),
        inactive: z.boolean().optional(),
      }),
    )
    .optional(),
});

export const GroupSearchArgsSchema = z.object({
  _id: z.string().optional(),
  type: z.string().optional(),
});

export type Group = z.infer<typeof GroupSchema>;
export type GroupSearchArgs = z.infer<typeof GroupSearchArgsSchema>;

export const GroupBundleSchema = BundleSchema(GroupSchema);
export type GroupBundle = z.infer<typeof GroupBundleSchema>;
