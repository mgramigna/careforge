import { z } from 'zod';

import { IdentifierSchema } from '..';
import { AddressSchema } from '../core/address';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateSchema } from '../core/date';
import { DateTimeSchema } from '../core/datetime';
import { MoneySchema } from '../core/money';
import { PeriodSchema } from '../core/period';
import { QuantitySchema } from '../core/quantity';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const ClaimDetailSchema = z.object({
  sequence: z.number(),
  revenue: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.optional(),
  productOrService: CodeableConceptSchema,
  modifier: z.array(CodeableConceptSchema).optional(),
  programCode: z.array(CodeableConceptSchema).optional(),
  quantity: QuantitySchema.optional(),
  unitPrice: MoneySchema.optional(),
  factor: z.number().optional(),
  net: MoneySchema.optional(),
  udi: ReferenceSchema.array().optional(),
});

export const ClaimSchema = createDomainResourceSchema('Claim').extend({
  status: z.literal('active'),
  type: CodeableConceptSchema,
  use: z.literal('claim'),
  patient: ReferenceSchema,
  created: DateTimeSchema,
  provider: ReferenceSchema,
  priority: CodeableConceptSchema,
  supportingInfo: z
    .array(
      z.object({
        sequence: z.number(),
        category: CodeableConceptSchema,
        code: CodeableConceptSchema.optional(),
        timingDate: DateSchema.optional(),
        timingPeriod: PeriodSchema.optional(),
        valueString: z.string(),
      }),
    )
    .optional(),
  diagnosis: z.array(
    z.object({
      sequence: z.number(),
      diagnosisCodeableConcept: CodeableConceptSchema,
    }),
  ),
  insurance: z.array(
    z.object({
      sequence: z.number(),
      focal: z.boolean(),
      identifier: IdentifierSchema.optional(),
      coverage: ReferenceSchema,
      businessArrangement: z.string().optional(),
      preAuthRef: z.array(z.string()).optional(),
      claimResponse: ReferenceSchema.optional(),
    }),
  ),
  item: z.array(
    ClaimDetailSchema.extend({
      careTeamSequence: z.array(z.number()).optional(),
      diagnosisSequence: z.array(z.number()).optional(),
      procedureSequence: z.array(z.number()).optional(),
      informationSequence: z.array(z.number()).optional(),
      servicedDate: DateSchema.optional(),
      servicedPeriod: PeriodSchema.optional(),
      locationCodeableConcept: CodeableConceptSchema.optional(),
      locationAddress: AddressSchema.optional(),
      locationReference: ReferenceSchema.optional(),
      bodySite: CodeableConceptSchema.optional(),
      subSite: CodeableConceptSchema.array().optional(),
      encounter: ReferenceSchema.array().optional(),
      subDetail: ClaimDetailSchema.array().optional(),
    }),
  ),
  total: MoneySchema.optional(),
});

export type Claim = z.infer<typeof ClaimSchema>;
