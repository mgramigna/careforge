import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const ProcedureSchema = createDomainResourceSchema('Procedure').extend({
  status: z.enum([
    'preparation',
    'in-progress',
    'not-done',
    'on-hold',
    'stopped',
    'completed',
    'entered-in-error',
    'unknown',
  ]),
  code: CodeableConceptSchema,
  subject: ReferenceSchema,
  performedDateTime: DateTimeSchema,
});

export const ProcedureSearchArgsSchema = z.object({
  _id: z.string().optional(),
  patient: z.string().optional(),
});

export type Procedure = z.infer<typeof ProcedureSchema>;
export type ProcedureSearchArgs = z.infer<typeof ProcedureSearchArgsSchema>;
