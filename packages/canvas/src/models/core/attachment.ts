import { z } from 'zod';

import { DateTimeSchema } from './datetime';

export const AttachmentSchema = z.object({
  contentType: z.string().optional(),
  language: z.string().optional(),
  data: z.string().optional(),
  url: z.string().optional(),
  size: z.number().optional(),
  hash: z.string().optional(),
  title: z.string().optional(),
  creation: DateTimeSchema.optional(),
});
