import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { DosageSchema } from '../core/dosage';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';
import { BundleSchema } from './bundle';

export const MedicationStatementSchema = createDomainResourceSchema('MedicationStatement').extend({
  status: z.enum(['active', 'entered-in-error', 'stopped', 'intended']),
  medicationCodeableConcept: CodeableConceptSchema.optional(),
  medicationReference: ReferenceSchema.optional(),
  subject: ReferenceSchema,
  context: ReferenceSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  dateAsserted: DateTimeSchema.optional(),
  derivedFrom: ReferenceSchema.array().optional(),
  dosage: DosageSchema.array().optional(),
});

export const MedicationStatementSearchArgsSchema = z.object({
  _id: z.string().optional(),
  patient: z.string().optional(),
});

export type MedicationStatement = z.infer<typeof MedicationStatementSchema>;
export type MedicationStatementSearchArgs = z.infer<typeof MedicationStatementSearchArgsSchema>;

export const MedicationStatementBundleSchema = BundleSchema(MedicationStatementSchema);
export type MedicationStatementBundle = z.infer<typeof MedicationStatementBundleSchema>;
