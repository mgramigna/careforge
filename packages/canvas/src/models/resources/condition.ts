import { type z } from 'zod';

import { AnnotationSchema } from '../core/annotation';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { NarrativeSchema } from '../core/narrative';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const ConditionSchema = createDomainResourceSchema('Condition').extend({
  text: NarrativeSchema.optional(),
  clinicalStatus: CodeableConceptSchema.optional(),
  verificationStatus: CodeableConceptSchema.optional(),
  category: CodeableConceptSchema.array().optional(),
  code: CodeableConceptSchema.optional(),
  subject: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  onsetDateTime: DateTimeSchema.optional(),
  abatementDateTime: DateTimeSchema.optional(),
  recordedDate: DateTimeSchema.optional(),
  recorder: ReferenceSchema.optional(),
  note: AnnotationSchema.array().optional(),
});

export type Condition = z.infer<typeof ConditionSchema>;
