import { z } from 'zod';

import { AddressSchema } from '../core/address';
import { IdentifierSchema } from '../core/identifier';
import { createDomainResourceSchema } from '../util/domainresource';
import { BundleSchema } from './bundle';

export const LocationSchema = createDomainResourceSchema('Location').extend({
  identifier: IdentifierSchema.array().optional(),
  status: z.enum(['active', 'suspended', 'inactive']),
  name: z.string(),
  alias: z.string().array().optional(),
  description: z.string().optional(),
  address: AddressSchema.optional(),
});

export const LocationSearchArgsSchema = z.object({
  _id: z.string().optional(),
});

export type Location = z.infer<typeof LocationSchema>;
export type LocationSearchArgs = z.infer<typeof LocationSearchArgsSchema>;

export const LocationBundleSchema = BundleSchema(LocationSchema);
export type LocationBundle = z.infer<typeof LocationBundleSchema>;
