import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { createDomainResourceSchema } from '../util/domainresource';

export const AllergenSchema = createDomainResourceSchema('Allergen').extend({
  resourceType: z.literal('Allergen'),
  id: z.string(),
  code: CodeableConceptSchema.optional(),
});

export type Allergen = z.infer<typeof AllergenSchema>;
