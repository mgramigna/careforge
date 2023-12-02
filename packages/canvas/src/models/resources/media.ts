import { z } from 'zod';

import { BundleSchema } from '.';
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

export const MediaSearchArgsSchema = z.object({});

export type Media = z.infer<typeof MediaSchema>;
export type MediaSearchArgs = z.infer<typeof MediaSearchArgsSchema>;

export const MediaBundleSchema = BundleSchema(MediaSchema);
export type MediaBundle = z.infer<typeof MediaBundleSchema>;
