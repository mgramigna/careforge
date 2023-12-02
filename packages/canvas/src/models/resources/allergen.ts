import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { createDomainResourceSchema } from '../util/domainresource';

export const AllergenSchema = createDomainResourceSchema('Allergen').extend({
  resourceType: z.literal('Allergen'),
  id: z.string(),
  code: CodeableConceptSchema.optional(),
});

export const AllergenSearchArgsSchema = z.object({
  _text: z.string().optional(),
  code: z.string().optional(),
});

export type Allergen = z.infer<typeof AllergenSchema>;
export type AllergenSearchArgs = z.infer<typeof AllergenSearchArgsSchema>;
