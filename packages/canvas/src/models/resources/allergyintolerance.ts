import { z } from 'zod';

import { BundleSchema } from '.';
import { AnnotationSchema } from '../core/annotation';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { ExtensionSchema } from '../core/extension';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const AllergyIntoleranceSchema = createDomainResourceSchema('AllergyIntolerance').extend({
  id: z.string(),
  clinicalStatus: CodeableConceptSchema.optional(),
  verificationStatus: CodeableConceptSchema.optional(),
  type: z.enum(['allergy', 'intolerance']).optional(),
  code: CodeableConceptSchema,
  patient: ReferenceSchema,
  encounter: ReferenceSchema.optional(),
  onsetDateTime: DateTimeSchema.optional(),
  recordedDate: DateTimeSchema.optional(),
  recorder: ReferenceSchema.optional(),
  lastOccurrence: DateTimeSchema.optional(),
  note: z.array(AnnotationSchema).optional(),
  reaction: z
    .array(
      z.object({
        id: z.string().optional(),
        extension: z.array(ExtensionSchema).optional(),
        modifierExtension: z.array(ExtensionSchema).optional(),
        substance: CodeableConceptSchema.optional(),
        manifestation: z.array(CodeableConceptSchema),
        description: z.string().optional(),
        onset: DateTimeSchema.optional(),
        severity: z.enum(['mild', 'moderate', 'severe']).optional(),
        exposureRoute: CodeableConceptSchema.optional(),
        note: z.array(AnnotationSchema).optional(),
      }),
    )
    .optional(),
});

export const AllergyIntoleranceSearchArgsSchema = z.object({
  _id: z.string().optional(),
  patient: z.string().optional(),
});

export type AllergyIntolerance = z.infer<typeof AllergyIntoleranceSchema>;
export type AllergyIntoleranceSearchArgs = z.infer<typeof AllergyIntoleranceSearchArgsSchema>;

export const AllergyIntoleranceBundleSchema = BundleSchema(AllergyIntoleranceSchema);
export type AllergyIntoleranceBundle = z.infer<typeof AllergyIntoleranceBundleSchema>;
