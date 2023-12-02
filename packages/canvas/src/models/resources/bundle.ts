import { z } from 'zod';

export const BaseBundleSchema = z.object({
  resourceType: z.literal('Bundle'),
  type: z.enum([
    'batch-response',
    'batch',
    'collection',
    'document',
    'history',
    'message',
    'searchset',
    'transaction-response',
    'transaction',
  ]),
  total: z.number().optional(),
  entry: z
    .array(
      z.object({
        resource: z.any().optional(),
      }),
    )
    .optional(),
});

export const BundleSchema = <T extends z.ZodTypeAny>(resource: T) =>
  BaseBundleSchema.extend({
    entry: z.array(z.object({ resource })).default([]),
  });

export type Bundle = z.infer<typeof BaseBundleSchema>;
