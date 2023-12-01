import { z } from 'zod';

import { AttachmentSchema } from '../core/attachment';
import { DateTimeSchema } from '../core/datetime';
import { ReferenceSchema } from '../core/reference';
import { createDomainResourceSchema } from '../util/domainresource';

export const CommunicationSchema = createDomainResourceSchema('Communication').extend({
  status: z.literal('unknown'),
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

export type Communication = z.infer<typeof CommunicationSchema>;
