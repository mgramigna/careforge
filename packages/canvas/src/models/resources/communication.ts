import { z } from 'zod';

import { AttachmentSchema } from '../core/attachment';
import { DateTimeSchema } from '../core/datetime';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';
import { BundleSchema } from './bundle';

export const CommunicationSchema = createDomainResourceSchema('Communication').extend({
  status: z.enum(['unknown', 'in-progress', 'completed']),
  sent: DateTimeSchema.optional(),
  received: DateTimeSchema.optional(),
  recipient: ReferenceSchema.array(),
  sender: ReferenceSchema,
  payload: z.array(
    z.union([
      z.object({
        contentString: z.string(),
      }),
      z.object({
        contentAttachment: AttachmentSchema,
      }),
      z.object({
        contentReference: ReferenceSchema,
      }),
    ]),
  ),
});

export const CommunicationSearchArgsSchema = z.object({
  _id: z.string().optional(),
  recipient: z.string().optional(),
  sender: z.string().optional(),
});

export type Communication = z.infer<typeof CommunicationSchema>;
export type CommunicationSearchArgs = z.infer<typeof CommunicationSearchArgsSchema>;

export const CommunicationBundleSchema = BundleSchema(CommunicationSchema);
export type CommunicationBundle = z.infer<typeof CommunicationBundleSchema>;
