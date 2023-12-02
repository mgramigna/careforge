import { z } from 'zod';

import { BundleSchema } from '.';
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

export const CareTeamSearchArgsSchema = z.object({
  participant: z.string().optional(),
  patient: z.string().optional(),
  status: z.string().optional(),
});

export type CareTeam = z.infer<typeof CareTeamSchema>;
export type CareTeamSearchArgs = z.infer<typeof CareTeamSearchArgsSchema>;

export const CareTeamBundleSchema = BundleSchema(CareTeamSchema);
export type CareTeamBundle = z.infer<typeof CareTeamBundleSchema>;
