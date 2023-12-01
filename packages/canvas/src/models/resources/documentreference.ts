import { z } from 'zod';

import { IdentifierSchema } from '..';
import { AttachmentSchema } from '../core/attachment';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { CodingSchema } from '../core/coding';
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

export type DocumentReference = z.infer<typeof DocumentReferenceSchema>;
