import { z } from 'zod';

import { AddressSchema } from '../core/address';
import { ContactPointSchema } from '../core/contactpoint';
import { IdentifierSchema } from '../core/identifier';
import { createDomainResourceSchema } from '../util/domainresource';
import { BundleSchema } from './bundle';

export const OrganizationSchema = createDomainResourceSchema('Organization').extend({
  identifier: IdentifierSchema.array().optional(),
  active: z.boolean(),
  name: z.string(),
  telecom: ContactPointSchema.array().optional(),
  address: AddressSchema.array().optional(),
});

export const OrganizationSearchArgsSchema = z.object({
  _id: z.string().optional(),
  address: z.string().optional(),
  name: z.string().optional(),
});

export type Organization = z.infer<typeof OrganizationSchema>;
export type OrganizationSearchArgs = z.infer<typeof OrganizationSearchArgsSchema>;

export const OrganizationBundleSchema = BundleSchema(OrganizationSchema);
export type OrganizationBundle = z.infer<typeof OrganizationBundleSchema>;
