import { z } from 'zod';

import { BundleSchema } from '.';
import { AnnotationSchema } from '../core/annotation';
import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateSchema } from '../core/date';
import { ExtensionSchema } from '../core/extension';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const GoalSchema = createDomainResourceSchema('Goal').extend({
  lifecycleStatus: z.enum([
    'proposed',
    'planned',
    'accepted',
    'active',
    'on-hold',
    'completed',
    'cancelled',
    'entered-in-error',
    'rejected',
  ]),
  achievementStatus: CodeableConceptSchema.optional(),
  priority: CodeableConceptSchema.optional(),
  description: CodeableConceptSchema,
  subject: ReferenceSchema,
  startDate: DateSchema.optional(),
  target: z
    .array(
      z.object({
        id: z.string().optional(),
        extension: ExtensionSchema.array().optional(),
        modifierExtension: ExtensionSchema.array().optional(),
        measure: CodeableConceptSchema.optional(),
        dueDate: DateSchema.optional(),
      }),
    )
    .optional(),
  expressedBy: ReferenceSchema.optional(),
  note: AnnotationSchema.array().optional(),
});

export const GoalSearchArgsSchema = z.object({
  _id: z.string().optional(),
  patient: z.string().optional(),
});

export type Goal = z.infer<typeof GoalSchema>;
export type GoalSearchArgs = z.infer<typeof GoalSearchArgsSchema>;

export const GoalBundleSchema = BundleSchema(GoalSchema);
export type GoalBundle = z.infer<typeof GoalBundleSchema>;
