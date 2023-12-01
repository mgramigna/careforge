import { z } from 'zod';

import { AnnotationSchema } from '../core/annotation';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { ExtensionSchema } from '../core/extension';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const TaskSchema = createDomainResourceSchema('Task').extend({
  extension: ExtensionSchema.array().optional(),
  status: z.enum(['requested', 'cancelled', 'completed']),
  description: z.string(),
  for: ReferenceSchema.optional(),
  authoredOn: DateTimeSchema.optional(),
  requester: ReferenceSchema.optional(),
  owner: ReferenceSchema.optional(),
  intent: z.enum([
    'unknown',
    'proposal',
    'plan',
    'order',
    'original-order',
    'reflex-order',
    'filler-order',
    'instance-order',
    'option',
  ]),
  restriction: z
    .object({
      repetitions: z.number().optional(),
      period: PeriodSchema.optional(),
      recipient: ReferenceSchema.array().optional(),
    })
    .optional(),
  note: AnnotationSchema.array().optional(),
  input: z
    .array(
      z.object({
        type: CodeableConceptSchema,
        valueString: z.string(),
      }),
    )
    .optional(),
});

export type Task = z.infer<typeof TaskSchema>;
