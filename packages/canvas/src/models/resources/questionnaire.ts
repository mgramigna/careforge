import { z } from 'zod';

import { AttachmentSchema } from '../core/attachment';
import { CodingSchema } from '../core/coding';
import { DateSchema } from '../core/date';
import { DateTimeSchema } from '../core/datetime';
import { QuantitySchema } from '../core/quantity';
import { ReferenceSchema } from '../core/reference';
import { TimeSchema } from '../core/time';
import { createDomainResourceSchema } from '../util/domainresource';

const BaseEnabledWhenSchema = z.object({
  question: z.string(),
  operator: z.enum(['exists', '=', '!=', '>', '<', '>=', '<=']),
});

const BaseAnswerOptionSchema = z.object({
  initialSelected: z.boolean().optional(),
});

const QuestionnaireItemSchema = z.object({
  linkId: z.string(),
  definition: z.string().optional(),
  code: CodingSchema.array().optional(),
  prefix: z.string().optional(),
  text: z.string().optional(),
  type: z.enum(['group', 'display', 'boolean', 'decimal', 'integer', 'date', 'dateTime']),
  enableWhen: z
    .array(
      z.union([
        BaseEnabledWhenSchema.extend({
          answerBoolean: z.boolean(),
        }),
        BaseEnabledWhenSchema.extend({
          answerDecimal: z.number(),
        }),
        BaseEnabledWhenSchema.extend({
          answerInteger: z.null(),
        }),
        BaseEnabledWhenSchema.extend({
          answerDate: DateSchema,
        }),
        BaseEnabledWhenSchema.extend({
          answerDateTime: DateTimeSchema,
        }),
        BaseEnabledWhenSchema.extend({
          answerTime: TimeSchema,
        }),
        BaseEnabledWhenSchema.extend({
          answerString: z.string(),
        }),
        BaseEnabledWhenSchema.extend({
          answerCoding: CodingSchema,
        }),
        BaseEnabledWhenSchema.extend({
          answerQuantity: QuantitySchema,
        }),
        BaseEnabledWhenSchema.extend({
          answerReference: ReferenceSchema,
        }),
      ]),
    )
    .optional(),
  enabledBehavior: z.enum(['all', 'any']).optional(),
  required: z.boolean().optional(),
  repeats: z.boolean().optional(),
  readOnly: z.boolean().optional(),
  maxLength: z.null().optional(),
  answerValueSet: z.string().url(),
  answerOption: z
    .array(
      z.union([
        BaseAnswerOptionSchema.extend({
          valueInteger: z.number(),
        }),
        BaseAnswerOptionSchema.extend({
          valueTime: TimeSchema,
        }),
        BaseAnswerOptionSchema.extend({
          valueString: z.string(),
        }),
        BaseAnswerOptionSchema.extend({
          valueCoding: CodingSchema,
        }),
        BaseAnswerOptionSchema.extend({
          valueReference: ReferenceSchema,
        }),
      ]),
    )
    .optional(),
  initial: z
    .array(
      z.union([
        z.object({
          valueBoolean: z.boolean(),
        }),
        z.object({
          valueDecimal: z.number(),
        }),
        z.object({
          valueInteger: z.number(),
        }),
        z.object({
          valueDate: DateSchema,
        }),
        z.object({
          valueDateTime: DateTimeSchema,
        }),
        z.object({
          valueTime: TimeSchema,
        }),
        z.object({
          valueString: z.string(),
        }),
        z.object({
          valueUri: z.string(),
        }),
        z.object({
          valueAttachment: AttachmentSchema,
        }),
        z.object({
          valueCoding: CodingSchema,
        }),
        z.object({
          valueQuantity: QuantitySchema,
        }),
        z.object({
          valueReference: ReferenceSchema,
        }),
      ]),
    )
    .optional(),
});

export const QuestionnaireSchema = createDomainResourceSchema('Questionnaire').extend({
  name: z.string().optional(),
  status: z.enum(['draft', 'active', 'retired', 'unknown']),
  description: z.string().optional(),
  code: CodingSchema.array().optional(),
  item: QuestionnaireItemSchema.array().optional(),
});

export type Questionnaire = z.infer<typeof QuestionnaireSchema>;
