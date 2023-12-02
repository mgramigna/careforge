import { z } from 'zod';

import { DateSchema } from '../core/date';
import { InstantSchema } from '../core/instant';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const SlotSchema = createDomainResourceSchema('Slot').extend({
  schedule: ReferenceSchema,
  status: z.enum(['busy', 'free', 'busy-unavailable', 'busy-tentative', 'entered-in-error']),
  start: InstantSchema,
  end: InstantSchema,
});

export const SlotSearchArgsSchema = z.object({
  duration: z.number().optional(),
  end: DateSchema.optional(),
  schedule: z.string(),
  start: DateSchema.optional(),
});

export type Slot = z.infer<typeof SlotSchema>;
export type SlotSearchArgs = z.infer<typeof SlotSearchArgsSchema>;
