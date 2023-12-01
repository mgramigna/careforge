import { z } from 'zod';

import { IdentifierSchema } from '..';
import { ContactPointSchema } from '../core/contactpoint';
import { DateSchema } from '../core/date';
import { ExtensionSchema } from '../core/extension';

// https://hl7.org/fhir/us/core/STU3.1.1/StructureDefinition-us-core-patient.html
export const PatientSchema = z.object({
  resourceType: z.literal('Patient'),
  id: z.string(),
  identifier: z.array(IdentifierSchema),
  extension: z.array(ExtensionSchema).optional(),
  name: z.array(
    z.object({
      use: z
        .enum(['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'])
        .optional(),
      family: z.string().optional(),
      given: z.array(z.string()).optional(),
      prefix: z.array(z.string()).optional(),
      suffix: z.array(z.string()).optional(),
      // TODO: period
    }),
  ),
  gender: z.enum(['male', 'female', 'other', 'unknown']),
  birthDate: DateSchema.optional(),
  telecom: z.array(ContactPointSchema).optional(),
});

export type Patient = z.infer<typeof PatientSchema>;
