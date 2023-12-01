import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { NarrativeSchema } from '../core/narrative';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const CarePlanSchema = createDomainResourceSchema('CarePlan').extend({
  text: NarrativeSchema,
  status: z.enum([
    'draft',
    'active',
    'on-hold',
    'revoked',
    'completed',
    'entered-in-error',
    'unknown',
  ]),
  intent: z.enum(['proposal', 'plan', 'order', 'option']),
  category: z.array(CodeableConceptSchema),
  subject: ReferenceSchema,
});

export type CarePlan = z.infer<typeof CarePlanSchema>;
