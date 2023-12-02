import { z } from 'zod';

import { BundleSchema, IdentifierSchema } from '..';
import { AttachmentSchema } from '../core/attachment';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { CodingSchema } from '../core/coding';
import { DateSchema } from '../core/date';
import { InstantSchema } from '../core/instant';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const DocumentReferenceSchema = createDomainResourceSchema('DocumentReference').extend({
  identifier: IdentifierSchema.array().optional(),
  status: z.enum(['current', 'superseded', 'entered-in-error']),
  type: CodeableConceptSchema,
  category: CodeableConceptSchema.array(),
  subject: ReferenceSchema,
  date: InstantSchema.optional(),
  author: ReferenceSchema.array().optional(),
  custodian: ReferenceSchema.optional(),
  content: z.array(
    z.object({
      attachment: AttachmentSchema,
      format: CodingSchema.optional(),
    }),
  ),
  context: z
    .object({
      encounter: ReferenceSchema.optional(),
      period: PeriodSchema.optional(),
    })
    .optional(),
});

export const DocumentReferenceSearchArgsSchema = z.object({
  _id: z.string().optional(),
  category: z.string().optional(),
  date: DateSchema.optional(),
  patient: z.string().optional(),
  status: z.string().optional(),
  subject: z.string().optional(),
  type: z.string().optional(),
});

export type DocumentReference = z.infer<typeof DocumentReferenceSchema>;
export type DocumentReferenceSearchArgs = z.infer<typeof DocumentReferenceSearchArgsSchema>;

export const DocumentReferenceBundleSchema = BundleSchema(DocumentReferenceSchema);
export type DocumentReferenceBundle = z.infer<typeof DocumentReferenceBundleSchema>;
