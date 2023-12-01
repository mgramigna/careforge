import { z } from 'zod';

import { IdentifierSchema } from '..';
import { AddressSchema } from '../core/address';
import { ContactPointSchema } from '../core/contactpoint';
import { createDomainResourceSchema } from '../util/domainresource';

export const OrganizationSchema = createDomainResourceSchema('Organization').extend({
  identifier: IdentifierSchema.array().optional(),
  active: z.boolean(),
  name: z.string(),
  telecom: ContactPointSchema.array().optional(),
  address: AddressSchema.array().optional(),
});

export type Organization = z.infer<typeof OrganizationSchema>;
