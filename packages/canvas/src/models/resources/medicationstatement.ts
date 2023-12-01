import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { DosageSchema } from '../core/dosage';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const MedicationStatementSchema = createDomainResourceSchema('MedicationStatement').extend({
  status: z.enum(['active', 'entered-in-error', 'stopped']),
  medicationCodeableConcept: CodeableConceptSchema.optional(),
  medicationReference: ReferenceSchema.optional(),
  subject: ReferenceSchema,
  context: ReferenceSchema.optional(),
  effectivePeriod: PeriodSchema.optional(),
  dateAsserted: DateTimeSchema.optional(),
  derivedFrom: ReferenceSchema.array().optional(),
  dosage: DosageSchema.array().optional(),
});

export type MedicationStatement = z.infer<typeof MedicationStatementSchema>;
