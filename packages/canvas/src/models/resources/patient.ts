import { z } from 'zod';

import { BundleSchema, IdentifierSchema } from '..';
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
        gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
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

export const PatientSearchArgsSchema = z.object({
  '_has:CareTeam:participant:member': z.boolean().optional(),
  _id: z.string().optional(),
  _sort: z
    .enum(['_id', 'birthdate', 'family', 'given', '-_id', '-birthdate', '-family', '-given'])
    .optional(),
  active: z.boolean().optional(),
  birthdate: DateSchema.optional(),
  email: z.string().email().optional(),
  family: z.string().optional(),
  gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
  given: z.string().optional(),
  identifier: z.string().optional(),
});

export type Patient = z.infer<typeof PatientSchema>;
export type PatientSearchArgs = z.infer<typeof PatientSearchArgsSchema>;

export const PatientBundleSchema = BundleSchema(PatientSchema);
export type PatientBundle = z.infer<typeof PatientBundleSchema>;
