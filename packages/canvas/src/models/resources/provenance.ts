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

export const ProvenanceSearchArgsSchema = z.object({
  _id: z.string().optional(),
  agent: z.string().optional(),
  patient: z.string().optional(),
  target: z.string().optional(),
});

export type Provenance = z.infer<typeof ProvenanceSchema>;
export type ProvenanceSearchArgs = z.infer<typeof ProvenanceSearchArgsSchema>;
