import { z } from 'zod';

import { NarrativeSchema } from '../core/narrative';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';
import { BundleSchema } from './bundle';

export const ScheduleSchema = createDomainResourceSchema('Schedule').extend({
  text: NarrativeSchema.optional(),
  actor: ReferenceSchema.array(),
  comment: z.string().optional(),
});

export const ScheduleSearchArgsSchema = z.object({});

export type Schedule = z.infer<typeof ScheduleSchema>;
export type ScheduleSearchArgs = z.infer<typeof ScheduleSearchArgsSchema>;

export const ScheduleBundleSchema = BundleSchema(ScheduleSchema);
export type ScheduleBundle = z.infer<typeof ScheduleBundleSchema>;
