import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { InstantSchema } from '../core/instant';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const ProvenanceSchema = createDomainResourceSchema('Provenance').extend({
  target: ReferenceSchema.array(),
  recorded: InstantSchema,
  activity: CodeableConceptSchema.optional(),
  agent: z
    .array(
      z.object({
        id: z.string().optional(),
        type: CodeableConceptSchema,
        who: ReferenceSchema,
        onBehalfOf: ReferenceSchema,
      }),
    )
    .optional(),
});

export type Provenance = z.infer<typeof ProvenanceSchema>;
