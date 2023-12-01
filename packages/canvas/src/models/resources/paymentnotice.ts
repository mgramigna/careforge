import { z } from 'zod';

import { CodeableConceptSchema } from '../core/codeableconcept';
import { DateTimeSchema } from '../core/datetime';
import { MoneySchema } from '../core/money';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const PaymentNoticeSchema = createDomainResourceSchema('PaymentNotice').extend({
  status: z.literal('active'),
  request: ReferenceSchema,
  created: DateTimeSchema,
  payment: ReferenceSchema,
  recipient: ReferenceSchema,
  amount: MoneySchema,
  paymentStatus: CodeableConceptSchema.optional(),
});

export type PaymentNotice = z.infer<typeof PaymentNoticeSchema>;
