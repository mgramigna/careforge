import { z } from 'zod';

import { AnnotationSchema } from '../core/annotation';
import { AttachmentSchema } from '../core/attachment';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const MediaSchema = createDomainResourceSchema('Media').extend({
  status: z.enum([
    'preparation',
    'in-progress',
    'not-done',
    'on-hold',
    'stopped',
    'completed',
    'entered-in-error',
    'unknown',
  ]),
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  operator: ReferenceSchema.optional(),
  content: AttachmentSchema,
  note: AnnotationSchema.array().optional(),
});

export type Media = z.infer<typeof MediaSchema>;
