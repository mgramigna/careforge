import { z } from 'zod';

import { CodeableConceptSchema } from './codeableconcept';
import { QuantitySchema } from './quantity';
import { RangeSchema } from './range';
import { RatioSchema } from './ratio';
import { TimingSchema } from './timing';

export const DosageSchema = z.object({
  sequence: z.number(),
  text: z.string(),
  additionalInformation: CodeableConceptSchema.array().optional(),
  patientInstructions: z.string().optional(),
  timing: TimingSchema.optional(),
  asNeededBoolean: z.boolean().optional(),
  asNeededCodeableConcept: CodeableConceptSchema.optional(),
  site: CodeableConceptSchema.optional(),
  route: CodeableConceptSchema.optional(),
  method: CodeableConceptSchema.optional(),
  doseAndRate: z
    .array(
      z.object({
        type: CodeableConceptSchema.optional(),
        doseRange: RangeSchema.optional(),
        doseQuantity: QuantitySchema.optional(),
        rateRatio: RatioSchema.optional(),
        rateRange: RangeSchema.optional(),
        rateQuantity: QuantitySchema.optional(),
      }),
    )
    .optional(),
  maxDosePerPeriod: RatioSchema.optional(),
  maxDosePerAdministration: QuantitySchema.optional(),
  maxDosePerLifetime: QuantitySchema.optional(),
});
