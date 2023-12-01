import { z } from 'zod';

import { DateTimeSchema } from './datetime';

export const PeriodSchema = z.object({
  start: DateTimeSchema.optional(),
  end: DateTimeSchema.optional(),
});
