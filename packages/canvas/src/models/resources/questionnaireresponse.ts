import { z } from 'zod';

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
  questionnaire: z.string().url().optional(),
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

export type QuestionnaireResponse = z.infer<typeof QuestionnaireResponseSchema>;
