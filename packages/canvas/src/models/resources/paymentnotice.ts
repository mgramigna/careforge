import { z } from 'zod';

import { BundleSchema } from '.';
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

export const PaymentNoticeSearchArgsSchema = z.object({
  _id: z.string().optional(),
  request: z.string().optional(),
});

export type PaymentNotice = z.infer<typeof PaymentNoticeSchema>;
export type PaymentNoticeSearchArgs = z.infer<typeof PaymentNoticeSearchArgsSchema>;

export const PaymentNoticeBundleSchema = BundleSchema(PaymentNoticeSchema);
export type PaymentNoticeBundle = z.infer<typeof PaymentNoticeBundleSchema>;
