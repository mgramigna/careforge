import { z } from 'zod';

import { IdentifierSchema } from '..';
import { AddressSchema } from '../core/address';
import { createDomainResourceSchema } from '../util/domainresource';

export const LocationSchema = createDomainResourceSchema('Location').extend({
  identifier: IdentifierSchema.array().optional(),
  status: z.enum(['active', 'suspended', 'inactive']),
  name: z.string(),
  alias: z.string().array().optional(),
  description: z.string().optional(),
  address: AddressSchema.optional(),
});

export type Location = z.infer<typeof LocationSchema>;
