import { z } from 'zod';

import { NarrativeSchema } from '../core/narrative';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const ScheduleSchema = createDomainResourceSchema('Schedule').extend({
  text: NarrativeSchema.optional(),
  actor: ReferenceSchema.array(),
  comment: z.string().optional(),
});

export type Schedule = z.infer<typeof ScheduleSchema>;
