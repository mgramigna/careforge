import { z } from 'zod';

import { IdentifierSchema } from '..';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { CodingSchema } from '../core/coding';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const EncounterSchema = createDomainResourceSchema('Encounter').extend({
  identifier: IdentifierSchema.array().optional(),
  status: z.enum([
    'planned',
    'arrived',
    'triaged',
    'in-progress',
    'onleave',
    'finished',
    'cancelled',
  ]),
  class: CodingSchema,
  type: CodeableConceptSchema.array().optional(),
  subject: ReferenceSchema.optional(),
  participant: z
    .array(
      z.object({
        type: CodeableConceptSchema.array().optional(),
        period: PeriodSchema.optional(),
        individual: ReferenceSchema.optional(),
      }),
    )
    .optional(),
  appointment: ReferenceSchema.array().optional(),
  period: PeriodSchema.optional(),
  reasonCode: CodeableConceptSchema.array().optional(),
  reasonReference: ReferenceSchema.array().optional(),
  hospitalization: z
    .object({
      preAdmissionIdentifier: IdentifierSchema.optional(),
      origin: ReferenceSchema.optional(),
      admitSource: CodeableConceptSchema.optional(),
      reAdmission: CodeableConceptSchema.optional(),
      dietPreference: CodeableConceptSchema.array().optional(),
      specialCourtesy: CodeableConceptSchema.array().optional(),
      specialArrangement: CodeableConceptSchema.array().optional(),
      destination: ReferenceSchema.optional(),
      dischargeDisposition: CodeableConceptSchema.optional(),
    })
    .optional(),
  location: z
    .array(
      z.object({
        location: ReferenceSchema,
        status: z.enum(['planned', 'active', 'reserved', 'completed']),
        physicalType: CodeableConceptSchema.optional(),
        period: PeriodSchema.optional(),
      }),
    )
    .optional(),
});

export type Encounter = z.infer<typeof EncounterSchema>;
