import { z } from 'zod';

import { InstantSchema } from '../core/instant';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const SlotSchema = createDomainResourceSchema('Slot').extend({
  schedule: ReferenceSchema,
  status: z.enum(['busy', 'free', 'busy-unavailable', 'busy-tentative', 'entered-in-error']),
  start: InstantSchema,
  end: InstantSchema,
});

export type Slot = z.infer<typeof SlotSchema>;
