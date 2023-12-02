import { z } from 'zod';

import { BundleSchema } from '.';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateSchema } from '../core/date';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const ImmunizationSchema = createDomainResourceSchema('Immunization').extend({
  status: z.enum(['completed', 'not-done', 'entered-in-error']),
  statusReason: CodeableConceptSchema.optional(),
  vaccineCode: CodeableConceptSchema,
  patient: ReferenceSchema,
  occurrenceDateTime: DateSchema,
  primarySource: z.boolean(),
});

export const ImmunizationSearchArgsSchema = z.object({
  _id: z.string().optional(),
  patient: z.string().optional(),
});

export type Immunization = z.infer<typeof ImmunizationSchema>;
export type ImmunizationSearchArgs = z.infer<typeof ImmunizationSearchArgsSchema>;

export const ImmunizationBundleSchema = BundleSchema(ImmunizationSchema);
export type ImmunizationBundle = z.infer<typeof ImmunizationBundleSchema>;
