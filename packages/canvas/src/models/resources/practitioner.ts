import { z } from 'zod';

import { IdentifierSchema } from '..';
import { AddressSchema } from '../core/address';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { HumanNameSchema } from '../core/humanname';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const PractitionerSchema = createDomainResourceSchema('Practitioner').extend({
  identifier: IdentifierSchema.array().optional(),
  name: HumanNameSchema.array().optional(),
  address: AddressSchema.array().optional(),
  qualification: z
    .array(
      z.object({
        identifier: IdentifierSchema.array().optional(),
        code: CodeableConceptSchema,
        period: PeriodSchema.optional(),
        issuer: ReferenceSchema.optional(),
      }),
    )
    .optional(),
});

export type Practitioner = z.infer<typeof PractitionerSchema>;
