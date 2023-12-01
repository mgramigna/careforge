import { z } from 'zod';

import { IdentifierSchema } from '..';
import { AddressSchema } from '../core/address';
import { AttachmentSchema } from '../core/attachment';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { ContactPointSchema } from '../core/contactpoint';
import { DateSchema } from '../core/date';
import { ExtensionSchema } from '../core/extension';
import { HumanNameSchema } from '../core/humanname';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const PatientSchema = createDomainResourceSchema('Patient').extend({
  resourceType: z.literal('Patient'),
  id: z.string(),
  identifier: z.array(IdentifierSchema),
  extension: z.array(ExtensionSchema).optional(),
  name: HumanNameSchema.array(),
  gender: z.enum(['male', 'female', 'other', 'unknown']),
  birthDate: DateSchema.optional(),
  telecom: z.array(ContactPointSchema).optional(),
  deceasedBoolean: z.boolean().optional(),
  address: AddressSchema.array().optional(),
  photo: AttachmentSchema.array().optional(),
  contact: z
    .array(
      z.object({
        id: z.string().optional(),
        extension: z.array(ExtensionSchema).optional(),
        modifierExtension: z.array(ExtensionSchema).optional(),
        relationship: CodeableConceptSchema.array().optional(),
        name: HumanNameSchema.optional(),
        address: AddressSchema.optional(),
        gender: z.enum(['male', 'female', 'other', 'unknown']),
        telecom: ContactPointSchema.array().optional(),
        organization: ReferenceSchema.optional(),
        period: PeriodSchema.optional(),
      }),
    )
    .optional(),
  communication: z
    .array(
      z.object({
        id: z.string().optional(),
        extension: z.array(ExtensionSchema).optional(),
        modifierExtension: z.array(ExtensionSchema).optional(),
        language: CodeableConceptSchema,
        preferred: z.boolean().optional(),
      }),
    )
    .optional(),
});

export type Patient = z.infer<typeof PatientSchema>;
