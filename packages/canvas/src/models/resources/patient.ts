import { z } from 'zod';

import { IdentifierSchema } from '..';
import { ContactPointSchema } from '../core/contactpoint';
import { DateSchema } from '../core/date';

// https://hl7.org/fhir/us/core/STU3.1.1/StructureDefinition-us-core-patient.html
export const PatientSchema = z.object({
  resourceType: z.literal('Patient'),
  id: z.string(),
  identifier: z.array(IdentifierSchema),
  name: z.array(
    z.object({
      use: z
        .enum(['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'])
        .optional(),
      family: z.string().optional(),
      given: z.array(z.string()),
      prefix: z.array(z.string()),
      suffix: z.array(z.string()),
      // TODO: period
    }),
  ),
  gender: z.enum(['male', 'female', 'other', 'unknown']),
  birthDate: DateSchema.optional(),
  telecom: z.array(ContactPointSchema).optional(),
});

export type Patient = z.infer<typeof PatientSchema>;
