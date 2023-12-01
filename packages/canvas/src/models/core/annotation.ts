import { z } from 'zod';

import { DateTimeSchema } from './datetime';
import { ReferenceSchema } from './reference';

export const AnnotationSchema = z.object({
  authorReference: ReferenceSchema.optional(),
  authorString: z.string().optional(),
  time: DateTimeSchema.optional(),
  text: z.string(),
});
