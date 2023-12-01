import { z } from 'zod';

import { CodeableConceptSchema } from './codeableconcept';
import { DateTimeSchema } from './datetime';
import { PeriodSchema } from './period';
import { QuantitySchema } from './quantity';
import { RangeSchema } from './range';
import { TimeSchema } from './time';

export const TimingSchema = z.object({
  event: DateTimeSchema.array().optional(),
  repeat: z
    .object({
      boundsDuration: QuantitySchema.optional(),
      boundsRange: RangeSchema.optional(),
      boundsPeriod: PeriodSchema.optional(),
      count: z.number().optional(),
      countMax: z.number().optional(),
      duration: z.number().optional(),
      durationMax: z.number().optional(),
      durationUnit: z.enum(['s', 'min', 'h', 'd', 'wk', 'mo', 'a']),
      frequency: z.number().optional(),
      frequencyMax: z.number().optional(),
      period: z.number().optional(),
      periodMax: z.number().optional(),
      periodUnit: z.enum(['s', 'min', 'h', 'd', 'wk', 'mo', 'a']).optional(),
      dayOfWeek: z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']).array().optional(),
      timeOfDay: TimeSchema.array().optional(),
      when: z.string().array().optional(),
      offset: z.number().optional(),
    })
    .optional(),
  code: CodeableConceptSchema.optional(),
});
