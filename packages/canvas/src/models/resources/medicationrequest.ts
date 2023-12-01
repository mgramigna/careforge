import { z } from 'zod';

import { AnnotationSchema } from '../core/annotation';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { DosageSchema } from '../core/dosage';
import { ExtensionSchema } from '../core/extension';
import { PeriodSchema } from '../core/period';
import { QuantitySchema } from '../core/quantity';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

const BaseSubstitutionSchema = z.object({
  id: z.string(),
  extension: ExtensionSchema.array().optional(),
  modifierExtension: ExtensionSchema.array().optional(),
});

export const MedicationRequestSchema = createDomainResourceSchema('MedicationRequest').extend({
  status: z.enum([
    'active',
    'on-hold',
    'cancelled',
    'completed',
    'entered-in-error',
    'stopped',
    'draft',
    'unknown',
  ]),
  intent: z.enum([
    'proposal',
    'plan',
    'order',
    'original-order',
    'reflex-order',
    'filler-order',
    'instance-order',
    'option',
  ]),
  reportedBoolean: z.boolean().optional(),
  medicationCodeableConcept: CodeableConceptSchema,
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  authoredOn: DateTimeSchema,
  requester: ReferenceSchema,
  reasonCode: CodeableConceptSchema.array().optional(),
  note: AnnotationSchema.array().optional(),
  dosageInstruction: DosageSchema.array().optional(),
  dispenseRequest: z
    .object({
      id: z.string(),
      extension: ExtensionSchema.array().optional(),
      modifierExtension: ExtensionSchema.array().optional(),
      initialFill: z
        .object({
          id: z.string(),
          extension: ExtensionSchema.array().optional(),
          modifierExtension: ExtensionSchema.array().optional(),
          quantity: QuantitySchema.optional(),
          duration: QuantitySchema.optional(),
        })
        .optional(),
      dispenseInterval: QuantitySchema.optional(),
      validityPeriod: PeriodSchema.optional(),
      numberOfRepeatsAllowed: z.number().optional(),
      quantity: QuantitySchema.optional(),
      expectedSupplyDuration: QuantitySchema.optional(),
      performer: ReferenceSchema.optional(),
    })
    .optional(),
  substitution: z.union([
    BaseSubstitutionSchema.extend({
      allowedBoolean: z.boolean(),
    }),
    BaseSubstitutionSchema.extend({
      allowedCodeableConcept: CodeableConceptSchema,
    }),
  ]),
});

export type MedicationRequest = z.infer<typeof MedicationRequestSchema>;
