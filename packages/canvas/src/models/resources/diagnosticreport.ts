import { z } from 'zod';

import { AttachmentSchema } from '../core/attachment';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { InstantSchema } from '../core/instant';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const DiagnosticReportSchema = createDomainResourceSchema('DiagnosticReport').extend({
  status: z.enum(['registered', 'partial', 'preliminary', 'final']),
  category: CodeableConceptSchema.array().optional(),
  code: CodeableConceptSchema,
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  effectiveDateTime: DateTimeSchema.optional(),
  issued: InstantSchema.optional(),
  performer: ReferenceSchema.array().optional(),
  result: ReferenceSchema.array().optional(),
  presentedForm: AttachmentSchema.array().optional(),
});

export type DiagnosticReport = z.infer<typeof DiagnosticReportSchema>;
