import { z } from 'zod';

import { AddressSchema } from '../core/address';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { HumanNameSchema } from '../core/humanname';
import { IdentifierSchema } from '../core/identifier';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';
import { BundleSchema } from './bundle';

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

export const PractitionerSearchArgsSchema = z.object({
  _id: z.string().optional(),
  name: z.string().optional(),
  'include-non-scheduleable-practitioners': z.boolean().optional(),
});

export type Practitioner = z.infer<typeof PractitionerSchema>;
export type PractitionerSearchArgs = z.infer<typeof PractitionerSearchArgsSchema>;

export const PractitionerBundleSchema = BundleSchema(PractitionerSchema);
export type PractitionerBundle = z.infer<typeof PractitionerBundleSchema>;
