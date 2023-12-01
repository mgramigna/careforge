import { type z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { NarrativeSchema } from '../core/narrative';
import { createDomainResourceSchema } from '../util/domainresource';

export const MedicationSchema = createDomainResourceSchema('Medication').extend({
  text: NarrativeSchema.optional(),
  code: CodeableConceptSchema,
});

export type Medication = z.infer<typeof MedicationSchema>;
