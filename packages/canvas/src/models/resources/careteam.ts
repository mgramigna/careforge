import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const CareTeamSchema = createDomainResourceSchema('CareTeam').extend({
  status: z.enum(['proposed', 'active', 'suspended', 'inactive']),
  name: z.string().optional(),
  subject: ReferenceSchema,
  participant: z.array(
    z.object({
      role: CodeableConceptSchema.array(),
      member: ReferenceSchema,
    }),
  ),
});

export type CareTeam = z.infer<typeof CareTeamSchema>;
