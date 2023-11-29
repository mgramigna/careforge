import { z } from 'zod';

export const ContactPointSchema = z.object({
  system: z.enum(['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other']),
  value: z.string(),
  use: z.enum(['home', 'work', 'temp', 'old', 'mobile']).optional(),
});
