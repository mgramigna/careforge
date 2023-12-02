import { z } from 'zod';

import { BundleSchema } from '.';
import { AttachmentSchema } from '../core/attachment';
import { CodingSchema } from '../core/coding';
import { DateSchema } from '../core/date';
import { DateTimeSchema } from '../core/datetime';
import { ExtensionSchema } from '../core/extension';
import { QuantitySchema } from '../core/quantity';
import { ReferenceSchema } from '../core/reference';
import { TimeSchema } from '../core/time';
import { createDomainResourceSchema } from '../util/domainresource';

export const QuestionnaireResponseSchema = createDomainResourceSchema(
  'QuestionnaireResponse',
).extend({
  extension: ExtensionSchema.array().optional(),
  questionnaire: z.string().optional(),
  status: z.enum(['in-progress', 'completed', 'amended', 'entered-in-error', 'stopped']),
  subject: ReferenceSchema.optional(),
  encounter: ReferenceSchema.optional(),
  authored: DateTimeSchema.optional(),
  author: ReferenceSchema.optional(),
  item: z
    .array(
      z.object({
        linkId: z.string(),
        definition: z.string().optional(),
        text: z.string().optional(),
        answer: z
          .array(
            z.object({
              valueBoolean: z.boolean().optional(),
              valueDecimal: z.number().optional(),
              valueInteger: z.number().optional(),
              valueDate: DateSchema.optional(),
              valueDateTime: DateTimeSchema.optional(),
              valueTime: TimeSchema.optional(),
              valueString: z.string().optional(),
              valueUri: z.string().optional(),
              valueAttachment: AttachmentSchema.optional(),
              valueCoding: CodingSchema.optional(),
              valueQuantity: QuantitySchema.optional(),
              valueReference: ReferenceSchema.optional(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
});

export const QuestionnaireResponseSearchArgsSchema = z.object({
  _id: z.string().optional(),
  authored: z.string().optional(),
  patient: z.string().optional(),
  questionnaire: z.string().optional(),
  'questionnaire.code': z.string().optional(),
  'questionnaire.item.code': z.string().optional(),
  _sort: z.enum(['_id', 'authored', '-_id', '-authored']),
});

export type QuestionnaireResponse = z.infer<typeof QuestionnaireResponseSchema>;
export type QuestionnaireResponseSearchArgs = z.infer<typeof QuestionnaireResponseSearchArgsSchema>;

export const QuestionnaireResponseBundleSchema = BundleSchema(QuestionnaireResponseSchema);
export type QuestionnaireResponseBundle = z.infer<typeof QuestionnaireResponseBundleSchema>;
