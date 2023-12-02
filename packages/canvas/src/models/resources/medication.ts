import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { NarrativeSchema } from '../core/narrative';
import { createDomainResourceSchema } from '../util/domainresource';

export const MedicationSchema = createDomainResourceSchema('Medication').extend({
  text: NarrativeSchema.optional(),
  code: CodeableConceptSchema,
});

export const MedicationSearchArgsSchema = z.object({
  _text: z.string().optional(),
  code: z.string().optional(),
});

export type Medication = z.infer<typeof MedicationSchema>;
export type MedicationSearchArgs = z.infer<typeof MedicationSearchArgsSchema>;
