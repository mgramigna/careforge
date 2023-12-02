import { err } from 'neverthrow';

import {
  OrganizationBundleSchema,
  OrganizationSchema,
  OrganizationSearchArgsSchema,
  type Organization,
  type OrganizationBundle,
  type OrganizationSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirGetRequest } from '../utils/fetch';

export type OrganizationServiceType = Service<
  Organization,
  OrganizationSearchArgs,
  OrganizationBundle,
  never,
  never
>;

export const OrganizationService = ({ baseUrl }: { baseUrl: string }): OrganizationServiceType => {
  const read: OrganizationServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(OrganizationSchema, {
      path: `${baseUrl}/Organization/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: OrganizationServiceType['create'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const update: OrganizationServiceType['update'] = () => {
    return Promise.resolve(err('NOT_SUPPORTED'));
  };

  const search: OrganizationServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = OrganizationSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(OrganizationBundleSchema, {
      path: `${baseUrl}/Organization`,
      token: accessToken,
      query: new URLSearchParams(parsedArgs as Record<string, string>).toString(),
    });

    return response;
  };

  return {
    read,
    create,
    update,
    search,
  };
};
