import { z } from 'zod';

import { AttachmentSchema } from '../core/attachment';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { CodingSchema } from '../core/coding';
import { DateTimeSchema } from '../core/datetime';
import { PeriodSchema } from '../core/period';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';
import { BundleSchema } from './bundle';

const BaseConsentProvisionSchema = z.object({
  type: z.enum(['deny', 'permit']).optional(),
  period: PeriodSchema.optional(),
  actor: z
    .array(
      z.object({
        role: CodeableConceptSchema,
        reference: ReferenceSchema,
      }),
    )
    .optional(),
  action: CodeableConceptSchema.array().optional(),
  securityLabel: CodingSchema.array().optional(),
  purpose: CodingSchema.array().optional(),
  class: CodingSchema.array().optional(),
  code: CodeableConceptSchema.array().optional(),
  dataPeriod: PeriodSchema.optional(),
  data: z
    .array(
      z.object({
        meaning: z.enum(['instance', 'related', 'dependents', 'authoredby']),
        reference: ReferenceSchema,
      }),
    )
    .optional(),
});

export const ConsentProvisionSchema = BaseConsentProvisionSchema.extend({
  provision: z.lazy(() => BaseConsentProvisionSchema.array().optional()),
});

export const ConsentSchema = createDomainResourceSchema('Consent').extend({
  status: z.enum(['active', 'inactive', 'rejected']),
  scope: CodeableConceptSchema,
  category: CodeableConceptSchema.array(),
  patient: ReferenceSchema,
  dateTime: DateTimeSchema,
  sourceAttachment: AttachmentSchema.optional(),
  provision: ConsentProvisionSchema,
});

export const ConsentSearchArgsSchema = z.object({
  _id: z.string().optional(),
  patient: z.string().optional(),
  period: z.string().optional(),
});

export type Consent = z.infer<typeof ConsentSchema>;
export type ConsentSearchArgs = z.infer<typeof ConsentSearchArgsSchema>;

export const ConsentBundleSchema = BundleSchema(ConsentSchema);
export type ConsentBundle = z.infer<typeof ConsentBundleSchema>;
