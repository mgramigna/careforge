import { z } from 'zod';

import { BundleSchema } from '.';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { InstantSchema } from '../core/instant';
import { PeriodSchema } from '../core/period';
import { QuantitySchema } from '../core/quantity';
import { RangeSchema } from '../core/range';
import { RatioSchema } from '../core/ratio';
import { ReferenceSchema } from '../core/reference';
import { SampledDataSchema } from '../core/sampleddata';
import { TimeSchema } from '../core/time';
import { createDomainResourceSchema } from '../util/domainresource';

const ValueXSchema = z.object({
  valueQuantity: QuantitySchema.optional(),
  valueCodeableConcept: CodeableConceptSchema.optional(),
  valueString: z.string().optional(),
  valueBoolean: z.boolean().optional(),
  valueInteger: z.number().optional(),
  valueRange: RangeSchema.optional(),
  valueRatio: RatioSchema.optional(),
  valueTime: TimeSchema.optional(),
  valueSampledData: SampledDataSchema.optional(),
  valueDateTime: DateTimeSchema.optional(),
  valuePeriod: PeriodSchema.optional(),
});

export const ObservationSchema = createDomainResourceSchema('Observation')
  .extend({
    status: z.enum(['unknown', 'registered', 'preliminary', 'final', 'amended']),
    category: CodeableConceptSchema.array().optional(),
    code: CodeableConceptSchema,
    subject: ReferenceSchema.optional(),
    effectiveDateTime: DateTimeSchema.optional(),
    issued: InstantSchema.optional(),
    hasMember: ReferenceSchema.array().optional(),
    derivedFrom: ReferenceSchema.array().optional(),
    component: z
      .array(
        z
          .object({
            code: CodeableConceptSchema,
            dataAbsentReason: CodeableConceptSchema.optional(),
            interpretation: CodeableConceptSchema.array().optional(),
          })
          .merge(ValueXSchema),
      )
      .optional(),
  })
  .merge(ValueXSchema);

export const ObservationSearchArgsSchema = z.object({
  _id: z.string().optional(),
  category: z.string().optional(),
  code: z.string().optional(),
  date: z.string().optional(),
  'derived-from': z.string().optional(),
  patient: z.string().optional(),
});

export type Observation = z.infer<typeof ObservationSchema>;
export type ObservationSearchArgs = z.infer<typeof ObservationSearchArgsSchema>;

export const ObservationBundleSchema = BundleSchema(ObservationSchema);
export type ObservationBundle = z.infer<typeof ObservationBundleSchema>;
